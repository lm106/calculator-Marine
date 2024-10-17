<script setup>
  import { onMounted, ref } from 'vue';
  import { auth } from '@/config/firebase';
  import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
  
  const loading = ref(true);
  const error = ref(null);
  const email = localStorage.getItem('emailForSignIn');
  
  onMounted(async () => {
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, email, window.location.href);
      }
    } catch (err) {
      error.value = 'Error to login: ' + err.message;
    } finally {
      window.localStorage.removeItem('emailForSignIn');
      loading.value = false;
    }
  });
</script>

<template>
    <div class="confirm-container">
      <v-progress-circular v-if="loading" indeterminate color="#D76B42" size="100" />
      <p v-else-if="error">{{ error }}</p>
      <div class="confirm-content" v-else>
        <p>¡You have logged in successfully!</p>
        <router-link class="link-back btn btn_padding btn_weight btn_start" to="/" append-icon="mdi-arrow-left">
            Go to the main page
        </router-link>
      </div>
    </div>
</template>

<style scoped>
.confirm-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}
.confirm-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.link-back {
    background-color: var(--color-btn-dark-blue);
    width: 280px;
    text-decoration: none;
    text-align: center;
}
</style>