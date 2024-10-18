<script setup>
import { useRouter } from 'vue-router'
import router from "@/router/index.js";

const props = defineProps({
  step: Object,
  isActive: Boolean
});
const router=useRouter();
const clickStep=(name)=>{
  const currentQuery = router.currentRoute.value.query;
  router.push({name:name, query: currentQuery})
}
</script>

<template>
<!--  <RouterLink :to="step.name" class="step-link">-->
    <li :class="{ 'active': isActive }" @click="clickStep(step.name)">
      {{step.name}}
    </li>
<!--    </RouterLink>-->
</template>

<style scoped>
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

