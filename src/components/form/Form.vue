<script setup>
import { ref } from 'vue';
import Steps from "@/components/form/steps/Steps.vue";
import Header from "@/components/header/Header.vue";
import {useRouter} from "vue-router";

const cantidad = ref(0);
const textos = ref([]);
const router=useRouter();
const steps = ref([
  { number: 1, name: 'Relevance for MSP', route:'Relevance', status: 'active' },
  { number: 2, name: 'FAIR',  route:'Fair', status: 'pending' },
  { number: 3, name: 'Resolution and temporal coverage', route:'Resolution and temporal coverage', status: 'pending' },
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
const content=(stepNow)=>{
  let before=steps.value.findIndex((item)=>item.status=='active');
  if(before!= -1) steps.value[before].status='pending';
  let now=steps.value.findIndex((item)=>item.name==stepNow.name);
  steps.value[now].status='active';
  router.push({name:steps.value[now].route})
}
const handleClickNextStep=()=>{
  let now=  steps.value.findIndex((item)=>item.status=='active') +1;
  content(steps.value[now]);
}
</script>
<template>
  <div>
    <Header></Header>
    <Steps :steps="steps" @contentName="content"></Steps>
    <router-view></router-view>
    <button @click="handleClickNextStep">Next Step</button>
  </div>
</template>

<style scoped>

</style>