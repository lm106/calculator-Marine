<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from 'vue';
import { nameAllQuestions, nameQuestions, title } from "@/variables/clusters.js";
import {
  getSeries,
  getSeriesScores,
  setSeriesCategory,
  setSeriesScoreCategory
} from "@/modules/SeriesCharts.js";
import { getOptionsClusterCategory, getOptionsClusterScoreCategory } from "@/modules/Charts.js";
import { getNamesScore } from "@/modules/countRow.js";

const route = useRoute();
const activePanel = ref([]);

const height = ref({ heightCharScore: 325, heightChar: 325 });
const width = ref({ widthCharScore: 425 });
const namesScore = getNamesScore();

onBeforeMount(() => {
  if (namesScore.length !== 0) {
    setSeriesCategory();
    setSeriesScoreCategory();
  }
});
</script>

<template>
  <v-expansion-panels class="panels panels_report" multiple>
    <v-expansion-panel 
      v-for="(step, i) in nameAllQuestions" 
      :key="i" 
      class="panel_block panel_report" 
      style="border-radius: 10px;"
    >
      <template #title>
        <div class="title_block">
          <h3 class="title">{{ step }}</h3>
          <v-divider></v-divider>
        </div>
      </template>
      <v-expansion-panel-text>
        <div class="content_block content_report">
          <v-container class="item_activity">
            <v-row no-gutters>
              <v-col>
                <apexchart 
                  :width="width.widthCharScore" 
                  :height="height.heightChar" 
                  type="bar" 
                  :options="getOptionsClusterCategory(nameAllQuestions[i])" 
                  :series="getSeries(nameQuestions[i])"
                />
              </v-col>
              <v-col>
                <apexchart 
                  :width="width.widthCharScore" 
                  :height="height.heightChar" 
                  type="bar" 
                  :options="getOptionsClusterScoreCategory(title[i])" 
                  :series="getSeriesScores(nameQuestions[i])"
                />
              </v-col>
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