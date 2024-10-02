<script setup>
import {ref, onBeforeMount, onUnmounted, getCurrentInstance} from 'vue';
import NavReport from "@/components/reports/NavReport.vue";
import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import {values} from "@/variables/store.js";
import {getKey} from "@/modules/utils.js";
import {initReport} from "@/modules/InitialReport.js";
const instance=getCurrentInstance();
onBeforeMount(() => {
  if(getKey(values.value).length==0) {
    router.push({name: 'Relevance'});
  }else{
    initReport(instance.type.__name);
  }
});

const router= useRouter();
const handleActiveSection = (value) => {
  if(getKey(values.value).length==0) router.push({name:'Relevance'})
  router.push({name:value});
};
</script>

<template>
  <Header></Header>
  <v-layout class="nav_block">
    <NavReport @updateActiveSection="handleActiveSection"></NavReport>
    <router-view class="contenido"></router-view>
  </v-layout>
  <div id="chart"></div>
</template>

<style scoped>
.nav_block{
  flex: 1;
  height: calc(100vh - 60px);
}
.contenido{
  height: calc(100vh - 60px);
  overflow-y: scroll;
  width: 100%;
}
</style>