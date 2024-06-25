<script setup>
import {onBeforeMount, ref} from 'vue';
import {getAllValuesStep, getNamesScore, getValueScore, getValuesPercent} from "@/modules/countRow.js";
import {nameAllQuestions, nameQuestions} from "@/variables/clusters.js";


const props = defineProps({
  activeCluster:String
})

onBeforeMount(()=>{
  setScore();
  setSeries();
  setSeriesStep();
})

const list_score=ref([]);
const series = ref([]);
const seriesSteps=ref([]);
//
// const barSeries = ref([
//   { name: 'PRODUCT A', data: [14, 25 /*, 21, 17, 12, 13, 11, 19*/] },
//   { name: 'PRODUCT B', data: [13, 23/*, 20, 8, 13, 27, 33, 12*/] },
//   { name: 'PRODUCT C', data: [11, 17/*, 15, 15, 21, 14, 15, 13*/] }
// ]);

const width={score: 450, rest: 650};
const heigth={score: 350, rest: 450};
const colorBar= ['#fa6c3d','#127583'];

const barOptions =ref( {
  chart: {
    toolbar: {
      show: true,
      tools: {
        customIcons: [{
          icon: '<select id="chart-type-select"><option id="defa"></option> <option value="line">Line</option><option value="radar">radar</option><option value="bar">Bar</option><option value="area">Area</option></select>',
          index: 4,
          title: 'Change chart type',
          class: 'custom-icon',
          click: function (chart, options, e) {
            const selectElement = document.getElementById('chart-type-select');
            selectElement.addEventListener('change', function(e){
              updateTypeChart(chart, e);
            });
          }
        }]
      }
    }
  },
  colors:colorBar,
  stroke:{
    width: 1
  },
  dataLabels:{
    enabled:true,
  },
  plotOptions: {
    bar: {
      columnWidth: '5%',
      horizontal: true,
      borderRadius:7.5,
      // borderRadiusOnAllStackedSeries: true
      // borderRadiusApplication:'end',
      // borderRadiusWhenStacked:'last'
    },
  },
  xaxis: {
    show:true,
    tickPlacement:'middle',
    categories: [],
    labels:{
      // rotate:0,
      // trim:false,
      showDuplicates:true,
      // hideOverlappingLabels:true
      labels:{
        minHeight: 50,
        maxHeight: 75,
      }
    },
  },
  fill: {
    opacity: 1
  },
  yaxis: {
    reversed: true,
    axisTicks:{
      show:true
    }
  },
});
const StepClusterOptions =ref( {
  chart: {
    type: 'bar',
    // stacked:true
  },
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: '40%',
      barHeight:'20%',
      borderRadius:7.5,
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -10,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  xaxis: {
    categories: ['2011 Q1', '2011 Q2'],
    tickPlacement:'on',
    labels:{
      show:false
    },
    axisBorder:{
      show:false
    },
    axisTicks:{
      show:false
    }
  },
  grid: {
    show:false,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis:{
      lines:{
        show:false
      },
    }
  },
  yaxis: {
    reversed: true,
    axisBorder:{
      show:false
    },
    axisTicks:{
      show:false
    }
  }
});

const setScore=()=>{
  let res=[];
  let namesScores=getNamesScore();
  namesScores.forEach((nameStep)=>{
    res.push(getValueScore(props.activeCluster, nameStep));
  })
  list_score.value=res;
};
const setSeries=()=>{
  let values=getValuesPercent(props.activeCluster);
  barOptions.value.xaxis.categories=Object.keys(values);
  series.value=[{name: props.activeCluster,data: Object.values(values)}];
}
const setSeriesStep=()=>{
  let values=getAllValuesStep(props.activeCluster);
  seriesSteps.value=values;
};

const getSeriesStep=(step)=>{
  console.log(seriesSteps.value[step])
  console.log(step)
  let values=[{name: step, data: []}]
  seriesSteps.value[step].forEach((obj)=>{
    values[0].data.push(obj.data[0])
  })
  return values
}
const getOptionsStep=(step)=>{
  let categories=[]
  seriesSteps.value[step].forEach((obj)=>{
    categories.push(obj.name)
  })
  let options ={chart: {
      type: 'bar',
      // stacked:true
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '40%',
        barHeight:'20%',
        borderRadius:7.5,
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -10,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: categories,
      tickPlacement:'on',
      labels:{
        show:false
      },
      axisBorder:{
        show:false
      },
      axisTicks:{
        show:false
      }
    },
    grid: {
      show:false,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis:{
        lines:{
          show:false
        },
      }
    },
    yaxis: {
      reversed: true,
      axisBorder:{
        show:false
      },
      axisTicks:{
        show:false
      }
    }};

  return options;
}
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
<!--              <apexchart ref="spark1" type="line" :options="spark1Options" :series="spark1Series"></apexchart>-->
            </div>
          </v-col>
          <v-col class="column">
            <div class="box boxchart">
              <div class="details">
<!--                <h3>{{ sparkData.spark2 }}</h3>-->
                <h3>FAIR transparency Score</h3>
                  <h1>{{ (list_score[1])? list_score[1]: 0}} %</h1>
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
              <h1>{{ (list_score[2])? list_score[2]: 0}} %</h1>
            </div>
<!--            <apexchart ref="spark3" type="line" :options="spark3Options" :series="spark3Series"></apexchart>-->
          </div>
        </v-col>
        <v-col class="column">
          <div class="box boxchart">
            <div class="details">
              <h3>SQDF</h3>
              <h1>{{ (list_score[3])? list_score[3]: 0}} %</h1>
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
            <apexchart :height="heigth.rest" :width="width.score" ref="barChart" type="bar" :options="barOptions" :series="series"></apexchart>
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
            <apexchart ref="barChart" type="bar" :options="getOptionsStep(nameQuestions[i])" :series="getSeriesStep(nameQuestions[i])"></apexchart>
          </div>
        </v-col>
        <v-col class="v-col-6">
          <div class="box shadow boxChartCluster">
            <div class="details">
              <h3>{{ nameAllQuestions[i+1] }}</h3>
            </div>
            <apexchart ref="barChart" type="bar" :options="getOptionsStep(nameQuestions[i+1])" :series="getSeriesStep(nameQuestions[i+1])"></apexchart>
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