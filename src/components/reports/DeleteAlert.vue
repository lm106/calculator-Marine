<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close']);

const dialog = ref(true);

const closeDialog = () => {
  dialog.value = false;
  emit('close'); // Emitir evento para cerrar el diálogo
};

const confirmDelete = () => {
  // Lógica para descargar el archivo
  console.log('Descargando archivo...');
  // Puedes agregar aquí la lógica para descargar el archivo en formato PDF o Excel
  // Por ejemplo, usando librerías como FileSaver.js o axios para hacer la solicitud de descarga
  closeDialog(); // Cerrar el diálogo después de la descarga (o dejarlo abierto según tu flujo)
};

</script>

<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>Delete Report</v-card-title>
      <v-card-text>
        <div>Are you sure you want to delete this report?</div>
      </v-card-text>
      <v-card-actions class="actions">
        <v-btn class="btn_pdf" @click="confirmDelete">Yes</v-btn>
        <v-btn class="btn_close_dialog" color="grey" @click="closeDialog" icon="$clear" variant="plain"></v-btn>

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