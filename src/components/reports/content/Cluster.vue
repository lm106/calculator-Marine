<script setup>
import { ref } from 'vue';
import { getAllClusters } from "@/modules/utils.js";
import DashboardCluster from "@/components/reports/content/cluster/DashboardCluster.vue";

const activePanel = ref([]);
const listClusters = getAllClusters(); 

</script>

<template>
  <v-expansion-panels class="panels panels_report" v-model="activePanel" multiple>
    <v-expansion-panel 
      v-for="(cluster, index) in listClusters" 
      :key="index" 
      :value="cluster" 
      class="panel_block panel_report"
      style="border-radius: 10px;"
    >
      <template #title>
        <div class="title_block">
          <h3 class="title">{{ cluster }}</h3>
          <v-divider></v-divider>
        </div>
      </template>
      <v-expansion-panel-text>
        <div class="content_block">
          <v-container class="item_activity">
            <DashboardCluster :activeCluster="cluster" />
          </v-container>
        </div>
      </v-expansion-panel-text>
      <v-spacer></v-spacer>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
</style>