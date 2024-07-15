<script setup>
import {computed, ref, watch} from 'vue';
import Steps from "@/components/form/steps/Steps.vue";
import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import AlertHelp from "@/components/help/AlertHelp.vue";
import LegendForm from "@/components/form/LegendForm.vue";
import {questions} from "@/variables/clusters.js";

const showAlert =ref(false);
const router=useRouter();
const steps = ref([
  { number: 1, name: 'Relevance for MSP', route:'Relevance', status: 'active' },
  { number: 2, name: 'FAIR',  route:'Fair', status: 'pending' },
  { number: 3, name: 'Spatial and temporal coverage & resolution', route:'Resolution and temporal', status: 'pending' },
  { number: 4, name: 'SDQF',  route:'SDQF',status: 'pending' },
  { number: 5, name: 'Results', route:'Results', status: 'pending' }
]);
const list_questions=ref([...questions.Relevance])

const handleClick=(name)=>{
  router.push({name:name})
}
const handleClickStep=(step)=>{
  let now = (step.name!=undefined)?
      steps.value.findIndex((item)=>item.name==step.name):
      steps.value.findIndex((item)=>item.status=='active') +1;
  let before=steps.value.findIndex((item)=>item.status=='active');
  if(before!= -1) steps.value[before].status='pending';
  steps.value[now].status='active';
  list_questions.value=questions[step.route];
  handleClick(steps.value[now].route);
}
const checkStepNow=()=>{
  return (steps.value.findIndex((item)=>item.name == 'Results' && item.status=='active') != -1)? false: true;
}
const checkPageReports=()=>{
  // return
  return true
};
const handleClickHelp=()=>{
  showAlert.value=!showAlert.value
}
const handleCloseHelp=()=>{
  showAlert.value=false
}
watch([()=>router.currentRoute.value.name], ()=>{
  if(router.currentRoute.value.name=='Results'){
    handleClickStep(steps.value[4])
  }
}, {immediate:true})

</script>
<template>
  <div>
    <Header></Header>
    <Steps :steps="steps" @contentName="handleClickStep"></Steps>
    <router-view></router-view>
    <v-btn v-if="checkStepNow() && checkPageReports()" @click="handleClickStep" class="ma-2 text-none btn btn_weight" id="btn_next" base-color="var(--color-btn-dark-blue)" append-icon="mdi-arrow-right">Next Step</v-btn>
    <v-btn v-if="checkPageReports()" @click="handleClickHelp" class="ma-1" id="btn_help" color="#D76B42" icon="mdi-help"></v-btn>
    <AlertHelp :showAlert="showAlert" @close-alert="handleCloseHelp"></AlertHelp>
    <LegendForm  v-if="checkStepNow() && checkPageReports()" class="ma-2 text-none" :columns="list_questions"></LegendForm>
  </div>
</template>

<style scoped>
#btn_next{
  position: fixed;
  z-index: 1;
  padding-inline: 2.5%;
  bottom: 1%;
  right: 1%;
}
#btn_help{
  position: absolute;
  right: 1%;
  top: 110px;
}
</style>