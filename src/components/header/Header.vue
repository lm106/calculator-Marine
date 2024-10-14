<script setup>
import { values, currentCollection, inputValues, selectedCollection } from '@/variables/store';
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getAllByAnalysis, getById } from '@/services/collectionService';
import { useCollectionEvent } from '@/composables/useCollectionEvent';
import ShareCollectionDialog from '@/components/shareModal/ShareModal.vue';
import { useAuthStore } from '@/components/stores/authStore';
import { useLoadingStore } from '@/components/stores/loadingStore';
import NewCollectionModal from '@/components/form/NewCollectionModal.vue';

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const router = useRouter();
const route = useRoute();
const collections = ref([]);
const showShareDialog = ref(false);
const showModal = ref(false);
const { collectionCreated, resetCollectionCreated } = useCollectionEvent()

onMounted(async () => {
  await updateCollections();
  watch(collectionCreated, async (newCollection) => {
    if (newCollection) {
      currentCollection.value = newCollection.id;
      await updateCollections();
      resetCollectionCreated();
    }
  });
});

const show = () => {
  showModal.value = true;
}

const hideModal = () => {
  showModal.value = false;
};

const openShareDialog = () => {
  showShareDialog.value = true;
};

const updateCollections = async () => {
  if (!authStore.isLoggedIn || !route.query.analysis) {
    await router.push({ name: 'Welcome' });
    return;
  }
  loadingStore.setLoading(true);
  try {
    const allCollections = await getAllByAnalysis(route.query.analysis);
    if (allCollections.length) {
      if (!currentCollection.value) {
        currentCollection.value = allCollections?.find(collection => collection.isDefault)?.id || allCollections[0]?.id;
      }
      collections.value = allCollections.map(collection => ({
        id: collection.id,
        name: collection.name
      }));
      selectedCollection.value = currentCollection.value;
      await loadCollectionData(currentCollection.value);
    } else {
      inputValues.value = [];
      values.value = {};
      selectedCollection.value = null;
    }
  } catch (error) {
    throw error;
  } finally {
    loadingStore.setLoading(false);
  }
};

watch(selectedCollection, async (newValue) => {
  if (newValue && newValue !== currentCollection.value.id) {
    await loadCollectionData(newValue);
  }
});

watch(currentCollection, (newValue) => {
  selectedCollection.value = newValue;
});

const loadCollectionData = async (selectedCollection) => {
  try {
    if (authStore.isLoggedIn && selectedCollection && selectedCollection !== 'new') {
      loadingStore.setLoading(true);
      const collection = await getById(selectedCollection);
      if (!collection) {
        console.error('Collection not found');
        return;
      }
      values.value = collection.data;
      inputValues.value = collection.data;
      currentCollection.value = selectedCollection;
      loadingStore.setLoading(false);
    }

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
    <div v-if="collections.length" class="nav-links">
      <v-btn @click="navigateToHome" size="small">
        Change analysis
      </v-btn>
      <v-select v-model="selectedCollection" :items="collections" item-title="name" item-value="id"
        label="Colección actual" dense outlined class="collection-select"></v-select>
      <v-btn icon @click="show" size="small">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn size="small" v-if="selectedCollection" icon @click="openShareDialog">
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </div>
    <ShareCollectionDialog v-model="showShareDialog" :collection-name="selectedCollection" />
  </header>
  <NewCollectionModal :showModal="showModal" @hide-modal="hideModal" />
</template>

<style scoped>
.header_form {
  width: 100%;
  border-bottom: 5px solid var(--color-header-border);
  height: var(--header-heigth);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  margin-top: 5px;
  cursor: pointer;
}

.collection-select {
  width: 200px;
  margin-top: 20px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>