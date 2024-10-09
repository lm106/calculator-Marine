<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from 'vue';
import { nameAllQuestions, nameQuestions, title } from "@/variables/clusters.js";
import {
  getSeries, getSeriesScoreClusters,
  getSeriesScores,
  setSeriesCategory,
  setSeriesScoreCategory
} from "@/modules/SeriesCharts.js";
import {getOptionsClusterCategory, getOptionsClusterScoreCategory, getOptionsScoreClusters} from "@/modules/Charts.js";
import {getNamesScore} from "@/modules/countRow.js";

const route = useRoute();
const activePanel = ref([]);

const height=ref({heightCharScore:325, heightChar:325, rest:550});
const width=ref({widthCharScore:425, score:450});
const namesScore=getNamesScore();
onBeforeMount(() => {
  if (namesScore.length !== 0) {
    setSeriesCategory();
    setSeriesScoreCategory();
  }
});
</script>

<template>

  <div class="content_category">
    <div  class="block_step" v-for="(step, i) in nameAllQuestions">
        <div class="title_block">
          <h3 class="title">{{ step }}</h3>
          <v-divider></v-divider>
        </div>
        <div>
          <v-container class="item_activity">
            <v-row no-gutters>
              <v-col>
              <apexchart :width="width.widthCharScore" :height="height.heightChar" type="bar" :options="getOptionsClusterScoreCategory(title[i])" :series="getSeriesScores(nameQuestions[i])"></apexchart>
              </v-col>
            </v-row>
          </v-container>
        </div>
      <v-spacer></v-spacer>
    </div>
    <v-divider></v-divider>
    <div class="block_step" v-for="(nameCluster) in getAllClusters()">
      <v-container class="item_activity">
        <v-row  no-gutters>
          <v-col>
            <apexchart :width="width.score" :height="height.rest" type="bar" :options="getOptionsScoreClusters(nameCluster)" :series="getSeriesScoreClusters(nameCluster)"></apexchart>
          </v-col>
        </v-row>
      </v-container>

    </div>
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