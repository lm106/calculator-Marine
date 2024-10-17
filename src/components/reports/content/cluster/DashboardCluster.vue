<script setup>
import {onBeforeMount, ref} from 'vue';
import {getAllValuesStep, getNamesScore, getValueScore, getValuesPercent} from "@/modules/countRow.js";
import {nameAllQuestions, nameQuestions} from "@/variables/clusters.js";
import {
  getOptionsClusterCategory,
  getOptionsClusters,
  getOptionsScoreClusters,
  getOptionsStepClusters
} from "@/modules/Charts.js";
import {
  getSeriesClusters,
  getSeriesScoreClusters,
  getSeriesStepClusters,
  setSeriesClusters,
  setSeriesStepClusters
} from "@/modules/SeriesCharts.js"


const props = defineProps({
  activeCluster: String
});

const list_score = ref([]);
const width = { score: 450, rest: 550 };
const height = { score: 350, rest: 450 };

onBeforeMount(() => {
  setScore();
  setSeriesStepClusters(props.activeCluster);
});

const setScore = () => {
  const namesScores = getNamesScore();
  list_score.value = namesScores.map(nameStep => getValueScore(props.activeCluster, nameStep));
};

const updateTypeChart = (chart, event) => {
  barOptions.value.chart.type = event.target.value;
  chart.updateOptions(barOptions.value);
};
</script>

<template>
  <v-row class="row_first">
    <v-container class="content_score">
      <v-row class="row sparkboxes">
        <v-col class="v-col-5">
          <div class="box shadow boxChartCluster">
            <apexchart :width="width.score" :height="heigth.rest" type="bar" :options="getOptionsScoreClusters(props.activeCluster)" :series="getSeriesScoreClusters(props.activeCluster)"></apexchart>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="content_chart">
      <v-row class="row sparkboxes">
        <v-col class="v-col-5">
          <div class="box shadow boxChartCluster">
            <apexchart 
              :height="height.rest" 
              :width="width.score" 
              ref="barChart" 
              type="bar" 
              :options="getOptionsClusters(props.activeCluster)" 
              :series="getSeriesClusters(props.activeCluster)"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<style scoped>
.content-area {
  max-width: 1280px;
  margin: 0 auto;
}
.row_first {
  display: flex;
}
.content_chart, .content_score {
  width: 50%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.column {
  max-width: 50%;
  display: flex;
}
.box {
  background-color: white;
  padding: 0 20px 25px;
}
.shadow {
  box-shadow: 0 1px 15px rgba(69, 65, 78, 0.08);
}
.sparkboxes {
  align-items: center;
  align-content: center;
}
.sparkboxes .box {
  padding-top: 0;
  padding-bottom: 10px;
  text-shadow: 0 1px 1px #666;
  box-shadow: 0 1px 15px rgba(69, 65, 78, 0.08);
  position: relative;
  border-radius: 5px;
  width: fit-content;
}
.boxChartCluster {
  padding: 25px 25px 12.5px;
}
.box .details {
  color: #127583;
}
.sparkboxes .box .details {
  position: static;
  transform: scale(0.7) translate(-35px, 20px);
  margin: 0 0 5%;
  font-size: 16px;
  text-transform: initial;
  height: 70px;
  width: 225px;
}
.sparkboxes .box .details h1 {
  text-align: center;
  transform: translate(-22px, 20px);
}
.sparkboxes .box .details h3 {
  height: 75px;
}
.sparkboxes strong {
  position: relative;
  z-index: 3;
  top: -8px;
  color: #fff;
}
.sparkboxes .boxchart {
  border-image-slice: 1;
  background-color: white;
  width: 200px;
  height: 150px;
}
.sparkboxes .box2 {
  background-image: linear-gradient(135deg, #2AFADF 10%, #4C83FF 100%);
}
.sparkboxes .box3 {
  background-image: linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%);
}
.sparkboxes .box4 {
  background-image: linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%);
}
#chart-type-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  width: 20px;
  height: 20px;
  border: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-width="2" d="M2,7 L12,17 L22,7"/></svg>') no-repeat right center;
  background-color: transparent;
}
#defa {
  display: none;
}
</style>