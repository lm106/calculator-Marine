<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import Ping from '@/components/loaders/Ping.vue';
import { useAuthStore } from '@/stores/authStore';
import { useLoadingStore } from '@/stores/loadingStore';
import { shared } from '@/variables/store';
import { getSharedLink } from '@/services/sharedService';

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const snackbar = ref(false);
const snackbarText = ref('');
const loading = ref(true);
const route = useRoute();
const router =useRouter();

onBeforeMount(async () => {
  await authStore.init();
  await checkSharedParam();
  loading.value = false;
});

const checkSharedParam = async () => {
  try {
    if (route.query.shared) {
      const sharedLink = await getSharedLink(route.query.shared);
      shared.value = sharedLink;
    }
  } catch (error) {
    router.push({ name: 'Welcome' });
  }
};

watch(() => route.fullPath, async () => {
  await checkSharedParam();
});

</script>

<template>
  <div v-if="!loading">
    <RouterView />
    <v-snackbar v-model="snackbar" :timeout="3000">
    {{ snackbarText }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Cerrar
      </v-btn>
    </template>
    </v-snackbar>
  </div>
  <Ping v-if="loadingStore.isLoading" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
