<script setup>
import {onBeforeMount, ref} from 'vue';

import DashboardCollections from "@/components/reports/content/collection/DashboardCollections.vue";
import {setInitListValues, setListValues} from "@/modules/ListsValues.js";
import {listValues} from "@/variables/store.js";

const list=ref(['List 1', "List 2"])
const activePanel = ref([0,1]);
onBeforeMount(()=>{
  listValues.value=setListValues(setInitListValues());
})

</script>

<template>
  <div>
  <v-expansion-panels class="panels panels_report" v-model="activePanel" readonly>
    <v-expansion-panel v-for="(name, i) in list" :key="i"
        class="panel_block panel_report panel_collections" style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
        border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
        hide-actions
    >
      <v-expansion-panel-text>
        <DashboardCollections :activeList="name"></DashboardCollections>
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
</style>