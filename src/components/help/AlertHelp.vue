<script setup>
import {ref} from "vue";
import {cluster_helps, legend} from "../../variables/helps.js";

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
      <v-expansion-panels multiple>
        <v-expansion-panel  v-for="([name, value]) in Object.entries(cluster_helps)"
                            class="panel_block" style="border-top-left-radius: 10px !important; border-top-right-radius: 10px !important;
          border-bottom-left-radius: 10px !important; border-bottom-right-radius: 10px !important;"
        >
          <template #title>
            <div class="title_block">
              <h3 class="title">{{ name }}</h3>
              <v-divider></v-divider>
            </div>
          </template>
          <v-expansion-panel-text>
            <p v-html="value"></p>
            <br>
            <p v-if="name.includes('7 DATA CLUSTER')" v-html="legend"></p>

          </v-expansion-panel-text>
          <v-spacer></v-spacer>
        </v-expansion-panel>
      </v-expansion-panels>
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