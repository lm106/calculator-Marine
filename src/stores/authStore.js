import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLoggedIn = ref(false);
  const isAuthReady = ref(false);

  function init() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          user.value = {
            uid: currentUser.uid,
            email: currentUser.email,
          };
          isLoggedIn.value = true;
        } else {
          user.value = null;
          isLoggedIn.value = false;
        }
        isAuthReady.value = true;
        resolve();
      });
    });
  }

  return { user, isLoggedIn, isAuthReady, init };
});