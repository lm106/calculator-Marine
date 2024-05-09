<script setup>
import { ref } from 'vue';
// import Step from '@/components/form/steps/step/Step.vue';
import router from "@/router/index.js";
const emit = defineEmits({
    click:null
});

const props = defineProps({
  steps: Array
});


const currentStep = ref(0);
const handleClickStep= (step)=>{
  emit('contentName', step);
}
</script>
<template>
  <div class="Steps">
    <div class="container">
      <ul class="progressbar">
<!--        <Step v-for="(step, index) in steps" :key="index" -->
<!--              :step="step" -->
<!--              :isActive="currentStep === index" />-->
        <li v-for="(step, index) in steps" :key="index"
            :class="{ 'active': step.status=='active' }"
            @click="handleClickStep(step)">
          {{step.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.Steps {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.container {
  width: 40%;
  margin-top: 2%;
}

.progressbar{
  counter-reset: step;
  display: flex;
}
.progressbar li {
  list-style-type: none;
  flex: 1;
  position: relative;
  text-align: center;
  font-weight: 600;
  color: #ddd;
  cursor: pointer;
}

.progressbar  li:before {
  content: counter(step);
  counter-increment: step;
  height: 30px;
  width: 30px;
  border: 2px solid #ddd;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  background-color: white;
}

.progressbar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;

}

.progressbar  li:first-child:after {
  content: none;
}

.progressbar  li.active {
  color: #27ae60;
}

.progressbar  li.active:before {
  background-color: #27ae60;
  color: white;
  border: 2px solid #27ae60;
}

</style>
