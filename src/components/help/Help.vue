<script setup>
import {useRoute} from "vue-router";
import {cluster_helps} from "../../variables/helps.js";

const route= useRoute();
</script>

<template>
  <div class="content_help_report">
    <template v-for="([name, value]) in Object.entries(cluster_helps)">
      <h4>{{name}}</h4>
      <p v-html="value"></p>
      <br>
      <strong>--------------------</strong><br>
    </template>
  </div>
</template>

<style scoped>
.content_help_report{
    height: 89vh;
    overflow-y: scroll;
    width: 95%;
    margin: 1% 0% 0% 2%;
}
</style>