<script setup>
import {onBeforeMount, ref} from 'vue';
import {generatePDF} from "@/modules/download.js";
import { values } from '@/variables/store.js';
import {useRoute} from "vue-router";
import {generateValues, getKey} from "@/modules/utils.js";

const emit = defineEmits(['close']);

const dialog = ref(true);
const route=useRoute();

onBeforeMount(() => {
  generateValues();
});

const closeDialog = () => {
  dialog.value = false;
  emit('close'); // Emitir evento para cerrar el diálogo
};

const downloadFilePdf = () => {
  console.log('Descargando archivo...');
  console.log(route.path)
  console.log(route.params)
  generatePDF(values.value)
  closeDialog();
};
const downloadFileExcel = () => {
  console.log('Descargando archivo...');
  closeDialog();
};


// const downloadPDF = async () => {
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage();
//   const { width, height } = page.getSize();
//
//   let config=styleFilePdf();
//   let y = height - config.y;
//
//   values.value.forEach((item, index) => {
//     const text = `${item.name}: $${item.price}`;
//     page.drawText(text, {
//       x: config.x,
//       y,
//       size: config.size,
//       color: config.color
//     });
//     y -= 20;
//   });
//
//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//
//   link.download = getNameFile();
//   link.click();
// };
// async function generatePDF(data) {
//   const pdfDoc = await PDFDocument.create();
//   let page = pdfDoc.addPage();
//   const { width, height } = page.getSize();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//   let y = height - 50;
//   const lineHeight = 15;
//
//   const drawText = (text, x, y, options = {}) => {
//     page.drawText(text, {
//       x,
//       y,
//       size: options.size || 12,
//       font: options.bold ? boldFont : font,
//       color: rgb(0, 0, 0),
//     });
//   };
//
//   const drawUnderlineText = (text, x, y) => {
//     drawText(text, x, y, { bold: true });
//     const textWidth = boldFont.widthOfTextAtSize(text, 12);
//     page.drawLine({
//       start: { x, y: y - 2 },
//       end: { x: x + textWidth, y: y - 2 },
//       thickness: 0.5,
//       color: rgb(0, 0, 0),
//     });
//   };
//
//   const addPageIfNeeded = (y) => {
//     if (y <= 50) {
//       page = pdfDoc.addPage();
//       return height - 50;
//     }else{
//       return y;
//     }
//   };
//
//   const drawData = (data, x, y, indent = 0) => {
//     for (const key in data) {
//       if (typeof data[key] === 'object') {
//         if (indent === 0) {
//           drawText(`${key}:`, x, y, { bold: true });
//         } else if (indent === 1) {
//           drawText(`${'  '.repeat(indent)}Cluster: ${key}`, x, y);
//         } else if (indent === 2) {
//           drawUnderlineText(`${'  '.repeat(indent)}${key}`, x, y);
//         } else {
//           drawText(`${'  '.repeat(indent)}${key}:`, x, y);
//         }
//         y -= lineHeight;
//         y = addPageIfNeeded(y);
//         y = drawData(data[key], x, y, indent + 1);
//       } else {
//         drawText(`${'  '.repeat(indent)}${key}: ${data[key]}`, x, y);
//         y -= lineHeight;
//         y = addPageIfNeeded(y);
//       }
//     }
//     return y;
//   };
//
//   y = drawData(data, 50, y);
//
//   const pdfBytes = await pdfDoc.save();
//   // Descargar el PDF en el navegador
//   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = getNameFile();
//   link.click();
// }
//

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
#chart{

}
</style>