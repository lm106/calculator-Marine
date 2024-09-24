<script setup>
import {useRoute} from "vue-router";
import {cluster_helps, legend} from "../../variables/helps.js";
import {nameAllQuestions, nameQuestions, title} from "@/variables/clusters.js";
import {getOptionsClusterCategory, getOptionsClusterScoreCategory} from "@/modules/Charts.js";
import {getSeries, getSeriesScores} from "@/modules/SeriesCharts.js";

const route= useRoute();
</script>

<template>
  <div class="content_help_report">
    <v-expansion-panels class="panels panels_report" multiple>
      <v-expansion-panel  v-for="([name, value]) in Object.entries(cluster_helps)"
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
          <p v-html="value"></p>
          <p v-if="name.includes('7 DATA CLUSTER')" v-html="legend"></p>
        </v-expansion-panel-text>
        <v-spacer></v-spacer>
      </v-expansion-panel>
    </v-expansion-panels>
<!--    <template v-for="([name, value]) in Object.entries(cluster_helps)">-->
<!--      <h4>{{name}}</h4>-->
<!--      <p v-html="value"></p>-->
<!--      <br>-->
<!--      <strong>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</strong><br>-->
<!--    </template>-->
  </div>
</template>

<style scoped>
.content_help_report{
    height: 89vh;
    overflow-y: scroll;
    width: 95%;
    margin: 1% 0% 0% 2%;
}
</style>