<script setup>
import { useRoute } from "vue-router";
import {ref, watch} from 'vue';
import { questions } from "@/variables/clusters.js";
import {getOutputValues} from "@/modules/utils.js";
import {outputValues} from "../../../variables/store.js";

const route= useRoute();
const activePanel = ref([]);


// Definimos las opciones del gráfico y los datos como variables reactivas
/*

          v-for="(block, index) in questions"
                       :key="index" :value="block.title"
 */

const chartOptions = ref({
  chart: {
    id: 'basic-bar'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
});

const series = ref([
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  },
  {
    name: 'series-2',
    data: [31, 42, 50, 52, 49, 60, 70, 91]
  },
]);

</script>

<template>
{{ route.name }}

  <v-expansion-panels class="panels panels_report" v-model="activePanel" multiple>
    <v-expansion-panel
                       class="panel_block panel_report"
                       style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
          border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
    >
      <template #title>
        <div class="title_block">
          <h3 class="title">title</h3>
          <v-divider></v-divider>
        </div>
      </template>
      <v-expansion-panel-text>
        <div class="content_block content_report">
          <v-container class="item_activity">
            <v-row  no-gutters>
              <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
              <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
            </v-row>
          </v-container>
        </div>
      </v-expansion-panel-text>
      <v-spacer></v-spacer>
    </v-expansion-panel>
  </v-expansion-panels>









</template>

<style scoped>

</style>