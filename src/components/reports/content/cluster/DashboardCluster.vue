<script setup>
import {onBeforeMount, ref} from 'vue';
import ApexCharts from 'apexcharts';
import {getNamesScore, getValueScore} from "@/modules/countRow.js";


const props = defineProps({
  activeCluster:String
})
const width={score: 450, rest: 650};
const heigth={score: 450, rest: 450};
const colorLine='#127583';
const sparkData = {
  spark1: 1213,
  spark2: 422,
  spark3: 311,
  spark4: 22
};

// Sparkline charts data and options
const spark1Series = ref([{ data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21] }]);
const spark1Options = ref({
  chart: {
    id: 'spark1',
    group: 'sparks',
    type: 'line',
    height: 50,
    sparkline: { enabled: true },
    dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.2 }
  },
  stroke: { curve: 'smooth' },
  markers: { size: 0 },
  colors: [colorLine],
  tooltip: { x: { show: false }, y: { title: { formatter: () => '' } } }
});

const spark2Series = ref([{ data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69] }]);
const spark2Options = ref({
  chart: {
    id: 'spark2',
    group: 'sparks',
    type: 'line',
    height: 80,
    sparkline: { enabled: true },
    dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.2 }
  },
  stroke: { curve: 'smooth' },
  markers: { size: 0 },
  colors: [colorLine],
  tooltip: { x: { show: false }, y: { title: { formatter: () => '' } } }
});

const spark3Series = ref([{ data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19] }]);
const spark3Options = ref({
  chart: {
    id: 'spark3',
    group: 'sparks',
    type: 'line',
    height: 80,
    sparkline: { enabled: true },
    dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.2 }
  },
  stroke: { curve: 'smooth' },
  markers: { size: 0 },
  colors: [colorLine],
  tooltip: { x: { show: false }, y: { title: { formatter: () => '' } } }
});

const spark4Series = ref([{ data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61] }]);
const spark4Options = ref({
  chart: {
    id: 'spark4',
    group: 'sparks',
    type: 'line',
    height: 80,
    sparkline: { enabled: true },
    dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.2 }
  },
  stroke: { curve: 'smooth' },
  markers: { size: 0 },
  colors: [colorLine],
  tooltip: { x: { show: false }, y: { title: { formatter: () => '' } } }
});

// Other charts data and options
const lineSeries = ref([
  { name: 'Music', data: [1, 15, 26, 20, 33, 27] },
  { name: 'Photos', data: [3, 33, 21, 42, 19, 32] },
  { name: 'Files', data: [0, 39, 52, 11, 29, 43] }
]);
const lineOptions = ref({
  chart: {
    height: 328,
    type: 'line',
    zoom: { enabled: false },
    dropShadow: { enabled: true, top: 3, left: 2, blur: 4, opacity: 1 }
  },
  stroke: { curve: 'smooth', width: 2 },
  markers: { size: 6, strokeWidth: 0, hover: { size: 9 } },
  grid: { show: true, padding: { bottom: 0 } },
  labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
  xaxis: { tooltip: { enabled: false } },
  legend: { position: 'top', horizontalAlign: 'right', offsetY: -20 }
});

const radialBarSeries = ref([71, 63, 77]);
const radialBarOptions = ref({
  chart: {
    type: 'radialBar',
    height: 350,
    width: 380,
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 360,
      hollow: { margin: 5, size: '48%', background: 'transparent' },
      track: { show: false },
      dataLabels: { name: { show: false }, value: { show: false } }
    }
  },
  stroke: { lineCap: 'round' },
  labels: ['June', 'May', 'April'],
  legend: { show: true, floating: true, position: 'right', offsetX: 70, offsetY: 240 }
});

const barSeries = ref([
  { name: 'PRODUCT A', data: [14, 25, 21, 17, 12, 13, 11, 19] },
  { name: 'PRODUCT B', data: [13, 23, 20, 8, 13, 27, 33, 12] },
  { name: 'PRODUCT C', data: [11, 17, 15, 15, 21, 14, 15, 13] }
]);
const barOptions =ref( {
  chart: {
    // height: 780000,
    type: 'line',
    stacked: true,
    toolbar: {
      show: true,
      tools: {
        customIcons: [{
          icon: '<select id="chart-type-select"><option id="defa"></option> <option value="line">Line</option><option value="radar">radar</option><option value="bar">Bar</option><option value="area">Area</option></select>',
          index: 4,
          title: 'Change chart type',
          class: 'custom-icon',
          click: function (chart, options, e) {
            console.log('ee')
            const selectElement = document.getElementById('chart-type-select');
            selectElement.addEventListener('change', function(e){
              updateChartType(chart, options, e);
            });
            // updateChartType(e)
            // No se necesita hacer nada aquí ya que manejamos el evento `change` más adelante
          }
        }]
      }
    }
  },
  dataLabels:{
    enabled:false
  },
  plotOptions: {
    bar: {
      columnWidth: '40%',
      horizontal: false,
      // borderRadius:10,
      // borderRadiusOnAllStackedSeries: true
      // borderRadiusApplication:'end',
      // borderRadiusWhenStacked:'last'
    },
  },
  xaxis: {
    tickPlacement:'on',
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
  },
  fill: {
    opacity: 1
  },


});
const bar2Options =ref( {
  chart: {
    // height: 780000,
    type: 'line',
    stacked: true,
  },
  dataLabels:{
    enabled:true
  },
  plotOptions: {
    bar: {
      columnWidth: '40%',
      horizontal: true,
      borderRadius:10,
      borderRadiusOnAllStackedSeries: true
      // borderRadiusApplication:'end',
      // borderRadiusWhenStacked:'last'
    },
  },
  xaxis: {
    tickPlacement:'on',
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
  },
  fill: {
    opacity: 1
  },


})
const areaSeries=ref([
  {
    name: "Music",
    data: [11, 15, 26, 20, 33, 27]
  },
  {
    name: "Photos",
    data: [32, 33, 21, 42, 19, 32]
  },
  {
    name: "Files",
    data: [20, 39, 52, 11, 29, 43]
  }
]);
const areaOptions =ref( {
  chart: {
    height: 380,
    type: 'area',
    stacked: false,
  },
  stroke: {
    curve: 'straight'
  },

  xaxis: {
    categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
  },
  tooltip: {
    followCursor: true
  },
  fill: {
    opacity: 1,
  },
})
const list_score=ref([]);
const updateChartType = (chart, options, event) => {
  const chartType = event.target.value;
  barOptions.value.chart.type = chartType;
  // console.log(chart)
  // console.log(chart.)
  chart.updateOptions(barOptions.value);
};
const setScore=()=>{
  let res=[];
  let namesScores=getNamesScore();
  namesScores.forEach((nameStep)=>{
    res.push(getValueScore(props.activeCluster, nameStep));
  })
  list_score.value=res;
}
onBeforeMount(()=>{
  setScore();
})
</script>
<template>
<!--  <div>-->
  <v-row class="row_first">
    <v-container class="content_score">
      <v-row class="row sparkboxes">
          <v-col class="column">
            <div class="box boxchart">
              <div class="details">
                <h3>Relevance & Application Score</h3>
                <h1>{{ (list_score[0])? list_score[0]: 0}} %</h1>
              </div>
<!--              <apexchart ref="spark1" type="line" :options="spark1Options" :series="spark1Series"></apexchart>-->
            </div>
          </v-col>
          <v-col class="column">
            <div class="box boxchart">
              <div class="details">
<!--                <h3>{{ sparkData.spark2 }}</h3>-->
                <h3>FAIR transparency Score</h3>
                <h1>{{ (list_score[0])? list_score[0]: 0}} %</h1>
              </div>
<!--              <apexchart ref="spark2" type="line" :options="spark2Options" :series="spark2Series"></apexchart>-->
            </div>
          </v-col>
      </v-row>
      <v-row class="row sparkboxes">
        <v-col class="column">
          <div class="box boxchart">
            <div class="details">
<!--              <h3>-->
<!--              </h3>-->
              <h3>Spatial & Temporal coverage</h3>
              <h1>{{ (list_score[0])? list_score[0]: 0}} %</h1>
            </div>
<!--            <apexchart ref="spark3" type="line" :options="spark3Options" :series="spark3Series"></apexchart>-->
          </div>
        </v-col>
        <v-col class="column">
          <div class="box boxchart">
            <div class="details">
              <h3>SQDF</h3>
              <h1>{{ (list_score[0])? list_score[0]: 0}} %</h1>
            </div>
<!--            <apexchart ref="spark4" type="line" :options="spark4Options" :series="spark4Series"></apexchart>-->
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="content_chart">
      <v-row class="row sparkboxes">
        <v-col class="v-col-5">
          <div class="box shadow boxChartCluster">
<!--            <div class="box boxchart">-->
<!--              <div class="details">-->
<!--                <h3>{{ sparkData.spark3 }}</h3>-->
<!--                <h4>Spatial & Temporal coverage</h4>-->
<!--              </div>-->
            <apexchart :height="heigth.rest" :width="width.score" ref="barChart" type="bar" :options="barOptions" :series="barSeries"></apexchart>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
  <v-row>
    <v-container>
      <v-row>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <apexchart ref="barChart" type="bar" :options="bar2Options" :series="barSeries"></apexchart>

          </div>
        </v-col>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <apexchart ref="barChart" type="bar" :options="bar2Options" :series="barSeries"></apexchart>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <apexchart ref="barChart" type="bar" :options="bar2Options" :series="barSeries"></apexchart>
          </div>
        </v-col>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <apexchart ref="barChart" type="bar" :options="bar2Options" :series="barSeries"></apexchart>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-row>

<!--    <div class="row mt-4">-->
<!--      <div class="col-md-5">-->
<!--        <div class="box shadow mt-4">-->
<!--          <apexchart ref="radialBarBottom" type="radialBar" :options="radialBarOptions" :series="radialBarSeries"></apexchart>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-7">-->
<!--        <div class="box shadow mt-4">-->
<!--          <apexchart ref="lineAdwords" type="line" :options="lineOptions" :series="lineSeries"></apexchart>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="row mt-4">-->
<!--      <div class="col-5">-->
<!--        <div class="box shadow mt-4">-->
<!--          <apexchart ref="barChart" type="bar" :options="barOptions" :series="barSeries"></apexchart>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-7">-->
<!--        <div class="box shadow mt-4">-->
<!--          <apexchart ref="areaChart" type="area" :options="areaOptions" :series="areaSeries"></apexchart>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
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
/*.sparkboxes .box[data-v-d0866945] {
//  padding-top: 5px;
//  padding-bottom: 10px;
//  text-shadow: 0 1px 1px 1px #666;
//  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.08);
//  position: relative;
//  border-radius: 5px;
//  width: fit-content;
}*/
.boxChartCluster{
  padding: 25px 25px 12.5px 25px !important;
}
.sparkboxes .box .details {
  /* z-index: 50; */
  position: static;
  color: #127583;
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