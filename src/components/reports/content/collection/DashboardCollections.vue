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
  activeList:String,
  mode:Boolean
})

const search = ref('');

const templateItem=  {
  name: '',
  "Highly/Moderately relevant and used with MSP process": false,
  "Relevant data set with adequate transparency (high FAIR score)": false,
  "Relevant data set and with an adequate spatial coverage for MSP": false,
  "Relevant data set and with an adequate spatial resolution for MSP": false,
  "Relevant data set and fulfilling monitoring & evaluation requirements with adequate temporal coverage": false,
  "Relevant data set with sufficient curacy and consistency": false,
};
const templateItem2={
  name: '',
    "Relevant for MSP, but not used, as not available": false,
    "Relevant for MSP, not used, but available": false,
    "Relevant for MSP, but not findable": true,
    "Relevant for MSP, but not available": true,
    "Relevant for MSP, but not interoperable": true,
    "Relevant for MSP, but not adequate spatial coverage ": true,
    "Relevant for MSP, but not adequate spatial resolution": true,
    "Relevant for MSP, but not adequate temporal coverage": true,
    "Relevant for MSP, but not adequate temporal resolution": true,
    "Relevant for MSP, but inadequate accuracy": true,
    "Relevant for MSP, but inadequate consistency": true,
    "Relevant for MSP not fulfilling monitoring requirements (temporal coverage, availability, transparency and quality)": true
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
    "Highly/Moderately relevant and used with MSP process": getHighlyModerately(parameter),
    "Relevant data set with adequate transparency (high FAIR score)": getHighFairScore(parameter),
    "Relevant data set and with an adequate spatial coverage for MSP": getCoverage(parameter),
    "Relevant data set and with an adequate spatial resolution for MSP": getResolution(parameter),
    "Relevant data set and fulfilling monitoring & evaluation requirements with adequate temporal coverage": getRelevantFulfilling(parameter),
    "Relevant data set with sufficient curacy and consistency": getAccurancyConsistency(parameter),
  };
  return res;
}
const getValuesItem2=(parameter)=>{
  let res={
    "Relevant for MSP, but not used, as not available": getNotUseNotAvailable(parameter),
    "Relevant for MSP, not used, but available": getNotUseAvailable(parameter),
    "Relevant for MSP, but not findable": getNotFindable(parameter),
    "Relevant for MSP, but not available": getNotAvailable(parameter),
    "Relevant for MSP, but not interoperable": getNotInteroperable(parameter),
    "Relevant for MSP, but not adequate spatial coverage ": getNotAdequateSpatialCoverage(parameter),
    "Relevant for MSP, but not adequate spatial resolution": getNotAdequateSpatialResolution(parameter),
    "Relevant for MSP, but not adequate temporal coverage": getNotAdequateTemporalCoverage(parameter),
    "Relevant for MSP, but not adequate temporal resolution": getNotAdequateTemporalResolution(parameter),
    "Relevant for MSP, but inadequate accuracy": getInadequateAccuracy(parameter),
    "Relevant for MSP, but inadequate consistency": getInadequateConsistency(parameter),
    "Relevant for MSP not fulfilling monitoring requirements (temporal coverage, availability, transparency and quality)": getNotFulfillingMonitoringRequirements(parameter)
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
  <p class="description_list" v-if="props.activeList=='List 1'">
    These Report pages collect the assessment metrics used to provide the evaluation results for the MSP data and
    area for which you have filled in the previous forms organized by 4 Categories and 7 Data Framework Clusters.<br>
    Following are presented the different assessment lists for each Cluster’s datasets that are relevant for the MSP
    process and have the specific characteristics:
  </p>
  <p class="description_list" v-else>These Report pages collect the assessment metrics used to provide the evaluation results for the MSP data and
    area for which you have filled in the previous forms organized by 4 Categories and 7 Data Framework Clusters.<br>
    Following are presented the different assessment lists for each Cluster’s datasets that are relevant for the MSP
    process and have the specific characteristics:</p>
  <v-card v-if="!props.mode" flat>
    <v-card-title class="d-flex align-right pe-2 mb-5">
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
      <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
        <tr class="header_tr">
          <template v-for="column in columns" :key="column.key">
            <td>
              <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">
                {{ column.title }}
              </span>
              <v-icon class="btn_info_table" color="grey" icon="mdi-information"></v-icon>
              <template v-if="isSorted(column)">
                <v-icon :icon="getSortIcon(column)"></v-icon>
              </template>
            </td>
          </template>
        </tr>
      </template>
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
  <v-expansion-panels v-else class="panels panels_report" multiple>
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
.description_list{
  width: 90%;
  margin: 1.5% 2.5% auto;
}
</style>