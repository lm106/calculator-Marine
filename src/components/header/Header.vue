<script setup>
import { values, currentCollection, inputValues } from '@/variables/store';
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAll, getOne } from '@/services/firestoreService';
import { useAuth } from '@/composables/useAuth';
import { useCollectionEvent } from '@/composables/useCollectionEvent';
import ShareCollectionDialog from '@/components/shareModal/ShareModal.vue';
// import { loadValuesFromLocalStorage, getStoredCollections } from '@/services/localStorageService';
import { getCurrentCollectionName } from '@/services/localStorageService';
const { user, isLoggedIn } = useAuth();
const router = useRouter();
const route = useRoute();
const collections = ref([]);
const selectedCollection = ref('');
const showShareDialog = ref(false);
const { collectionCreated, resetCollectionCreated } = useCollectionEvent()

onMounted(async () => {
  watch(collectionCreated, async(newCollection) => {
    if (newCollection) {
      await Promise.all([
        updateCollections(),
        loadCollectionData(getCurrentCollectionName())
      ]);
      resetCollectionCreated();
    }
  });
  watch(isLoggedIn, async (newValue) => {
    if (newValue) {
      await Promise.all([
        updateCollections(),
        loadCollectionData(getCurrentCollectionName())
      ]);
    }
  });

  if (route.query.shared) {
    await handleSharedLink(route.query.shared);
  }
});

const handleSharedLink = async (hash) => {
  try {
    const decodedData = await decodeHash(hash);
    const { userId, collectionName, shareMode } = decodedData;

    await loadSharedCollection(userId, collectionName);

    if (shareMode === 'read') {
    }
  } catch (error) {
    console.error('Error al manejar el enlace compartido:', error);
  }
};

// TODO: Lock for this hash in a table in firestore and get the values
const decodeHash = async (hash) => {

  try {
    const decodedString = atob(hash);
    const [userId, collectionName, shareMode] = decodedString.split('|');
    if (!userId || !collectionName || !shareMode) {
      throw new Error('Hash inválido: faltan componentes');
    }

    if (shareMode !== 'read' && shareMode !== 'edit') {
      throw new Error('Modo de compartir inválido');
    }
    return {
      userId,
      collectionName,
      shareMode
    };
  } catch (error) {
    console.error('Error al decodificar el hash:', error);
    throw new Error('No se pudo decodificar el hash del enlace compartido');
  }
};

const openShareDialog = () => {
  showShareDialog.value = true;
};

const updateCollections = async () => {
  if (user.value) {
    // collections.value = getStoredCollections();
    const allCollections = await getAll('collections', user.value.uid);
    collections.value = allCollections.map(collection => collection.name);
    collections.value.push('Crear nueva');
    selectedCollection.value = getCurrentCollectionName();
  }
};

watch(selectedCollection, async (newValue) => {
  if (newValue === 'Crear nueva') {
    selectedCollection.value = '';
    router.push({ name: 'Welcome' });
  } else if (newValue && newValue !== getCurrentCollectionName()) {
    // loadValuesFromLocalStorage(newValue);
    await loadCollectionData(newValue);
  }
});

watch(currentCollection, (newValue) => {
  selectedCollection.value = newValue;
});

const loadCollectionData = async (collectionName) => {
  try {
    if (!user.value) {
      console.error('User not logged in');
      return;
    }
    const collection = await getOne('collections', collectionName, user.value.uid);
    if (!collection) {
      console.error('Collection not found');
      return;
    }
    values.value = collection.data;
    inputValues.value = collection.data;
    currentCollection.value = collection.name;
    localStorage.setItem('currentCollection', collectionName);
  } catch (error) {
    console.error('Error loading collection data:', error);
  }
};

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
        <v-btn
          v-if="selectedCollection && selectedCollection !== 'Crear nueva'"
          icon
          @click="openShareDialog"
        >
          <v-icon>mdi-share</v-icon>
        </v-btn>
      </div>
      <ShareCollectionDialog
        v-model="showShareDialog"
        :collection-name="selectedCollection"
      />
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
.nav-links{
  display: flex;
  align-items: center;
}

</style>