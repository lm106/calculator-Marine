<script setup>
import { useRoute } from "vue-router";
import {onBeforeMount, ref} from 'vue';
import {nameAllQuestions, nameQuestions, title} from "@/variables/clusters.js";
// import {getOutputValues} from "@/modules/utils.js";
import {countRow, outputValues, scoreGlobal, transformValues} from "../../../variables/store.js";
import {getAllClusters} from "@/modules/utils.js";

import {
  getSeries, getSeriesScoreClusters,
  getSeriesScores,
  setSeriesCategory,
  setSeriesScoreCategory
} from "@/modules/SeriesCharts.js";
import {getOptionsClusterCategory, getOptionsClusterScoreCategory, getOptionsScoreClusters} from "@/modules/Charts.js";
import {getNamesScore} from "@/modules/countRow.js";

const route= useRoute();
const activePanel = ref([]);

const height=ref({heightCharScore:325, heightChar:325});
const width=ref({widthCharScore:425});
const namesScore=getNamesScore();
onBeforeMount(() => {
  if(namesScore.length!=0){
    setSeriesCategory()
    setSeriesScoreCategory();
  }

});
</script>

<template>
<!--  <v-expansion-panels class="panels panels_report" multiple>-->
  <div class="content_category">
    <div  class="block_step" v-for="(step, i) in nameAllQuestions">
<!--      <template #title>-->
        <div class="title_block">
          <h3 class="title">{{ step }}</h3>
          <v-divider></v-divider>
        </div>
<!--      </template>-->
<!--      <v-expansion-panel-text>-->
        <div >
          <v-container class="item_activity">
            <v-row  no-gutters>
<!--              <v-col>-->
<!--&lt;!&ndash;                <apexchart :width="width.score" :height="heigth.rest" type="bar" :options="getOptionsScoreClusters(props.activeCluster)" :series="getSeriesScoreClusters(props.activeCluster)"></apexchart>&ndash;&gt;-->
<!--              </v-col>-->
              <v-col>
              <apexchart :width="width.widthCharScore" :height="height.heightChar" type="bar" :options="getOptionsClusterScoreCategory(title[i])" :series="getSeriesScores(nameQuestions[i])"></apexchart>
              </v-col>
            </v-row>
          </v-container>
        </div>
<!--      </v-expansion-panel-text>-->
      <v-spacer></v-spacer>
    </div>
<!--  </v-expansion-panels>-->
  </div>
</template>

<style scoped>
.content_category{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}
.block_step{
  margin: 2.5% auto;
  padding:1.5%;
}
</style>