<script setup>
import { ref, onMounted } from 'vue';
import NewAnalysisModal from "@/components/welcome/NewAnalysisModal.vue";
import { auth } from '@/config/firebase';
import { sendSignInLinkToEmail } from "firebase/auth";
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/authStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { getAnalyses } from '@/services/analysisService';

const email = ref('');
const authStore = useAuthStore();
const loading = ref(false);
const toast = useToast();
const analyses = ref([]);
const showModal = ref(false);
const loadingStore = useLoadingStore();

const show = () =>{
  showModal.value=true;
}

const hideModal = () => {
  showModal.value = false;
};

const fetchAnalyses = async () => {
  if (authStore.isLoggedIn) {
    loadingStore.setLoading(true);
    try {
      const userId = authStore.user.uid;
      analyses.value = await getAnalyses(userId);
    } catch (error) {
      console.error('Error to get the analyses:', error);
      toast.error("Error to get the analyses.");
    } finally {
      loadingStore.setLoading(false);
    }
  }
};

onMounted(async () => {
  if (authStore.isLoggedIn) {
    await fetchAnalyses();
  }
});

const login = async() => {
  loading.value = true;

  const actionCodeSettings = {
    url: `${import.meta.env.VITE_APP_URL}/inputdata/confirm`,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email.value, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email.value);
    toast.success("Se ha enviado un enlace de inicio de sesión a tu correo electrónico.", {
      timeout: 5000
    });
  } catch (error) {
    console.error('Error al enviar el magic link:', error);
    toast.error("Error to send the link. Please try again.", {
      timeout: 5000
    });
  } finally {
    loading.value = false;
    email.value = '';
  }
};

const handleAnalysisCreated = (newAnalysis) => {
  hideModal();
  if (newAnalysis.exists) {
    toast.warning('The analysis already exists');
  } else {
    toast.success('The analysis has been created successfully');
    analyses.value.push(newAnalysis);
  }
};

</script>
<template>
  <div class="welcome">
    <div class="img_welcome">
      <img alt="Vue logo" class="logo" src="../../assets/logoRemap.png" height="75"/>
    </div>
    <div class="container">
      <div class="list-container" v-if="authStore.isLoggedIn">
        <h2 class="title">Welcome</h2>
        <div class="content">
          <p id="description_content">
            The analysis of “input” data will be based on the MSP data framework.
            including all seven defined clusters: (i) marine coastal & environment; (ii) marine & coastal
            conservation; (iii) oceanographic characteristics & climate; (iv) coastal land use and planning;
            (v) maritime activities; (vi) socio-economic information and (vii) governance. &nbsp;
          </p>
        </div>
        <h2>List of analyses</h2>
        <div class="list-analyses-container">
          <div v-if="!analyses.length" class="no-analyses">
            No analyses available.
          </div>
          <router-link :to="`/form?analysis=${analysis.id}`" class="list-analyses-item" v-for="analysis in analyses" :key="analysis.id">
            <span>{{ analysis.name }}</span>
          </router-link>
        </div>
        <v-btn @click="show" class="text-none btn btn_padding btn_weight btn-new-analysis" base-color="var(--color-btn-dark-blue)">
          <template v-if="analyses.length === 0">
            Create your first analysis
          </template>
          <template v-else>
            New analysis
          </template>
        </v-btn>
        
      </div>
      <div class="box" v-else>
        <h2 class="title">Welcome</h2>
        <div class="content">
          <p id="description_content">
            The analysis of “input” data will be based on the MSP data framework.
            including all seven defined clusters: (i) marine coastal & environment; (ii) marine & coastal
            conservation; (iii) oceanographic characteristics & climate; (iv) coastal land use and planning;
            (v) maritime activities; (vi) socio-economic information and (vii) governance. &nbsp;
          </p>
        </div>
        <p class="subtitle">Login with your email</p>
        <form class="login-form" @submit.prevent="login">
          <v-text-field v-model="email" label="Email" type="email" required></v-text-field>
          <v-btn type="submit" class="text-none btn btn_padding btn_weight btn-login" base-color="#D76B42" append-icon="mdi-arrow-right" :disabled="loading">
            <template v-if="loading">
              <v-progress-circular indeterminate color="white" size="20" />
            </template>
            <template v-else>
              Login
            </template>
          </v-btn>
        </form>
      </div>
    </div>
  </div>
  <NewAnalysisModal
    :showModal="showModal"
    @hide-modal="hideModal"
    @analysis-created="handleAnalysisCreated"
  />
</template>


<style scoped>
.img_welcome, .container {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 50%;
}
.welcome{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
}
.welcome >*{
  width:50%;
  height: 100vh;
  margin: 0%;
  padding: 2.5%;
}
.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 5vh;
}
#description_content{
  text-align: center;
  width: 80%;
}
.title {
  text-align: center;
  width: 100%;
}
.subtitle {
  text-align: center;
  width: 100%;
  font-weight: bold;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
}
.box, .list-container {
  background-color: white;
  width: 800px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.list-container {
  gap: 20px;
  padding: 40px;
}
.login-form {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}
.list-analyses-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 10px;
}
.list-analyses-item {
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background-color: white;
  padding: 8px 16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-analyses-item:hover {
  transform: scale(1.01);
}
.analysis-actions {
  display: flex;
}
.btn-login, .btn-new-analysis {
  width: 50%;
}
</style>
