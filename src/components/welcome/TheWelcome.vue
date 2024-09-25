<script setup>
import { ref } from 'vue';
import AlertWelcome from "@/components/welcome/AlertWelcome.vue";
const showRouterLink = ref(false);

const showModal = ref(false);
const show =()=>{
  showModal.value=true;
}
const hideModal = () => {
  showModal.value = false;
};
</script>
<template>
  <div class="welcome">
    <div class="img_welcome">
      <img alt="Vue logo" class="logo" src="../../assets/logoRemap.png" height="75"/>
    </div>
    <div class="content">
      <h2>Welcome</h2>
      <p id="description_content"> This module is prepared to develop an exploratory analysis of the data considered
        for the development of the MSP plans. After receiving the requested answers, it provides information on which
        data has been used, what data is missing, and which one should be applied in monitoring, assessment and in the
        next MSP cycle. <br>
        If you are interested in undertaking this auto-assessment for a specific MSP plan or for your available input
        data, we suggest that you follow the available tutorials <a><span style="text-decoration: underline;">here</span></a>.&nbsp;
      </p>
      <v-btn @click="show" class="text-none btn btn_padding btn_weight btn_start" base-color="var(--color-btn-dark-blue)" append-icon="mdi-arrow-right">Start</v-btn>
      <alert-welcome :showModal="showModal" @hide-modal="hideModal"/>
    </div>
  </div>
</template>
<style scoped>
.img_welcome{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.welcome{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
}
.welcome >*{
  width:50%;
  height: 100vh;
  margin: 0%;
  padding: 2.5%;
}
.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
}
#description_content{
  text-align: center;
  width: 80%;
}
</style>
