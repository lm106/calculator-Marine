<script setup>

import { useRouter } from "vue-router";

const router = useRouter();
const generateReport =()=>{
  router.push({name:'Reports'});
}

</script>

<template>
  <div class="content_results">
    <v-card class="mx-auto card" max-width="400">
      <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
        <v-card-title>Reports</v-card-title>
      </v-img>
      <v-card-text>
        <div>lorsnsjfnjsdnfs</div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="generateReport" class="text-none btn btn_start" base-color="#023139">Reports</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto card" max-width="400">
      <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
        <v-card-title>Download</v-card-title>
      </v-img>
      <v-card-text>
        <div>lorsnsjfnjsdnfs</div>
      </v-card-text>
      <v-card-actions>
        <v-btn>Download</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.content_results{
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.card{
  border: 1px solid gray;
  border-radius: 5px ;
  height: 300px;
  width: 25%;
  margin-left: 2.5% !important;
  margin-right: 2.5% !important;
}
#btn_report{
  background-color: var(--color-btn-dark-blue);
}

</style>