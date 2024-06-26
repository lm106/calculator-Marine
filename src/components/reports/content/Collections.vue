<script setup>
import {useRoute} from "vue-router";
import {onBeforeMount, ref, watch} from 'vue';

import DashboardCollections from "@/components/reports/content/collection/DashboardCollections.vue";


const route= useRoute();
const list=ref(['List 1', "List 2"])


onBeforeMount(() => {

});

</script>

<template>
  {{ route.name }}
  <v-expansion-panels class="panels panels_report">
    <v-expansion-panel v-for="(name, i) in list" :key="i"
                       class="panel_block panel_report" style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
          border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
    >
      <template #title>
        <div class="title_block">
          <h3 class="title">{{ name }}</h3>
          <v-divider></v-divider>
        </div>
      </template>
      <v-expansion-panel-text>
        <div class="content_block">
          <v-container class="item_activity">
            <DashboardCollections :activeCluster="name"></DashboardCollections>
          </v-container>
        </div>
      </v-expansion-panel-text>
      <v-spacer></v-spacer>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>

</style>