<script setup>
import NavReport from "@/components/reports/NavReport.vue";
import Header from "@/components/header/Header.vue";
import { useRouter } from "vue-router";


const router= useRouter();
const handleActiveSection = (value) => {
  console.log('Item clicked:', value);
  router.push({name:value});
};
</script>

<template>
  <Header></Header>
  <v-layout class="nav_block">
    <NavReport @updateActiveSection="handleActiveSection"></NavReport>
    <router-view></router-view>
  </v-layout>
</template>

<style scoped>
.nav_block{
  flex: 1;
}
</style>