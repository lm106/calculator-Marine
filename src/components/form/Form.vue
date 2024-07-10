<script setup>
import {computed, ref, watch} from 'vue';
import Steps from "@/components/form/steps/Steps.vue";
import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";
import AlertHelp from "@/components/help/AlertHelp.vue";

const cantidad = ref(0);
const showAlert =ref(false);
const textos = ref([]);
const router=useRouter();
const steps = ref([
  { number: 1, name: 'Relevance for MSP', route:'Relevance', status: 'active' },
  { number: 2, name: 'FAIR',  route:'Fair', status: 'pending' },
  { number: 3, name: 'Spatial and temporal coverage & resolution', route:'Resolution and temporal', status: 'pending' },
  { number: 4, name: 'SDQF',  route:'SDQF',status: 'pending' },
  { number: 5, name: 'Results', route:'Results', status: 'pending' }
]);
const updateInputs = () => {
  // Reiniciar el array de textos y agregar los nuevos
  textos.value = [];
  for (let i = 0; i < cantidad.value; i++) {
    textos.value.push('');
  }
};
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
    <v-btn v-if="checkPageReports()" @click="handleClickHelp" class="ma-2" id="btn_help" color="#D76B42" icon="mdi-help"></v-btn>
    <AlertHelp :showAlert="showAlert" @close-alert="handleCloseHelp"></AlertHelp>
  </div>
</template>

<style scoped>
#btn_next{
  padding-inline: 2.5%;
  right: 1%;
}
#btn_help{
  left: 1%;
}
#btn_help, #btn_next {
  position: fixed;
  bottom: 1%;
  z-index: 1;
}
</style>