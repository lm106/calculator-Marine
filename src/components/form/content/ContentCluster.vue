<script setup>
import { clusters, questions } from "@/components/form/content/clusters.js";
import { ref, watch } from 'vue'
import {useRoute} from "vue-router";
import Results from "@/components/form/content/Results.vue";
import {getCalculateFairReusable, getCalculateSDQFCompleteness, getValueRelevance} from "@/rules/rules.js";
import {checkValuesStep, getValuesCluster,getValueCluster} from "./utils.js";
import {inputValues} from "./store.js";
const props=defineProps({
  active:String
})
const router = useRoute();
const emit = defineEmits(['updateCluster']);

const activePanel = ref([]);
const cluster=ref([]);


const initForm=()=>{
  inputValues.value[router.name]= [];
  if (questions[router.name] && !checkValuesStep(router.name, props.active)) {
    inputValues.value[router.name].push({[props.active]:{}});
    clusters[props.active].forEach(block => {
      inputValues.value[router.name][0][props.active][block.title] = {};
      block.activities.forEach(activity => {
        inputValues.value[router.name][0][props.active][block.title][activity] = {};
        questions[router.name].forEach(column => {
          inputValues.value[router.name][0][props.active][block.title][activity][column] = 0;  // Initial value
        });
      });
    });
  } else{
    inputValues.value[router.name].push(getValuesCluster(router.name, props.active));
  }
}

const checkDisable=(index, column, activity,blockTitle)=>{
  if(index>0 && router.name=='Relevance'){
    let firstColumnValue=inputValues.value[router.name][0][props.active][blockTitle][activity][questions[router.name][0]]
    return firstColumnValue<=1;
  }else if(router.name !='Relevance'){
    return getValueRelevance(props.active, blockTitle,activity, questions['Relevance'][0]);
  } else{
    return false;
  }
}
const getTitleBlock=()=>{
  return clusters[props.active].map((item)=>item.title);
}
const all = () => {
  activePanel.value = getTitleBlock();
};
const none = () => {
  activePanel.value = [];
};

const checkInput=(indexColumn, step)=>{
  if(step == 'Fair' || step == 'SDQF'){
    if(step == 'Fair' && indexColumn == 3 ){
      return false;
    }else if(step == 'SDQF' && indexColumn == 0){
      return false;
    }else {
      return true;
    }
  }else{
    return true;
  }
}

const calculateMean = () => {
  if(router.name == 'Fair') {
    // console.log( 'Calcute meas',inputValues.value)

    clusters[props.active].forEach(block => {
      block.activities.forEach(activity => {
        // console.log(inputValues.value[router.name][0][props.active][block.title][activity][questions[router.name][3]])
        let res=getCalculateFairReusable(props.active, block.title,activity);
        inputValues.value[router.name][0][props.active][block.title][activity][questions[router.name][3]]=res;
      });
    });
  } else if (router.name == 'SDQF'){
    clusters[props.active].forEach(block => {
      block.activities.forEach(activity => {
        // console.log(inputValues.value[router.name][0][props.active][block.title][activity][questions[router.name][0]])
        let res=getCalculateSDQFCompleteness(props.active, block.title,activity);
        // console.log(res)
        inputValues.value[router.name][0][props.active][block.title][activity][questions[router.name][0]]=res;
        // console.log(inputValues.value[router.name][0][props.active][block.title][activity][questions[router.name][0]])

      });
    });
  }
};

const sendCluster=(cluster)=>{
  emit('updateCluster', inputValues.value);
}

watch([() => router.name, () => props.active], () => {
  console.log('Pase por aquí')
  if(Object.keys(inputValues.value).length>0){
    sendCluster('updateCluster', inputValues.value);
  }
  if(router.name != 'Results') {
    inputValues.value = {};
    initForm();
  }
  // calculateMean()

}, { immediate: true });
watch(inputValues, calculateMean, { deep: true });
</script>

<template>
  <Results v-if="router.name =='Results'"></Results>
  <div v-else>
  <div>
    {{ router.name }}
    <div v-if="clusters[active].length > 2" class="text-center d-flex pb-4 ">
      <v-btn class="ma-2" @click="all">All</v-btn>
      <v-btn class="ma-2" @click="none">None</v-btn>
    </div>

    <div class="pb-4">v-model {{ activePanel }}</div>

    <v-expansion-panels class="panels" v-model="activePanel" multiple>
      <v-expansion-panel v-for="(block, index) in clusters[active]"
          :key="index" :value="block.title"
          class="panel_block"
          style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
          border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
      >
        <template #title>
          <div class="title_block">
            <h3 class="title">{{ block.title }}</h3>
            <v-divider></v-divider>
          </div>
        </template>
        <v-expansion-panel-text>
          <div class="content_block">
          <v-container class="item_activity" >
            <v-row  no-gutters>
              <v-col cols="4">
                <label class="pa-2 ma-2 label_name"></label>
              </v-col>
              <v-col v-for="(column, index) in questions[router.name]" class="names_activities" cols="2">
                <label class="pa-2 ma-2 label_name">{{ column }}</label><v-icon color="grey" icon="mdi-information"></v-icon>
              </v-col>
            </v-row>
              <v-row  no-gutters v-for="(activity, index) in block.activities" :key="index">
              <v-col cols="4" class="names_activities names">
                  <label class="pa-2 ma-2 label_name">{{ activity }}  </label><v-icon color="grey" icon="mdi-information"></v-icon>
              </v-col>
                <v-col v-for="(column, indexColumn) in questions[router.name]" cols="2">
                  <v-number-input v-if="checkInput(indexColumn, router.name)"
                      :reverse="false" class="selected" controlVariant="default"
                      :hideInput="false" inset :min="0" :max="3"
                      v-model="inputValues[router.name][0][active][block.title][activity][column]"
                      :disabled="checkDisable(indexColumn, column, activity,block.title)"
                  ></v-number-input>
                  <v-number-input v-else
                      :reverse="false" class="selected" controlVariant="default"
                      :hideInput="false" inset hide-details
                      v-model="inputValues[router.name][0][active][block.title][activity][column]"
                      disabled
                  ></v-number-input>
                </v-col>
              </v-row>

          </v-container>
          </div>
        </v-expansion-panel-text>
        <v-spacer></v-spacer>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  </div>
</template>

<style scoped>
.panels{
  flex-wrap: nowrap !important;
  justify-content: center;
  flex-direction: column !important;
  max-width: 80% !important;
  margin: auto;
}
.panel_block {
  background-color: #ededed !important;
  margin-bottom: 1% !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  border: 1px solid #00000019;
}
.title_block{
  width: 100%;
}
.title{
  margin-bottom: 0.5%;
}
.content_block {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  margin: auto;
}
.item_activity{
  width: 100%;
}
.names_activities{
  margin-top: 1.25%;
  text-align: end;
  display: flex;
}
.names{
  justify-content: flex-end;
  padding: 0px 10px !important;
}
.label_name{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;
  width: fit-content; /* Ensure it takes the full width available */
  display: inline-block;
  padding: 0 !important;
}
.selected{
  border-radius: 10px;
  width: 150px;
}

</style>

