<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { saveSharedLink } from '@/services/firestoreService';

const { user } = useAuth();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(props.modelValue);
const shareMode = ref('read');
const shareLink = ref('');
const isGeneratingLink = ref(false);
const collectionName = ref('');
const isCopied = ref(false);

watch(() => props.modelValue, (newValue) => {
  dialog.value = newValue;
});

watch(dialog, (newValue) => {
  emit('update:modelValue', newValue);
  if (newValue) {
    updateShareLink();
  }
});


const generateHash = async (userId, collectionName, shareMode) => {
  const data = `${userId}|${collectionName}|${shareMode}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const updateShareLink = async () => {
  isGeneratingLink.value = true;
  try {
    collectionName.value = localStorage.getItem('currentCollection');
    let userId = '';
    if ( !user.value) {
      console.error('User not logged in');
      userId = 'AQEnexuAwGXYinwf4Qr2BZy7UBE3'
    }else{
        userId = user.value.uid;
    }
    const hash = await generateHash(userId, collectionName.value, shareMode.value);
    // save this hash in firestorage with this values 
    // collection name 'shared_links' and values are these
    // hash , collectionName, userId, mode, createdAt
    // call firestoreService to save this
    await saveSharedLinkFn(hash, collectionName.value, userId, shareMode.value);
    shareLink.value = `${import.meta.env.VITE_APP_URL}/inputdata/form?shared=${hash}`;
  } catch (error) {
    shareLink.value = 'Error generating link';
  } finally {
    isGeneratingLink.value = false;
  }
};

const saveSharedLinkFn = async (hash, collectionName, userId, mode) => {
  const data = {
    collectionName,
    hash,
    userId,
    mode,
    createdAt: new Date().toISOString()
  };
  await saveSharedLink('shared_links', userId, data);
};

const copyLink = () => {
  navigator.clipboard.writeText(shareLink.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

watch(shareMode, updateShareLink);
onMounted(updateShareLink);

</script>

<template>
  <div class="modal" v-show="dialog">
    <div class="modal-content">
      <v-btn @click="dialog = false" class="close" density="comfortable" icon="$close" variant="plain"></v-btn>
      <div class="content_alert">
        <h2 id="title_alert_welcome">Share Collection</h2>
        <p>Select the share mode:</p>
        <v-radio-group v-model="shareMode">
          <v-radio label="Read mode" value="read"></v-radio>
          <v-radio label="Edit mode" value="edit"></v-radio>
        </v-radio-group>
        <p>Link to share the collection <span style="font-weight: bold;">{{ collectionName }}</span>:</p>
        <div class="link_container">
          <v-text-field
            :value="isGeneratingLink ? 'Generando enlace...' : shareLink"
          readonly
          :loading="isGeneratingLink"
            append-outer-icon="mdi-content-copy"
          >
          </v-text-field>
          <v-btn
            class="copy_btn"
            icon
            @click="copyLink"
            :color="isCopied ? 'success' : ''"
          >
            <v-icon>{{ isCopied ? 'mdi-check' : 'mdi-content-copy' }}</v-icon>
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
  margin-top: -15px;
}
</style>