<script setup>
import { clusters, questions } from "@/variables/clusters.js";
import { ref, watch } from 'vue'
import { useRoute } from "vue-router";
import Results from "@/components/form/content/Results.vue";
import {getCalculateFairReusable, getCalculateSDQFCompleteness, getValueRelevance} from "@/rules/rules.js";
import {checkStepValues, getValuesClusterValues,getValueQuestionValues} from "../../../modules/ValuesValue.js";
import {inputValues} from "../../../variables/store.js";
const props=defineProps({
  active:String
})
const route = useRoute();
const emit = defineEmits(['updateCluster']);

const activePanel = ref([]);
const tokenInit = ref(false);
const cluster=ref([]);

const initForm=()=>{
  inputValues.value[route.name]= {};
  if (questions[route.name] && !checkStepValues(route.name, props.active)) {
    inputValues.value[route.name][props.active]={};
    clusters[props.active].forEach(block => {
      inputValues.value[route.name][props.active][block.title] = {};
      block.activities.forEach(activity => {
        inputValues.value[route.name][props.active][block.title][activity] = {};
        questions[route.name].forEach(column => {
          inputValues.value[route.name][props.active][block.title][activity][column] = 0;  // Initial value
        });
      });
    });
  } else{
    inputValues.value[route.name]=getValuesClusterValues(route.name, props.active);
  }
}

const checkDisable=(index, column, activity,blockTitle)=>{
  if(index>0 && route.name=='Relevance'){
    let firstColumnValue=inputValues.value[route.name][props.active][blockTitle][activity][questions[route.name][0]]
    if(firstColumnValue <2) {
      inputValues.value[route.name][props.active][blockTitle][activity][questions[route.name][1]] = 0
    }
    return firstColumnValue<=1;
  }else if(route.name !='Relevance'){
    let valueFirstColumnRelevance=getValueRelevance(props.active, blockTitle,activity, questions['Relevance'][0])
    console.log(valueFirstColumnRelevance)
    if(valueFirstColumnRelevance){
      for (let i = 0; i < questions[route.name].length; i++) {
        inputValues.value[route.name][props.active][blockTitle][activity][questions[route.name][i]] = 0
      }
    }
    return valueFirstColumnRelevance;
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
  if(route.name == 'Fair') {
    // console.log( 'Calcute meas',inputValues.value)

    clusters[props.active].forEach(block => {
      block.activities.forEach(activity => {
        // console.log(inputValues.value[route.name][0][props.active][block.title][activity][questions[route.name][3]])
        let res=getCalculateFairReusable(props.active, block.title,activity);
        inputValues.value[route.name][props.active][block.title][activity][questions[route.name][3]]=res;
      });
    });
  } else if (route.name == 'SDQF'){
    clusters[props.active].forEach(block => {
      block.activities.forEach(activity => {
        // console.log(inputValues.value[route.name][0][props.active][block.title][activity][questions[route.name][0]])
        let res=getCalculateSDQFCompleteness(props.active, block.title,activity);
        // console.log(res)
        inputValues.value[route.name][props.active][block.title][activity][questions[route.name][0]]=res;
        // console.log(inputValues.value[route.name][0][props.active][block.title][activity][questions[route.name][0]])

      });
    });
  }
};

const sendCluster=(cluster)=>{
  emit('updateCluster', inputValues.value);
}

watch([() => route.name, () => props.active], () => {
  // console.log('Pase por aquí')
  // console.log('P', inputValues.value)
  if(tokenInit.value && Object.values(inputValues.value).length>0){
    sendCluster('updateCluster', inputValues.value);
  }
  if(route.name != 'Results') {
    inputValues.value = {};
    initForm();
  }
  tokenInit.value=true;
}, { immediate: true });

watch(inputValues, calculateMean, { deep: true });
</script>

<template>
  <Results v-if="route.name =='Results'"></Results>
  <div v-else>
  <div>
    <div v-if="clusters[active].length > 2" class="text-center d-flex pb-4 justify-end ma-2">
      <v-btn class="btn ma-2" @click="all" :base-color="'var(--color-orange)'">All</v-btn>
      <v-btn class="btn ma-2" @click="none" :base-color="'var(--color-btn-grey)'">None</v-btn>
    </div>


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
          <v-container class="item_activity">
            <v-row  no-gutters>
              <v-col cols="4">
                <label class="pa-2 ma-2 label_name"></label>
              </v-col>
              <v-col v-for="(column, index) in questions[route.name]" class="names_activities" cols="2">
                <label class="pa-2 ma-2 label_name">{{ column }}</label><v-icon color="grey" icon="mdi-information"></v-icon>
              </v-col>
            </v-row>
            <div class="content_block_scroll">
              <v-row  no-gutters v-for="(activity, index) in block.activities" :key="index">
                <v-col cols="4" class="names_activities names">
                    <label class="pa-2 ma-2 label_name">{{ activity }}</label><v-icon color="grey" icon="mdi-information"></v-icon>
                </v-col>
                <v-col v-for="(column, indexColumn) in questions[route.name]" cols="2">
                  <v-number-input v-if="checkInput(indexColumn, route.name)"
                      :reverse="false" class="selected" controlVariant="default"
                      :hideInput="false" inset :min="0" :max="3"
                      v-model="inputValues[route.name][active][block.title][activity][column]"
                      :disabled="checkDisable(indexColumn, column, activity,block.title)"
                  ></v-number-input>
                  <v-number-input v-else
                      :reverse="false" class="selected" controlVariant="default"
                      :hideInput="false" inset hide-details
                      v-model="inputValues[route.name][active][block.title][activity][column]"
                      disabled
                  ></v-number-input>
                </v-col>
              </v-row>
            </div>
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
.content_block_scroll{
  max-height: 250px;
  overflow-y: auto;
}
</style>

