<script setup>
import { ref, onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import Ping from '@/components/loaders/Ping.vue';
import { useAuthStore } from '@/components/stores/authStore';
import { useLoadingStore } from '@/components/stores/loadingStore';

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const snackbar = ref(false);
const snackbarText = ref('');
const loading = ref(true);

onBeforeMount(async () => {
  await authStore.init();
  loading.value = false;
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
