<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getStoredCollections, loadValuesFromLocalStorage } from '@/services/localStorageService';
import { currentCollection } from '@/variables/store';

const router = useRouter();
const collections = ref([]);
const selectedCollection = ref('');

onMounted(() => {
  updateCollections();
  selectedCollection.value = currentCollection.value;
});

const updateCollections = () => {
  collections.value = getStoredCollections();
  collections.value.push('Crear nueva');
};

watch(selectedCollection, (newValue) => {
  if (newValue === 'Crear nueva') {
    selectedCollection.value = '';
    router.push({ name: 'Welcome' });
  } else if (newValue && newValue !== currentCollection.value) {
    loadValuesFromLocalStorage(newValue);
  }
});
watch( currentCollection, (newValue) => {
  selectedCollection.value = newValue;
});

const navigateToHome = () => {
  router.push({ name: 'Welcome' });
};

</script>

<template>
  <header class="header_form">
      <div class="logo" @click="navigateToHome">
        <img alt="Vue logo" class="logo" src="@/assets/logoRemap.png" width="145" height="45" />
      </div>
      <div class="nav-links">
        <v-select
          v-model="selectedCollection"
          :items="collections"
          label="Colección actual"
          dense
          outlined
          class="collection-select"
        ></v-select>
      </div>
  </header>
</template>

<style scoped>
.header_form{
  width: 100%;
  border-bottom: 5px solid var(--color-header-border);
  height: var(--header-heigth);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.logo{
  margin-top: 5px;
  cursor: pointer;
}
.collection-select {
  width: 200px;
  margin-right: 20px;
  margin-top: 10px;
}

</style>