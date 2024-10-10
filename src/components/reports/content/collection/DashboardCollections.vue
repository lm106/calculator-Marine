<script setup>
import {ref, computed} from 'vue';
import {listValues} from "@/variables/store.js";
import {
  getAccurancyConsistency,
  getCoverage,
  getHighFairScore,
  getHighlyModerately, getInadequateAccuracy, getInadequateConsistency,
  getNotAdequateSpatialCoverage,
  getNotAdequateSpatialResolution,
  getNotAdequateTemporalCoverage,
  getNotAdequateTemporalResolution,
  getNotAvailable,
  getNotFindable,
  getNotFulfillingMonitoringRequirements,
  getNotInteroperable,
  getNotUseAvailable,
  getNotUseNotAvailable,
  getRelevantFulfilling,
  getResolution
} from "@/rules/rulesList.js";
import DashboardCluster from "@/components/reports/content/cluster/DashboardCluster.vue";

const props=defineProps({
  activeList:String
})

const search = ref('');

const templateItem=  {
  name: '',
  "Highly/Moderately": false,
  "High FAIR Score": false,
  "Coverage": true,
  "Resolution": true,
  "Relevant and Fulfilling": true,
  "Accurancy and Consistency": true,
};
const templateItem2={
  name: '',
      "Not used (not available)": false,
    "Not used (available)": false,
    "Not findable": true,
    "Not available": true,
    "Not interoperable": true,
    "Not adequate spatial coverage": true,
    "Not adequate spatial resolution": true,
    "Not adequate temporal coverage": true,
    "Not adequate temporal resolution": true,
    "Inadequate accuracy": true,
    "Inadequate consistency": true,
    "Not fulfilling monitoring requirements": true
};

const generateItems=()=>{
  let res=[];
  Object.keys(listValues.value).forEach((keyParameter)=>{
    let values=(props.activeList=='List 1')?getValuesItem1(keyParameter):getValuesItem2(keyParameter);
    res.push({name:keyParameter,...values});
  })
  return res;
}

const getValuesItem1=(parameter)=>{
  let res={
    "Highly/Moderately": getHighlyModerately(parameter),
    "High FAIR Score": getHighFairScore(parameter),
    "Coverage": getCoverage(parameter),
    "Resolution": getResolution(parameter),
    "Relevant and Fulfilling": getRelevantFulfilling(parameter),
    "Accurancy and Consistency": getAccurancyConsistency(parameter),
  };
  return res;
}
const getValuesItem2=(parameter)=>{
  let res={
    "Not used (not available)": getNotUseNotAvailable(parameter),
    "Not used (available)": getNotUseAvailable(parameter),
    "Not findable": getNotFindable(parameter),
    "Not available": getNotAvailable(parameter),
    "Not interoperable": getNotInteroperable(parameter),
    "Not adequate spatial coverage": getNotAdequateSpatialCoverage(parameter),
    "Not adequate spatial resolution": getNotAdequateSpatialResolution(parameter),
    "Not adequate temporal coverage": getNotAdequateTemporalCoverage(parameter),
    "Not adequate temporal resolution": getNotAdequateTemporalResolution(parameter),
    "Inadequate accuracy": getInadequateAccuracy(parameter),
    "Inadequate consistency": getInadequateConsistency(parameter),
    "Not fulfilling monitoring requirements": getNotFulfillingMonitoringRequirements(parameter)
  };
  return res;
}
const generateHeaders = () => {
  let data=(props.activeList=='List 1')? templateItem: templateItem2;
  if (data.length === 0) return [];
  return Object.keys(data).map(key => ({
    text: key,
    value: key
  }));
};
const headers = computed(() => generateHeaders());
const activeItems = computed(() => generateItems());

</script>

<template>
<!--  <v-card flat>-->
<!--    <v-card-title class="d-flex align-right pe-2 mb-5">-->
<!--      <h4 class="title">{{ props.activeList }}</h4>-->
<!--      <v-spacer class="w-75"></v-spacer>-->
<!--      <v-text-field-->
<!--          v-model="search"-->
<!--          density="compact"-->
<!--          label="Search"-->
<!--          prepend-inner-icon="mdi-magnify"-->
<!--          variant="solo-filled"-->
<!--          flat-->
<!--          hide-details-->
<!--          single-line-->
<!--          class="w-25"-->
<!--      ></v-text-field>-->
<!--    </v-card-title>-->
<!--    <v-divider></v-divider>-->
<!--    <v-data-table v-model:search="search" :items="activeItems" :header="headers" height="600px" fixed-header fixed-footer>-->
<!--      <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">-->
<!--        <tr class="header_tr">-->
<!--          <template v-for="column in columns" :key="column.key">-->
<!--            <td>-->
<!--              <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">-->
<!--                {{ column.title }}-->
<!--              </span>-->
<!--              <v-icon class="btn_info_table" color="grey" icon="mdi-information"></v-icon>-->
<!--              <template v-if="isSorted(column)">-->
<!--                <v-icon :icon="getSortIcon(column)"></v-icon>-->
<!--              </template>-->
<!--            </td>-->
<!--          </template>-->
<!--        </tr>-->
<!--      </template>-->
<!--      <template v-slot:item.name="{ item }">-->
<!--        <div class="nameParameter">{{ item.name }}</div>-->
<!--      </template>-->
<!--      <template  v-for="header in headers.slice(1)" v-slot:[`item.${header.value}`]="{ item }">-->
<!--        <div class="text-center">-->
<!--          <v-icon :icon="item[header.value] ? 'mdi-check-circle' : 'mdi-close-circle'"-->
<!--              size="small" :color="item[header.value] ? 'green' : 'red'">-->
<!--&lt;!&ndash;              {{ item[header.value] ? '' : 'Out' }}&ndash;&gt;-->
<!--          </v-icon>-->
<!--        </div>-->
<!--      </template>-->
<!--    </v-data-table>-->
<!--  </v-card>-->
  <v-expansion-panels class="panels panels_report" multiple>
    <v-expansion-panel v-for="(name_list, i) in headers.slice(1)" :key="i" class="panel_block panel_report"
                       style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
                              border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
    >
      <template #title>
        <div class="title_block">
          <h3 class="title">{{ name_list.text}}</h3>
          <v-divider></v-divider>
        </div>
      </template>
      <v-expansion-panel-text>
        <div class="content_block">
          <v-container class="item_activity">
            <ul>
            <template v-for="(item,i) in activeItems" ><li v-if="item[name_list.value]">{{ item.name }}</li></template>
            </ul>
          </v-container>
        </div>
      </v-expansion-panel-text>
      <v-spacer></v-spacer>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.nameParameter{
  font-weight: bold;
}
.btn_info_table{
  float: right;
}
.header_tr{
  background-color: white;
}
</style>