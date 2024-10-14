<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/components/stores/authStore';
import { createAnalyses } from '@/services/analysisService';

const props = defineProps({
  showModal: Boolean
});

const emit = defineEmits(['analysis-created']);
const authStore = useAuthStore();
const nameAnalysis = ref('');
const loading = ref(false);

const saveAnalysis = async () => {
  if (nameAnalysis.value && authStore.isLoggedIn) {
    const userId = authStore.user.uid;
    if (userId) {
      loading.value = true;
      try {
        const newAnalysis = await createAnalyses(userId, nameAnalysis.value);
        nameAnalysis.value = '';
        emit('analysis-created', newAnalysis);
      } catch (error) {
        console.error('Error to save the analysis:', error);
      } finally {
        loading.value = false;
      }
    }
  }
};

</script>

<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <v-btn @click="$emit('hide-modal')" class="close"  density="comfortable" icon="$close" variant="plain"></v-btn>
    <div class="content_alert">
        <div>
          <h2 id="title_alert_welcome">New analysis</h2>
          <!-- Describe in a secondary text that an analysis is a group of collection with differente data values-->
          <p class="subtitle">An analysis is a group of collection with differente data values</p>
          <v-text-field  v-model="nameAnalysis" label="Name analysis" required :disabled="loading"></v-text-field>
        </div>
      <v-btn @click="saveAnalysis" id="btn_alert_start" class="text-none btn btn_padding btn_weight btn_start" base-color="#D76B42" append-icon="mdi-arrow-right" :disabled="loading">
        <template v-if="loading">
              <v-progress-circular indeterminate color="white" size="20" />
        </template>
        <template v-else>
              Save
        </template>
      </v-btn>
    </div>
  </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* Fondo oscuro */
  overflow: auto;
}
.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: end;
  border-radius: 10px;
  border: 1px solid transparent;
}
#title_alert_welcome{
  margin: 2.5% auto;
  width: 50%;
  text-align: center;
}
.subtitle{
  margin: 10px;
}
.content_alert{
  margin: 5% auto;
  width: 75%;
}
#btn_alert_start{
  margin: 5% 30% auto;
  width: 40%;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>