<script setup>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const props=defineProps({
  columns:Array
})
const route=useRoute();
const legends={
  'Relevance for national MSP process':['Highly Relevant','Moderately Relevant','Low Relevance','Not Relevant'],
  'Considered/used within MSP process':['Properly Applied','Used, but Not Properly Applied','Considered, but Not Used','Not Considered'],
  'Data is Findable':['Data is described with metadata that are registered, indexed, and findable through international catalogues (e.g., INSPIRE, EU Open Data Portal, EMODnet)',
    'Data is described with metadata, registered, indexed, and findable through national or local catalogues',
    'Data is described with metadata but not registered or indexed in searchable resource catalogues',
    'Metadata do not exist, and information is not discoverable (findable)'],
  'Data is Accesible':['Data is publicly accessible through open protocol','Data is accessible on demand, not through open protocol',
    'Data is existing, locked, and not available','Data not available'],
  'Data is Interoperable':['Followed and harmonized data by international standards (e.g., INSPIRE, S-56, OGC)',
    'Data set not harmonized but applied international standardized semantics (e.g., EUNIS, EU-NOMEN, WORMS, INSPIRE code lists, IUCN protected areas categories, CORINE classes)',
    'National standards applied','Not harmonized'],
  'Data is Reusable':'',
  'Spatial coverage (extension) of the data set':['Complete spatial coverage of the area relevant for MSP (e.g., coastal waters or EEZ).',
    'Partial coverage, somewhat relevant for MSP but not entirely adequate.',
    'Sporadic coverage, inadequate for MSP purposes.','No spatial data component available.'],
  'Spatial resolution of the data (level of details)':['Spatial resolution adequate for MSP.',
    'Medium-level resolution, somewhat relevant but not entirely adequate for the MSP process.',
    'Coarse resolution, insufficient for proper use in the MSP process but still possible to apply.',
    'Inadequate spatial resolution for MSP planning area, making it difficult to apply for MSP.'],
  'Temporal coverage':['Temporal resolution adequate for MSP.',
    'Medium-level resolution, somewhat relevant but not entirely adequate for the MSP process.',
    'Coarse resolution, insufficient for proper use in the MSP process but still possible to apply.',
    'Inadequate temporal resolution for MSP planning area, making it difficult to apply for MSP.'],
  'Temporal resolution':['Temporal resolution adequate for MSP.',
    'Medium-level resolution, somewhat relevant but not entirely adequate for the MSP process.',
    'Coarse resolution, insufficient for proper use in the MSP process but still possible to apply.',
    'Inadequate temporal resolution for MSP planning area, making it difficult to apply for MSP.'],
  'Data consistency with MSP input data':['High accuracy data, obtained by monitoring, observations or survey.',
    'Medium accuracy data, obtained by modelling.','Low accuracy data (e.g obtained by proxy).',
    'Accuracy information not available and difficult to assess.'],
  'Data accuracy and possible margin of error':['High consistency – data has a logical uniformity with other spatial data used in the MSP process.',
    'Medium consistency – data presents minor discrepancies with some spatial data used in the MSP process.',
    'Low consistency - data presents significant contradictions with spatial data used in the MSP process.',
    'Inconsistent data with spatial data used in the MSP process, or consistency cannot be assessed.'],
  'Completeness and timeliness':''
}
const type= ref();
const getColumns=()=>{
  if(route.name=='Fair'){
    return props.columns.filter((item)=> item != 'Data is Reusable');
  }else if(route.name=='SDQF'){
    return props.columns.filter((item)=> item != 'Completeness and timeliness');
  }else {
    return props.columns;
  }
}
watch(() => props.columns, () => {
  type.value = undefined;
});
</script>

<template>
  <v-alert class="alert_legend" border="top" color="#DD6D45"
           variant="outlined">
    <template #title>
      <v-icon size="25" id="icon_alert_title" icon="mdi-information"></v-icon>
      <h6 class="title_legend">
        Legend of Questions
      </h6>
    </template>
    <template #text>
    <v-select
        label="Select"
        v-model="type"
        :items="getColumns()"
        variant="solo-filled"
    ></v-select>
      <div class="content_alert_text">
        <h5 v-for="(score, index) in legends[type]">Score {{  legends[type].length - index - 1  }}: <span class="type_score"> {{ score }}</span><br></h5>
      </div>
    </template>
    </v-alert>
</template>

<style scoped>
.alert_legend{
  width: 15%;
  height: 300px;
  position: fixed;
  bottom: 1%;
  left: 2px;
  z-index: 5;
  padding: 7.5px !important;
}
.title_legend{
  margin-left: 5%;
  font-size: 16px ;
}
.content_alert_text{
  height: 150px;
  overflow-y: auto;
}
.type_score{
  font-weight: normal;
}
</style>