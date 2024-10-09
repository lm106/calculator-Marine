<script setup>
import { ref } from 'vue';
import AlertWelcome from "@/components/welcome/AlertWelcome.vue";
import { auth } from '@/config/firebase';
import { sendSignInLinkToEmail } from "firebase/auth";
import { useToast } from 'vue-toastification';
import { useAuth } from '@/composables/useAuth';

const email = ref('');
const { isLoggedIn, user } = useAuth();
const loading = ref(false);
const toast = useToast();

const showModal = ref(false);

const show =()=>{
  showModal.value=true;
}

const hideModal = () => {
  showModal.value = false;
};

const login = async() => {
  loading.value = true;

  const actionCodeSettings = {
    url: `${import.meta.env.VITE_APP_URL}/inputdata/confirm`,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email.value, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email.value);
    toast.success("An email with a login link has been sent to your email.", {
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

</script>
<template>
  <div class="welcome">
    <div class="img_welcome">
      <img alt="Vue logo" class="logo" src="../../assets/logoRemap.png" height="75"/>
    </div>
    <div class="content" v-if="isLoggedIn">
      <h2>Welcome {{ user.email }}</h2>
      <p id="description_content"> The analysis of “input” data will be based on the MSP data framework.
        iincluding all seven defined clusters: (i) marine coastal & environment; (ii) marine & coastal
        conservation; (iii) oceanographic characteristics & climate; (iv) coastal land use and planning;
        (v) maritime activities; (vi) socio-economic information and (vii) governance. &nbsp;
         </p>
      <v-btn @click="show" class="text-none btn btn_padding btn_weight btn_start" base-color="var(--color-btn-dark-blue)" append-icon="mdi-arrow-right">Start</v-btn>
      <alert-welcome :showModal="showModal" @hide-modal="hideModal"/>
    </div>

    <div v-else class="login-container">
      <div class="login-box">
        <h2 class="title">Welcome</h2>
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
</template>


<style scoped>
.img_welcome{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.welcome{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
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
}
#description_content{
  text-align: center;
  width: 80%;
}
.title {
  text-align: center;
  width: 100%;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
}
.login-box {
  background-color: white;
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-form {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}
.btn-login {
  margin-top: 20px;
  width: 50%;
}
</style>
