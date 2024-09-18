<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { loadValuesFromLocalStorage, getStoredCollections } from '@/variables/store';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const router = useRouter();
const collections = ref([]);
const selectedCollection = ref('');

onMounted(() => {
  collections.value = getStoredCollections();
});

const loadCollection = () => {
  if (selectedCollection.value) {
    loadValuesFromLocalStorage(selectedCollection.value);
    //router.push({ name: 'Relevance' });
    emit('close');
  }
};

const startNew = () => {
  router.push({ name: 'Welcome' });
  emit('close');
};
</script>

<template>
  <v-dialog v-model="props.show" persistent max-width="500px">
    <v-card>
      <v-card-title>Recuperar colección guardada</v-card-title>
      <v-card-text>
        <p>Se han encontrado las siguientes colecciones guardadas:</p>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>