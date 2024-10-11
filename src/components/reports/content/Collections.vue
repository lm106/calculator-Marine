<script setup>
import {onBeforeMount, ref} from 'vue';

import DashboardCollections from "@/components/reports/content/collection/DashboardCollections.vue";
import {setInitListValues, setListValues} from "@/modules/ListsValues.js";
import {listValues} from "@/variables/store.js";

const list=ref(['List 1', "List 2"])
const activePanel = ref([0,1]);
const mode = ref(true);
onBeforeMount(()=>{
  listValues.value=setListValues(setInitListValues());
})

const setMode=(token)=>{
  mode.value=token;
}
</script>

<template>
  <div>
    <div class="div_btn_mode">
    <v-btn @click="setMode(true)" class="btn_mode_filter" rounded="0" icon="mdi-list-box-outline"></v-btn>
    <v-btn @click="setMode(false)" class="btn_mode_filter" rounded="0" icon="mdi-table"></v-btn>
    </div>
  <v-expansion-panels class="panels panels_report" v-model="activePanel" readonly>
    <v-expansion-panel v-for="(name, i) in list" :key="i"
        class="panel_block panel_report panel_collections" style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
        hide-actions
    >
      <v-expansion-panel-text>
        <DashboardCollections :activeList="name" :mode="mode"></DashboardCollections>
      </v-expansion-panel-text>
      <v-spacer></v-spacer>
    </v-expansion-panel>
  </v-expansion-panels>
  </div>
</template>

<style scoped>
.panel_collections{
  max-width: 100% !important;
  background-color: white !important;
}
.div_btn_mode{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1.5% 2.5% 1% 2.5%;
  background-color: var(--color-block);
  border-radius: 5px;
  border: 2px solid var(--color-btn-grey);
  float: right;
  padding: 10px;
}
.btn_mode_filter{
  border-radius: 7.5px !important;
  background-color: var(--color-btn-dark-blue);
  color: white;
  margin: 0% 4.5px;
}
</style>