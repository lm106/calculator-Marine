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
const height=ref({heightCharScore:325, heightChar:325});
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
      horizontal: true,
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
  },
  title: {
    text: nameAllQuestions[0],
    // floating: false,
    // offsetY: 5030,
    align: 'center',
    style: {
      color: '#444'
    }
  },
};
const chartOptionsScore = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal:true,
      // borderRadius: 10,
      dataLabels: {
        position: 'center', // top, center, bottom
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    // offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ["#fff","#304758"]
    }
  },
  xaxis: {
    categories: getAllClusters(),
    position: 'bottom',
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true
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
    reversed:true,
    axisBorder: {
      show: true
    },
    axisTicks: {
      show: true,
    },
    labels: {
      show: true,
      formatter: function (val) {
        return val;
      }
    }
  },
  legend: {
    showForSingleSeries: true,
  },
  title: {
    text: title.value,
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
  // let namesSeries=getNamesAskStep(namesSteps[0]);
  // console.log(namesSteps)
  namesSteps.forEach((step)=>{
    let namesSeries=getNamesAskStep(step);
    let res=[];

    namesSeries.forEach((e)=>{
      // console.log(e);
      res.push({name: e, data: getValuesAsk(e) })
    });
    series.value={...series.value,[step]: res};

  });
};
const setSeriesScores=()=>{
  namesScore.forEach((e)=> {
    let values = getValuesScore(e);
    seriesScores.value={...seriesScores.value, [e]: values};
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
    // console.log(seriesScores.value[namesSteps[i]])
    return [{name: namesScore[i],data:seriesScores.value[namesScore[i]]}];
  }else{
    return [{name: undefined, data: []}]
  }
}
const getChartOptions =(i)=>{
  chartOptions.title.text=nameAllQuestions[i];
  return chartOptions;
}
const getChartOptionsScore =(i)=>{
  chartOptionsScore.title.text=title[i];
  return chartOptionsScore;
}
</script>

<template>
  <v-expansion-panels class="panels panels_report" multiple>
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
              <v-col>
              <apexchart :width="width.widthCharScore" :height="height.heightChar" type="bar" :options="getChartOptions(i)" :series="getSeries(i)"></apexchart>
              </v-col>
              <v-col>
              <apexchart :width="width.widthCharScore" :height="height.heightChar" type="bar" :options="getChartOptionsScore(i)" :series="getSeriesScores(i)"></apexchart>
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