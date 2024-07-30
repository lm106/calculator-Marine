<script setup>
import {getCurrentInstance, onBeforeMount, ref} from 'vue';
import {generatePDF} from "@/modules/download.js";
import {countRow, scoreGlobal, values} from '@/variables/store.js';
import {initReport} from "@/modules/InitialReport.js";

const emit = defineEmits(['close']);

const dialog = ref(true);
const instance=getCurrentInstance();

onBeforeMount(() => {
  initReport(instance.type.__name);
});

const closeDialog = () => {
  dialog.value = false;
  emit('close'); // Emitir evento para cerrar el diálogo
};

const downloadFilePdf = () => {
  console.log('Descargando archivo...');
  generatePDF(values.value, scoreGlobal.value, countRow.value)
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
      <v-card-title>Download</v-card-title>
      <v-card-text>
        <div>What format do you want to download?</div>
      </v-card-text>
      <v-card-actions class="actions">
        <v-btn class="btn_pdf" @click="downloadFilePdf">Pdf</v-btn>
<!--        <v-btn class="btn_excel" @click="downloadFileExcel">Excel</v-btn>-->
        <v-btn class="btn_close_dialog" color="grey" @click="closeDialog" icon="$clear" variant="plain"></v-btn>
      <div id="chart"></div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.actions{
  justify-content: center !important;
}
.actions .btn_excel, .actions .btn_pdf{
  background-color: var(--color-orange);
  color: white !important;
  text-transform: initial;
}
.btn_excel{
  background-color: #023139 !important;
}
</style>