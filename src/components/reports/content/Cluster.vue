<script setup>
import {ref} from 'vue';
import {getAllClusters, getKey} from "@/modules/utils.js";
import DashboardCluster from "@/components/reports/content/cluster/DashboardCluster.vue";

const activePanel = ref([]);
const list_Clusters=getAllClusters();

</script>

<template>
  <v-expansion-panels class="panels panels_report" v-model="activePanel" multiple>
    <v-expansion-panel v-for="(cluster, i) in list_Clusters" :key="i" :value="cluster" class="panel_block panel_report"
                       style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
                              border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
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
            <DashboardCluster :activeCluster="cluster"></DashboardCluster>
          </v-container>
        </div>
      </v-expansion-panel-text>
      <v-spacer></v-spacer>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>

</style>