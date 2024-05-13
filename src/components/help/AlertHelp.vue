<script setup>
import {ref} from "vue";

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
      Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus,
      mauris ipsum aliquam liosuere imperdiet, leo.Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus,
      mauris ipsum aliquam liosuere imperdiet, leo.Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus,
      maurmus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus,
      mauris ipsum aliquam liosuere imperdiet, leo.
      <br></br>
      wnkfnsk
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
  display: flex !important;
}
.title_alert{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1.5% 0% 1% 0%;

}
.content_alert{
  min-width: 100%;
  height: 90%;
}
</style>