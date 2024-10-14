<script setup>
import {getCurrentInstance, onBeforeMount, ref} from 'vue';
import {generatePDF} from "@/modules/download.js";
import {countRow, scoreGlobal, values} from '@/variables/store.js';
import {initReport} from "@/modules/InitialReport.js";

const emit = defineEmits(['close']);

const dialog = ref(true);
const instance=getCurrentInstance();
const typeDownload={
  'Paremeters':['pdf', 'excel','csv'],
  'Graph':['pdf', 'excel','ppt'],
  'List Collections':['pdf', 'excel', '']
}

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
  <v-dialog v-model="dialog" max-width="700px">
    <v-card>
      <v-card-title><h3 id="title_dialog_download">Download</h3></v-card-title>
      <v-card-text>
        <v-row class="title_content_dialog"><h4 id="title_div">What format do you want to download?</h4></v-row>
        <v-container
            class=""
        >
          <v-row v-for="([name, typeDownload], index) in Object.entries(typeDownload)"
              align="start"
              no-gutters
          >
            <v-col class="name_type_download ma-2 pa-2">{{ name }}</v-col>
            <v-col
                v-for="(type) in typeDownload"
                :key="type"
                class="ma-2 pa-2"
            >
              <v-btn v-if="type=='pdf'" class="btn_pdf" @click="downloadFilePdf(name)">Pdf</v-btn>
              <v-btn v-if="type=='excel'" class="btn_excel" @click="downloadFileExcel(name)">Excel</v-btn>
              <v-btn v-if="type=='csv'" class="btn_csv" @click="downloadFileCsv(name)">csv</v-btn>
              <v-btn v-if="type=='ppt'" class="btn_ppt" @click="downloadFilePpt(name)">PPT</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="actions">
        <v-btn class="btn_close_dialog" color="grey" @click="closeDialog" icon="$clear" variant="plain"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#title_dialog_download{
  font-weight: 600;

}
.title_content_dialog{
  display: flex;
  justify-content: center;
}
#title_div{
  width: fit-content;
  font-weight: 500;
}
.name_type_download{
  width: fit-content;
}
.actions{
  display: contents;
  /*justify-content: center !important;*/
}
.btn_excel, .btn_pdf, .btn_csv,.btn_ppt{
  background-color: var(--color-orange);
  color: white !important;
  text-transform: initial;
}
.btn_excel{
  background-color: #05525C !important;
}
.btn_csv{
   background-color: #BA4B30 !important;
 }
.btn_ppt{
  background-color: #023139 !important;
}
</style>