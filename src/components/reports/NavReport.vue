<script setup>
import { ref } from 'vue';
import {useRoute, useRouter} from "vue-router";
import DownloadAlert from "@/components/reports/DownloadAlert.vue";
import ShareAlert from "@/components/reports/ShareAlert.vue";
import DeleteAlert from "@/components/reports/DeleteAlert.vue";

const list_items=[
  {title:'Report'},
  {icon: 'mdi-shape', title:'By Category', value:'Category'},
  {icon: 'mdi-chart-box-outline', title:'By Cluster', value:'Cluster'},
  {icon: 'mdi-tune', title:'By List Collections', value:'Collections'},
  {title:'Tools'},
  {icon: 'mdi-home-variant', title:'Welcome', value:'Welcome'},
  {icon: 'mdi-view-dashboard', title:'Dashboard', value:'Results'},
  {icon: 'mdi-share-variant', title:'Share', value:'share'},
  {icon: 'mdi-download', title:'Download', value:'download'},
  {icon: 'mdi-file-plus-outline', title:'New form', value:'new_form'},
  {icon: 'mdi-delete-outline', title:'Delete', value:'delete'},
  {icon: 'mdi-tune-variant', title:'Edit Form', value:'edit_form'},

  {icon: 'mdi-help-circle-outline', title:'Help', value:'Help'}
];
const emit=defineEmits(['updateActiveSection']);
const route= useRoute();
const router= useRouter();
const drawer = ref(true);
const dialog = ref(false);
const share = ref(false);
const deleteReport = ref(false);
const rail = ref(false);
const activeItem = ref((route.name=='Help')? 'Help': 'Category');


const handleItemClick = (value) => {
  activeItem.value = value;
  switch (value) {
    case 'Category':
    case 'Cluster':
    case 'Collections':
    case 'Welcome':
    case 'Help':
    case 'Results':
      emit('updateActiveSection', value);
      break;
    case 'download':
      dialog.value=!dialog.value
      break;
    case 'share':
      share.value=!share.value
      break;
    case 'edit_form':
      const currentQuery = router.currentRoute.value.query;
      router.push({name:'Relevance', query: currentQuery});
      break;
    case 'delete':
      deleteReport.value=!deleteReport.value;
      break;
  }
};

</script>

<template>
  <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        @click="rail = !rail"
        class="navbar"
    >
      <v-list-item title="Menu" nav >
        <template v-slot:append>
          <v-btn
              :icon="(!rail)?'mdi-chevron-left': 'mdi-chevron-right'"
              variant="text"
              @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <template v-for="item in list_items.slice(0,-1)">
        <v-list-item
            v-if="item.title !='Tools' && item.title !='Report'"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.value"
            :key="item.value"
            @click="handleItemClick(item.value)"
            :active="activeItem==item.value"
        ></v-list-item>
        <v-list-item v-else>
          <v-list-item-title v-if="!rail">{{ item.title}}</v-list-item-title>
        </v-list-item>
        </template>
      </v-list>

      <v-list class="list_help" density="compact" nav>
      <v-divider></v-divider>
        <v-list-item
            :prepend-icon="list_items[list_items.length-1].icon"
            :title="list_items[list_items.length-1].title"
            :value="list_items[list_items.length-1].value"
            @click="handleItemClick(list_items[list_items.length-1].value)"
            :active="activeItem==list_items[list_items.length-1].value"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  <DownloadAlert v-if="dialog" @close="handleItemClick('download')"></DownloadAlert>
  <ShareAlert v-if="share" @close="handleItemClick('share')"></ShareAlert>
  <DeleteAlert v-if="deleteReport" @close="handleItemClick('delete')"></DeleteAlert>
</template>

<style scoped>
.navbar{
  position: inherit !important;
  height: calc(100%- var(--header-heigth));
  display: flex;
  flex-direction: column;
  transform: translateX(0px) !important;
}
.navbar * {
  font-weight: 600 !important;
}
.list_help {
  margin-top: auto;
  bottom: 0;
  width: 100%;
  align-self: end;
}
</style>