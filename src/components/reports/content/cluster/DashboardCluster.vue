<script setup>
import {onBeforeMount, ref} from 'vue';
import {getAllValuesStep, getNamesScore, getValueScore, getValuesPercent} from "@/modules/countRow.js";
import {nameAllQuestions, nameQuestions} from "@/variables/clusters.js";
import {getOptionsClusters, getOptionsStepClusters} from "@/modules/Charts.js";
import { getSeriesClusters, getSeriesStepClusters, setSeriesClusters, setSeriesStepClusters } from "@/modules/SeriesCharts.js"


const props = defineProps({
  activeCluster:String
})

onBeforeMount(()=>{
  setScore();
  // setSeriesClusters(props.activeCluster);
  setSeriesStepClusters(props.activeCluster);
})

const list_score=ref([]);



const width={score: 450, rest: 550};
const heigth={score: 350, rest: 450};

const setScore=()=>{
  let res=[];
  let namesScores=getNamesScore();
  namesScores.forEach((nameStep)=>{
    res.push(getValueScore(props.activeCluster, nameStep));
  })
  list_score.value=res;
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
          <v-col class="column">
            <div class="box boxchart">
              <div class="details">
                <h3>Relevance & Application Score</h3>
                <h1>{{ (list_score[0])? list_score[0]: 0}} %</h1>
              </div>
            </div>
          </v-col>
          <v-col class="column">
            <div class="box boxchart">
              <div class="details">
                <h3>FAIR transparency Score</h3>
                  <h1>{{ (list_score[1])? list_score[1]: 0}} %</h1>
              </div>
            </div>
          </v-col>
      </v-row>
      <v-row class="row sparkboxes">
        <v-col class="column">
          <div class="box boxchart">
            <div class="details">
              <h3>Spatial & Temporal coverage score</h3>
              <h1>{{ (list_score[2])? list_score[2]: 0}} %</h1>
            </div>
          </div>
        </v-col>
        <v-col class="column">
          <div class="box boxchart">
            <div class="details">
              <h3>SQDF score</h3>
              <h1>{{ (list_score[3])? list_score[3]: 0}} %</h1>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="content_chart">
      <v-row class="row sparkboxes">
        <v-col class="v-col-5">
          <div class="box shadow boxChartCluster">
            <apexchart :height="heigth.rest" :width="width.score" ref="barChart" type="bar" :options="getOptionsClusters(props.activeCluster)" :series="getSeriesClusters(props.activeCluster)"></apexchart>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
  <v-row v-for="(step, i) in nameAllQuestions">
    <v-container v-if="i%2==0">
      <v-row>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <div class="details">
              <h3>{{ step }}</h3>
            </div>
            <apexchart ref="barChart" type="bar" :options="getOptionsStepClusters(nameQuestions[i])" :series="getSeriesStepClusters(nameQuestions[i])"></apexchart>
          </div>
        </v-col>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <div class="details">
              <h3>{{ nameAllQuestions[i+1] }}</h3>
            </div>
            <apexchart ref="barChart" type="bar" :options="getOptionsStepClusters(nameQuestions[i+1])" :series="getSeriesStepClusters(nameQuestions[i+1])"></apexchart>
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
.row_first{
  display: flex;
}
.content_chart, .content_score {
  width: 50%;
  margin: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.column{
  max-width: 50%;
  display: flex;
}
.box {
  /*background-color: #2B2D3E;*/
  background-color: white;
  padding: 0px 20px 25px 20px;
}

.shadow {
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
}
.sparkboxes{
  align-items: center;
  align-content: center;
}
.sparkboxes .box {
  padding-top: 0px;
  padding-bottom: 10px;
  text-shadow: 0 1px 1px 1px #666;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
  position: relative;
  border-radius: 5px;
  width: fit-content;
}
.boxChartCluster{
  padding: 25px 25px 12.5px 25px !important;
}
.box .details{
  color: #127583;
}
.sparkboxes .box .details {
  /* z-index: 50; */
  position: static;

  transform: scale(0.7) translate(-35px, 20px);
  margin: 0% 0% 5% 0%;
  font-size: 16px;
  text-transform: initial;
  height: 70px;
  width: 225px;
}
.sparkboxes .box .details h1{
  text-align: center;
  transform: translate(-22px, 20px);
}
.sparkboxes .box .details h3{
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
  /*border: 10px linear-gradient( 135deg, #daffff 10%, #d5dfdf 100%);*/
  width: 200px;
  height: 150px;
}


.sparkboxes .box2 {
  background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
}

.sparkboxes .box3 {
  background-image: linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%);
}

.sparkboxes .box4 {
  background-image: linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%);
}
#chart-type-select {
  appearance: none; /* Oculta el valor seleccionado por defecto */
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  width: 20px; /* Ajusta el ancho del select para mostrar solo la flecha */
  height: 20px; /* Ajusta la altura del select */
  border: none; /* Elimina el borde */
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-width="2" d="M2,7 L12,17 L22,7"/></svg>') no-repeat right center; /* Reemplaza la flecha por defecto */
  background-color: transparent; /* Hace que el fondo sea transparente */
}
#defa{
  display: none;
}
</style>