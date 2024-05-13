<script setup>
import {clusters} from "@/components/form/content/clusters.js";
import { ref } from 'vue'
const props=defineProps({
  active:String
})

</script>

<template>
  <p>{{ active }}</p>
  {{ clusters[active] }}
</template>

<style scoped>

</style>