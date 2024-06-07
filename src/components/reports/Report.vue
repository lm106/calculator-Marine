<script setup>
import { ref, onBeforeMount, onUnmounted } from 'vue';
import NavReport from "@/components/reports/NavReport.vue";
import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import {outputValues, countRow, transformValues, scoreGlobal} from "@/components/form/content/store.js";
import {getLengthFilterRelevance, getScoreRow} from "@/rules/rules.js";
import {getOutputValues, setFilterValues} from "@/components/form/content/utils.js";

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
      resScoreList = {...resScoreList, ...getScoreRow(list_blocks, keycluster, keyStep)};
      // })
    })
  });
  scoreGlobal.value={...resScoreList};
  console.log(scoreGlobal.value);

  Object.entries(outputValues.value).forEach(([keyStep, list_clusters])=> {
    let resFilter=[], resScoreList=[];
    // const name_step = Object.keys(step)[0];
    // list_clusters.forEach((cluster)=>
        Object.entries(list_clusters).forEach(([keyCluster, blocks])=>{

        resFilter.push(getLengthFilterRelevance(blocks, keyCluster, keyStep));
      });
    // );
    countRow.value={...countRow.value, ...resFilter};
    // countRow.value.push({[name_step]: resRow});
  });
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