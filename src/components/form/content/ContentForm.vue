<script setup>
import { useRoute } from 'vue-router';
import Results from "@/components/form/content/Results.vue";
const route = useRoute();

</script>

<template>
  <main>
    <Results v-if="$route.name =='Results'"></Results>
    <div v-else>{{ $route.name }}</div>
  </main>

</template>

<style scoped>

</style>