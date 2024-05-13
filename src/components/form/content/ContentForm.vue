<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Results from "@/components/form/content/Results.vue";
import ContentCluster from "@/components/form/content/ContentCluster.vue";
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
const active_cluster=ref(clusters.value[0]);
const handleClickCluster=(i)=>{
  active_cluster.value=clusters.value[i];
}
</script>

<template>
    <Results v-if="$route.name =='Results'"></Results>
    <div v-else>
      <v-card class="nav_cluster">
        <v-tabs center-active active-class="tab_active">
          <v-tab @click="handleClickCluster(index)" v-for="(cluster, index) in clusters" class="tab"  :key="index" color="white" >{{ cluster }}</v-tab>
        </v-tabs>
      </v-card>
      <ContentCluster :active="active_cluster"></ContentCluster>
    </div>
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
  margin: 0.5px;
}
</style>