<script setup>
import {ref, computed, defineProps} from 'vue';
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
  <v-card flat>
    <v-card-title class="d-flex align-right pe-2 mb-5">
      <h4 class="title">{{ props.activeList }}</h4>
      <v-spacer class="w-75"></v-spacer>
      <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          class="w-25"
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="activeItems" :header="headers" height="600px" fixed-header fixed-footer>
      <template v-slot:item.name="{ item }">
        <div class="nameParameter">{{ item.name }}</div>
      </template>
      <template  v-for="header in headers.slice(1)" v-slot:[`item.${header.value}`]="{ item }">
        <div class="text-center">
          <v-icon :icon="item[header.value] ? 'mdi-check-circle' : 'mdi-close-circle'"
              size="small" :color="item[header.value] ? 'green' : 'red'">
<!--              {{ item[header.value] ? '' : 'Out' }}-->
          </v-icon>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.nameParameter{
  font-weight: bold;
}
</style>