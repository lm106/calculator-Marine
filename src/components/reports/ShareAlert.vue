<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close']);

const dialog = ref(true);

const closeDialog = () => {
  dialog.value = false;
  emit('close'); // Emitir evento para cerrar el diálogo
};

const downloadFilePdf = () => {
  console.log('Descargando archivo...');
  closeDialog();
};
const downloadFileExcel = () => {
  console.log('Descargando archivo...');
  closeDialog();
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Link Report</v-card-title>
      <v-card-text>
        <div>¡Ups! At this moment it is not possible. Try again later</div>
      </v-card-text>
      <v-card-actions class="actions">
        <v-btn class="btn_close_dialog" color="grey" @click="closeDialog" icon="$clear" variant="plain"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>