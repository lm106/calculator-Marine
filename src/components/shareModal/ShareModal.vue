<script setup>
import { ref, watch, onMounted } from 'vue';
import { saveSharedLink } from '@/services/sharedService';
import { useAuthStore } from '@/stores/authStore';
import { getAnalysisById } from '@/services/analysisService';
import { useRoute } from 'vue-router';
const authStore = useAuthStore();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(props.modelValue);
const route = useRoute();
const shareMode = ref('read');
const shareLink = ref('');
const isGeneratingLink = ref(false);
const analysisName = ref('');
const hash = ref('');
const isCopied = ref(false);
const copyLoading = ref(false);

watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue;
});

watch(dialog, (newValue) => {
  emit('update:modelValue', newValue);
  if (newValue) {
    updateShareLink();
  }
});


const generateHash = async (userId, analysisId, shareMode) => {
  const data = `${userId}|${analysisId}|${shareMode}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const updateShareLink = async () => {
  if (authStore.isLoggedIn) {
    isGeneratingLink.value = true;
    try {
      const analysisId = route.query.analysis;
      const analysis = await getAnalysisById(analysisId, authStore.user.uid);
      analysisName.value = analysis.name;
      hash.value = await generateHash(authStore.user.uid, analysisId, shareMode.value);
      shareLink.value = `${import.meta.env.VITE_APP_URL}/inputdata/form?analysis=${analysisId}&shared=${hash.value}`;
    } catch (error) {
      shareLink.value = 'Error generating link';
    } finally {
      isGeneratingLink.value = false;
    }
  }
};

const copyLink = async () => {
  try {
    copyLoading.value = true;
    await saveSharedLink({
      owner: authStore.user.uid,
      hash: hash.value,
      analysisId: route.query.analysis,
      mode: shareMode.value
    });
    navigator.clipboard.writeText(shareLink.value);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 20000);
  } catch (error) {
    console.error('Error copying link:', error);
  } finally {
    copyLoading.value = false;
  }
};

watch(shareMode, updateShareLink);
onMounted(updateShareLink);

</script>

<template>
  <div class="modal" v-show="dialog">
    <div class="modal-content">
      <v-btn @click="dialog = false" class="close" density="comfortable" icon="$close" variant="plain"></v-btn>
      <div class="content_alert">
        <h2 id="title_alert_welcome">Share analysis "{{ analysisName }}"</h2>
        <p>Select the share mode:</p>
        <v-radio-group v-model="shareMode">
          <v-radio label="Read mode" value="read"></v-radio>
          <v-radio label="Edit mode" value="edit"></v-radio>
        </v-radio-group>
        <div class="link_container">
          <v-btn
            class="copy_btn"
            @click="copyLink"
            :disabled="isGeneratingLink || copyLoading"
          >
            <template v-if="isGeneratingLink">
              <v-progress-circular indeterminate color="white" size="20" />
              Generating link...
            </template>
            <template v-if="!isGeneratingLink && !isCopied && !copyLoading">
              Copy link
            </template>
            <template v-if="copyLoading">
              <v-progress-circular indeterminate color="white" size="20" />
              Copying link...
            </template>
            <template v-if="isCopied ">
              Copied!
            </template>
          </v-btn>
        </div>
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
  background-color: rgba(0,0,0,0.4);
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
#title_alert_welcome {
  margin: 2.5% auto;
  width: 100%;
  text-align: center;
}
.content_alert {
  margin: 2.5% auto;
  width: 80%;
}
#btn_alert_start {
  margin: 5% 30% auto;
  width: 40%;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.link_container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.copy_btn {
  text-transform: capitalize;
  width: 100%;
  text-align: center;
  background-color: #D76B42;
  color: white;
}
</style>