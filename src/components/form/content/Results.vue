<script setup>
import { useRouter } from "vue-router";
import DownloadAlert from "@/components/reports/DownloadAlert.vue";
import {onBeforeMount, ref} from "vue";
import {tokenReport} from "@/modules/InitialReport.js";
import {useInputFocusLegend} from "@/stores/legendFocusStore.js";
const router = useRouter();
const generateReport =()=>{
  router.push({name:'Category'});
}
const legendInput=useInputFocusLegend();
onBeforeMount(()=>{
  tokenReport.value=true;
  legendInput.clearFocusedInput();
  legendInput.clearInputValue();
})
const dialog=ref(false)

const openDownloadDialog = () => {
  dialog.value = true;
};

const closeDownloadDialog = () => {
  dialog.value = false;
};
</script>

<template>
  <div class="content_results">
    <v-card class="mx-auto card" max-width="450">
      <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
        <v-card-title>Reports</v-card-title>
      </v-img>
      <v-card-text class="card_desc">
        <div>You can find your report in different ways. It show charts and dashboards about data.</div>
      </v-card-text>
      <template v-slot:actions class="align-content-center">
        <v-btn  @click="generateReport" class="text-none btn btn_padding btn_results" base-color="var(--color-btn-dark-blue)" variant="flat">See Reports</v-btn>
      </template>
    </v-card>
    <v-card class="mx-auto card" max-width="450">
      <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
        <v-card-title>Download</v-card-title>
      </v-img>
      <v-card-text class="card_desc">
        <div>You can save your report on file now.</div>
      </v-card-text>
      <template v-slot:actions>
        <v-btn  @click="openDownloadDialog" append-icon="mdi-tray-arrow-down" class="text-none btn btn_padding btn_results" base-color="var(--color-orange)" variant="flat">Download</v-btn>
      </template>
    </v-card>
    <DownloadAlert v-if="dialog" @close="closeDownloadDialog"></DownloadAlert>
    <div id="chart"></div>

  </div>
</template>

<style scoped>
.content_results{
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.card{
  border-radius: 5px ;
  height: 335px;
  width: 25%;
  margin-left: 2.5% !important;
  margin-right: 2.5% !important;
}
.card_desc{
  height: 70px;
}
.btn_results{
  margin-bottom: 10px;
}

</style>