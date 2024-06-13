<script setup>
import { useRoute } from "vue-router";
import {onBeforeMount, ref, watch} from 'vue';
import {nameAllQuestions} from "@/variables/clusters.js";
// import {getOutputValues} from "@/modules/utils.js";
import {countRow, outputValues, scoreGlobal, transformValues} from "../../../variables/store.js";
import {getAllClusters, getKey} from "@/modules/utils.js";
import {getNamesAskStep, getNamesScore, getValuesAsk, getValuesScore} from "@/modules/countRow.js";
import {getOutputValues} from "@/modules/OutputValue.js";

const route= useRoute();
const activePanel = ref([]);
const title= ['Relevance & Application Score', 'FAIR Transparency Score', 'SDF Score', 'Spatial & temporal score'];
const namesScore=getNamesScore();
const namesSteps=getKey(transformValues.value);
const height=ref({heightCharScore:325, heightChar:275});
const width=ref({widthCharScore:425});

onBeforeMount(() => {
  if(namesScore.length!=0){
    setSeries()
    setSeriesScores()
  }

});

const chartOptions = {
  chart: {
    id: 'basic-bar'
  },
  xaxis: {
    categories: getAllClusters()
  },
  theme:{
    palette: 'palette2'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '100%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    // show: true,
    width: 2.75,
    // colors: ['transparent']
  },
  tooltip:{
    y:{
      formatter: function (val) {
        return val + "%";
      },
    }
  }
};
// const chartOptionsScore = ref({
//   chart: {
//     id: 'fb',
//     group: 'social',
//     type: 'line',
//     height: 650,
//     width:'500'
//   },
//   colors: ['#fb4300'],
//   xaxis: {
//     categories: getAllClusters(),
//     labels: {
//       show: true,
//       rotate: -45,
//       rotateAlways: true,
//       // hideOverlappingLabels: true,
//       // showDuplicates: false,
//       minHeight: 75,
//       style: {
//         //   colors: [],
//         fontSize: '12px',
//         //   fontFamily: 'Helvetica, Arial, sans-serif',
//         //   fontWeight: 400,
//         //   cssClass: 'apexcharts-xaxis-label',
//       }
//     },
//   },
//   legend: {
//     show: true,
//     showForSingleSeries: true,
//     // position: 'bottom',
//     horizontalAlign: 'center',
//   },
//   // title: {
//   //   text: title,
//   //   align: 'center',
//   //   style: {
//   //     color: '#444'
//   //   }
//   // },
//   // chart: {
//   //   height: 500,
//   //   type: 'line',
//   //   zoom: {
//   //     enabled: false
//   //   }
//   // },
//   dataLabels: {
//     enabled: true
//   },
//   markers: {
//     size: 1
//   },
// });
const chartOptionsScore = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#304758"]
    }
  },
  xaxis: {
    categories: getAllClusters(),
    position: 'bottom',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + "%";
      }
    }

  },
  title: {
    text: title.value,
    // floating: false,
    // offsetY: 5030,
    align: 'center',
    style: {
      color: '#444'
    }
  },
  colors: ['#fb4300'],
};
const series = ref({});
const seriesScores = ref([]);

const setSeries=()=>{
  let namesSeries=getNamesAskStep(namesSteps[0]);
  // console.log(namesSteps)
  let res=[];
  namesSteps.forEach((step)=>{
    namesSeries.forEach((e)=>{
      // console.log(e);
      res.push({name: e, data: getValuesAsk(e) })
    });
    series.value={[step]: res};

  });
  // [
  //   {
  //     name: 'series-1',
  //     data: [30, 40, 45, 50, 49, 60, 70, 91]
  //   },
  //   {
  //     name: 'series-2',
  //     data: [31, 42, 50, 52, 49, 60, 70, 91]
  //   },
  //   {
  //     name: 'series-3',
  //     data: [31, 42, 50, 52, 49, 60, 70, 91]
  //   },{
  //   name: 'series-4',
  //   data: [31, 42, 50, 52, 49, 60, 70, 91]
  // },
  // ]
};
const setSeriesScores=()=>{
  namesScore.forEach((e)=> {
    let values = getValuesScore(e);
    seriesScores.value={...seriesScores.value, [namesSteps[0]]: [{name: 'Relevance & Aplication Score', data: values}]};
  });
};

const getSeries=(i)=>{
  if(namesSteps[i]){
    // return ;
    return series.value[namesSteps[i]];
    // return {name:'dd', data:[]}
  }else{
    return [{name: undefined, data: []}]
  }
}
const getSeriesScores=(i)=>{
  if(namesSteps[i]){
    console.log(seriesScores.value[namesSteps[i]])
    return seriesScores.value[namesSteps[i]];
  }else{
    return [{name: undefined, data: []}]
  }
}
const getChartOptionsScore =(i)=>{
  chartOptionsScore.title.text=title[i];
  return chartOptionsScore;
}
</script>

<template>
  <v-expansion-panels class="panels panels_report" v-model="activePanel" multiple>
    <v-expansion-panel v-for="(step, i) in nameAllQuestions"
                       class="panel_block panel_report" style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
          border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
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
            <v-row  no-gutters>
              <apexchart :width="width.widthCharScore" :height="height.heightChar" type="bar" :options="chartOptions" :series="getSeries(i)"></apexchart>
              <apexchart :width="width.widthCharScore" :height="height.heightCharScore" type="bar" :options="getChartOptionsScore(i)" :series="getSeriesScores(i)"></apexchart>
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