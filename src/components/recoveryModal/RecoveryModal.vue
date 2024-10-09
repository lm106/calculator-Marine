<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAndDelete, getAll, getOne } from '@/services/firestoreService';
import { values, inputValues } from '@/variables/store.js';
import { useAuth } from '@/composables/useAuth';


const { user, isLoggedIn } = useAuth();

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const router = useRouter();
const collections = ref([]);
const selectedCollection = ref('');

onMounted(() => {
  watch(isLoggedIn, async (newValue) => {
    if (newValue) {
      await updateCollections()
    }
  });
});


const updateCollections = async () => {
  if (user.value && user.value.uid) {
    const allCollections = await getAll('collections', user.value.uid);
    collections.value = allCollections.map(collection => collection.name);
  }
};

const loadCollection = async () => {
  if (selectedCollection.value) {
    if (user.value && user.value.uid) {
      const collection = await getOne('collections', selectedCollection.value, user.value.uid);
      values.value = collection.data;
      inputValues.value = collection.data;
      localStorage.removeItem('currentCollection');
      emit('close');
    }
  }
};

const startNew = () => {
  router.push({ name: 'Welcome' });
  emit('close');
};

const deleteSelectedCollection = async () => {
  if (selectedCollection.value && user.value && user.value.uid) {
    await getAndDelete('collections', selectedCollection.value, user.value.uid);
    updateCollections();
    values.value = {};
    inputValues.value = {};
    selectedCollection.value = '';
  }
};
</script>

<template>
  <v-dialog v-model="props.show" persistent max-width="500px">
    <v-card>
      <v-card-title>Restore and manage collections</v-card-title>
      <v-card-text>
        <p>Select a collection to load or delete:</p>
        <v-select
          v-model="selectedCollection"
          :items="collections"
          label="Select a collection"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="loadCollection" :disabled="!selectedCollection">
          Load collection
        </v-btn>
        <v-btn color="secondary" @click="startNew">
          Start new collection
        </v-btn>
        <v-btn color="error" @click="deleteSelectedCollection" :disabled="!selectedCollection">
          Delete collection
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