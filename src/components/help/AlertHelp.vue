<script setup>
import {ref} from "vue";
import {cluster_helps} from "../../variables/helps.js";

const props = defineProps({
  showAlert: Boolean
});
</script>

<template>
  <v-overlay :model-value="showAlert" class="flex-md-row justify-center">
  <v-alert v-if="showAlert" color="white" class="alert_help" closable
      @click:close="$emit('close-alert')">
    <template #title>
      <div class="title_alert">
        <div>Help</div>
        <v-divider></v-divider>
      </div>
    </template>
    <div class="content_alert overflow-y-auto">
      <template v-for="([name, value]) in Object.entries(cluster_helps)">
        <h4>{{name}}</h4>
          <p v-html="value"></p>
        <br>
        <strong>--------------------</strong><br>
      </template>
      <br></br>
    </div>
  </v-alert>
  </v-overlay>
</template>

<style scoped>
.alert_help{
  border-radius: 10px;
  border: 1px solid #ddd;
  margin: 5% auto;
  max-width: 65% !important;
  height: 70vh !important;
  display: block !important;
}
.title_alert{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1.5% 0% 1% 0%;

}
.content_alert{
  height: 59vh;
  overflow-y: scroll;
}
</style>