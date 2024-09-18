<script setup>
import {computed, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import ContentCluster from "@/components/form/content/ContentCluster.vue";

import { values, saveValuesToLocalStorage } from '../../../variables/store.js'
import {getCopy, getKey} from "../../../modules/utils.js";
import {checkClusterValues, checkQuestionsStepValues} from "../../../modules/ValuesValue.js";

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
const processing=(tokenStep,data)=>{
  // console.log('Cluster: -----', data);
  // console.log('Values: -----', values.value);
  let nameStep=getKey(data)[0]
  let nameCluster=getKey(data[nameStep])[0];
  let tokenCluster=checkClusterValues(nameStep, nameCluster);
  let copy=getCopy(data)
  if(tokenStep && !tokenCluster){
    values.value[nameStep]={...getCopy(values.value[nameStep]), ...copy[nameStep]};
    // values.value={...getCopy(values.value), ...copy}
  }else if(tokenCluster){
    values.value[nameStep][nameCluster]=copy[nameStep][nameCluster];
  }
}
const setCluster=(data)=>{
  // console.log('formform')
  // let key=Object.keys(cluster)[0];
  console.log(data)
  let tokenStep=checkQuestionsStepValues(getKey(data));
  if(!tokenStep) {
    values.value={...getCopy(values.value),...getCopy(data)};
  }else{
    processing(tokenStep,data);
  }
  saveValuesToLocalStorage();
}
watch([()=>route.name], ()=>{
  if(route.name=='Results'){
    active_cluster.value=clusters.value[0];
  }
}, {immediate:true})

const disabledTabs = computed(() => {
  return clusters.value.map((cluster) => {
    if (route.name === 'Relevance') {
      return false;
    } else {
      return values.value.Relevance && !values.value.Relevance[cluster];
    }
  });
});
</script>

<template>
  <v-card class="nav_cluster" v-if="route.name != 'Results'">
    <v-tabs center-active active-class="tab_active">
      <v-tab @click="handleClickCluster(index)" v-for="(cluster, index) in clusters" class="tab" :key="index" color="white" :disabled="disabledTabs[index]">{{ cluster }}</v-tab>
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