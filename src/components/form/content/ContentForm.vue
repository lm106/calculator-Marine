<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Results from "@/components/form/content/Results.vue";
const route = useRoute();

const clusters= ref([
    'MSFD GES','WFD GES',
    'Conservation & designeted sites',
    'Oceanographic characteristics and climate',
    'Coastal Land use & Planning',
    'Operative maritime activities and Planning',
    'Socio-economic information',
    'Governance information'
  ]);

</script>

<template>
  <main>
    <Results v-if="$route.name =='Results'"></Results>
    <div v-else>
      <v-card class="nav_cluster">
        <v-tabs center-active active-class="tab_active">
          <v-tab v-for="(cluster, index) in clusters" class="tab"  :key="index" color="white" >{{ cluster }}</v-tab>
        </v-tabs>
      </v-card>
    </div>
  </main>

</template>

<style scoped>
.nav_cluster{
  margin-top: 1.5%;
}
.tab[aria-selected="true"] {
  background-color: #023139;
}
.tab {
  text-transform: initial !important;
  background: #ddd;
  border-radius: 10px 10px 0px 0px !important;
}
</style>