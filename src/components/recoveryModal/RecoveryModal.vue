<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { loadValuesFromLocalStorage, getStoredCollections, deleteCollection } from '@/services/localStorageService';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const router = useRouter();
const collections = ref([]);
const selectedCollection = ref('');

onMounted(() => {
  updateCollections();
});

const updateCollections = () => {
  collections.value = getStoredCollections();
};

const loadCollection = () => {
  if (selectedCollection.value) {
    loadValuesFromLocalStorage(selectedCollection.value);
    emit('close');
  }
};

const startNew = () => {
  router.push({ name: 'Welcome' });
  emit('close');
};

const deleteSelectedCollection = () => {
  if (selectedCollection.value) {
    deleteCollection(selectedCollection.value);
    updateCollections();
    selectedCollection.value = '';
  }
};
</script>

<template>
  <v-dialog v-model="props.show" persistent max-width="500px">
    <v-card>
      <v-card-title>Recuperar o gestionar colecciones</v-card-title>
      <v-card-text>
        <p>Selecciona una colección para cargar o borrar:</p>
        <v-select
          v-model="selectedCollection"
          :items="collections"
          label="Selecciona una colección"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="loadCollection" :disabled="!selectedCollection">
          Cargar colección
        </v-btn>
        <v-btn color="secondary" @click="startNew">
          Comenzar nueva colección
        </v-btn>
        <v-btn color="error" @click="deleteSelectedCollection" :disabled="!selectedCollection">
          Borrar colección
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-select {
  margin-bottom: 20px;
}
.v-card-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.v-btn {
  margin: 5px;
}
</style>