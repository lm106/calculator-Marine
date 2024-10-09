import { ref, onMounted } from 'vue';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useToast } from 'vue-toastification';
const isLoggedIn = ref(false);
const user = ref(null);

export function useAuth() {
  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = {
          uid: currentUser.uid,
          email: currentUser.email,
        };
        toast.success("Bienvenido " + user.value.email);
      } else {
        user.value = null;
      }
      isLoggedIn.value = !!user;
    });
  });

  return { user, isLoggedIn };
}