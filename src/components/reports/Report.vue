<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue';
import NavReport from "@/components/reports/NavReport.vue";
import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import {outputValues, countRow, transformValues, scoreGlobal} from "@/variables/store.js";
import {getLengthFilterRelevance, getScoreRow} from "@/rules/rules.js";
import {getOutputValues} from "@/modules/utils.js";
import {setFilterValues, getNamesClusterTransformValues} from "@/modules/transformValuesModule.js";

onBeforeMount(() => {
  countRow.value=[];
  scoreGlobal.value=[];
  getOutputValues();
  countParameter();

});

const router= useRouter();

const countParameter=()=>{
  console.log(outputValues.value.Relevance)
  setFilterValues();
  let resScoreList= {};

  Object.entries(outputValues.value).forEach(([keyStep, list_clusters])=> {
    // const name_step = Object.keys(step)[0];
    Object.entries(list_clusters).forEach(([keycluster, list_blocks])=> {
      // Object.entries(cluster).forEach(([keyCluster, blocks])=>{
      // const name_cluster = Object.keys(item)[0];
      if(!resScoreList[keyStep]){
        resScoreList[keyStep] = getScoreRow(list_blocks, keycluster, keyStep);
      } else {
        resScoreList[keyStep]={...resScoreList[keyStep], ...getScoreRow(list_blocks, keycluster, keyStep)}
      }
    })
  });
  scoreGlobal.value={...resScoreList};
  console.log('score',scoreGlobal.value);
  let namesCluster=getNamesClusterTransformValues();
  // Object.entries(outputValues.value).forEach(([keyStep, list_clusters])=> {
    let resFilter=[];
    // const name_step = Object.keys(step)[0];
    // list_clusters.forEach((cluster)=>
    // Object.entries(list_clusters).forEach(([keyCluster, blocks])=>{
      namesCluster.forEach((nameCluster)=>{

        resFilter.push(getLengthFilterRelevance(nameCluster));
      });
    // );
    countRow.value={...countRow.value, ...resFilter};
    // countRow.value.push({[name_step]: resRow});
  // });
}

const handleActiveSection = (value) => {
  console.log('Item clicked:', value);
  router.push({name:value});
};
</script>

<template>
  <Header></Header>
  <v-layout class="nav_block">
    <NavReport @updateActiveSection="handleActiveSection"></NavReport>
    <router-view></router-view>

  </v-layout>
</template>

<style scoped>
.nav_block{
  flex: 1;
}
</style>