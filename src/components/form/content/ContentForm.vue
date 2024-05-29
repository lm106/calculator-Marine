<script setup>
import {ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import ContentCluster from "@/components/form/content/ContentCluster.vue";

import { values } from './store.js'
import {checkCluster, checkQuestionsStep} from "./utils.js";

const clusters= ref([
    'MSFD GES','WFD GES',
    'Conservation & designeted sites',
    'Oceanographic characteristics and climate',
    'Coastal Land use & Planning',
    'Operative maritime activities and Planning',
    'Socio-economic information',
    'Governance information'
  ]);
const route=useRoute();
const active_cluster=ref(clusters.value[0]);
const handleClickCluster=(i)=>{
  active_cluster.value=clusters.value[i];
}

const processing=(indexStep,cluster)=>{
  let nameStep=Object.keys(cluster)[0];
  let nameCluster=Object.keys(cluster[nameStep][0])[0];
  console.log(nameCluster);
  console.log('Cluster: -----', cluster);
  console.log('Values: -----', values.value);
  let indexCluster=checkCluster(indexStep,nameStep, nameCluster);
  // console.log(indexCluster)
  if(indexCluster ==-1){
    values.value[indexStep][nameStep].push(cluster[nameStep][0])
  }else{
    values.value[indexStep][nameStep][indexCluster]=cluster[nameStep][0];
  }
}

const setCluster=(cluster)=>{
  console.log('formform')
  let key=Object.keys(cluster)[0];
  let index=checkQuestionsStep(key);
  if(index == -1) {
    values.value.push(cluster);
  }else{
    processing(index,cluster);
  }
}
watch([()=>route.name], ()=>{
  if(route.name=='Results'){
    active_cluster.value=clusters.value[0];
  }
}, {immediate:true})
</script>

<template>
    <v-card class="nav_cluster" v-if="route.name != 'Results'">
      <v-tabs center-active active-class="tab_active">
        <v-tab @click="handleClickCluster(index)" v-for="(cluster, index) in clusters" class="tab"  :key="index" color="white" >{{ cluster }}</v-tab>
      </v-tabs>
    </v-card>
    <ContentCluster @updateCluster="setCluster" :active="active_cluster"></ContentCluster>
</template>

<style scoped>
.nav_cluster{
  margin: 1.5% 0%;
}
.tab[aria-selected="true"] {
  background-color: var(--color-btn-dark-blue);
}
.tab {
  text-transform: initial !important;
  background: #ddd;
  border-radius: 10px 10px 0px 0px !important;
  margin: 0.5px;
}
</style>