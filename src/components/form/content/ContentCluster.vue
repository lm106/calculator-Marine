<script setup>
import { clusters, questions } from "@/variables/clusters.js";
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { useRoute } from "vue-router";
import Results from "@/components/form/content/Results.vue";
import { getCalculateFairReusable, getCalculateSDQFCompleteness, getValueRelevance } from "@/rules/rules.js";
import { checkStepValues, getValuesClusterValues } from "@/modules/ValuesValue.js";
import { inputValues } from "@/variables/store.js";

const props = defineProps({
  active: String
});

const route = useRoute();
const emit = defineEmits(['updateCluster']);

const activePanel = ref([]);
const tokenInit = ref(false);
const windowWidth = ref(window.innerWidth);

const isDevelopment = computed(() => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
});

const fillAllInputs = (value) => {
  if (!isDevelopment.value) return;
  
  Object.keys(inputValues.value[route.name][props.active]).forEach(blockTitle => {
    Object.keys(inputValues.value[route.name][props.active][blockTitle]).forEach(activity => {
      questions[route.name].forEach(column => {
        if (checkInput(questions[route.name].indexOf(column), route.name)) {
          inputValues.value[route.name][props.active][blockTitle][activity][column] = value;
        }
      });
    });
  });
};

const initForm = () => {
  inputValues.value[route.name] = {};
  if (questions[route.name] && !checkStepValues(route.name, props.active)) {
    inputValues.value[route.name][props.active] = {};
    clusters[props.active].forEach(block => {
      inputValues.value[route.name][props.active][block.title] = {};
      block.activities.forEach(activity => {
        inputValues.value[route.name][props.active][block.title][activity] = {};
        questions[route.name].forEach(column => {
          inputValues.value[route.name][props.active][block.title][activity][column] = 0; // Initial value
        });
      });
    });
  } else {
    inputValues.value[route.name] = getValuesClusterValues(route.name, props.active);
  }
};

const checkDisable = (index, column, activity, blockTitle) => {
  if (index > 0 && route.name === 'Relevance') {
    const firstColumnValue = inputValues.value[route.name][props.active][blockTitle][activity][questions[route.name][0]];
    if (firstColumnValue < 2) {
      inputValues.value[route.name][props.active][blockTitle][activity][questions[route.name][1]] = 0;
    }
    return firstColumnValue <= 1;
  } else if (route.name !== 'Relevance') {
    const valueFirstColumnRelevance = getValueRelevance(props.active, blockTitle, activity, questions['Relevance'][0]);
    if (valueFirstColumnRelevance) {
      questions[route.name].forEach(column => {
        inputValues.value[route.name][props.active][blockTitle][activity][column] = 0;
      });
    }
    return valueFirstColumnRelevance;
  }
  return false;
};

const getTitleBlock = () => clusters[props.active].map(item => item.title);

const all = () => {
  activePanel.value = getTitleBlock();
};

const none = () => {
  activePanel.value = [];
};

const checkInput = (indexColumn, step) => {
  if (step === 'Fair' && indexColumn === 3) return false;
  if (step === 'SDQF' && indexColumn === 0) return false;
  return true;
};

const calculateMean = () => {
  if (route.name !== 'Fair' && route.name !== 'SDQF') return;
  clusters[props.active].forEach(block => {
    block.activities.forEach(activity => {
      if (route.name === 'Fair') {
        const res = getCalculateFairReusable(props.active, block.title, activity);
        inputValues.value[route.name][props.active][block.title][activity][questions[route.name][3]] = res;
      } else if (route.name === 'SDQF') {
        const res = getCalculateSDQFCompleteness(props.active, block.title, activity);
        inputValues.value[route.name][props.active][block.title][activity][questions[route.name][0]] = res;
      }
    });
  });
};

const sendCluster = () => {
  emit('updateCluster', inputValues.value);
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

const getColumnSize = () => {
  return (route.name !== 'Relevance' && route.name !== 'SDQF') ? (windowWidth.value < 1440 ? '' : '2.5') : (windowWidth.value < 1440 ? '' : '2');
};

const getColumnsSizeLabel = () => {
  return (route.name !== 'Relevance' && route.name !== 'SDQF') ? (windowWidth.value < 1440 ? '' : '3') : (windowWidth.value < 1440 ? '' : '4');
};

watch([() => route.name, () => props.active], () => {
  if (tokenInit.value && Object.values(inputValues.value).length > 0) {
    sendCluster('updateCluster', inputValues.value);
  }
  if (route.name !== 'Results') {
    inputValues.value = {};
    initForm();
  }
  tokenInit.value = true;
}, { immediate: true });

watch(inputValues, calculateMean, { deep: true });
</script>

<template>
  <Results v-if="route.name === 'Results'"></Results>
  <div v-else>
    <div class="content_cluster">
      <v-row class="content_names" no-gutters>
        <v-col :cols="getColumnsSizeLabel()">
          <label class="pa-2 ma-2 label_name"></label>
        </v-col>
        <v-col v-for="(column, index) in questions[route.name]" class="names_activities" :cols="getColumnSize()" :key="index">
          <label class="pa-2 ma-2 label_name">{{ column }}</label>
          <v-icon color="grey" icon="mdi-information"></v-icon>
        </v-col>
      </v-row>
      <div class="content_ask">
        <template v-for="(block, index) in clusters[active]" :key="index">
          <v-row class="content_names" style="width: 100%" no-gutters v-for="(activity, index) in block.activities" :key="index">
            <v-col :cols="getColumnsSizeLabel()" class="names_activities names">
              <h4 v-if="index === 0" class="title title_descriptor">{{ block.title }} {{ (block.title.includes(activity)) ? '' : ' - ' }}</h4>
              <label class="pa-2 ma-2 label_name">{{ (block.title.includes(activity)) ? '' : activity }}</label>
              <v-icon color="grey" icon="mdi-information"></v-icon>
            </v-col>
            <v-col v-for="(column, indexColumn) in questions[route.name]" :cols="getColumnSize()" class="cell_input_number">
              <v-number-input v-if="checkInput(indexColumn, route.name)"
                :reverse="false" class="selected" controlVariant="default"
                :hideInput="false" inset :min="0" :max="3"
                v-model="inputValues[route.name][active][block.title][activity][column]"
                :disabled="checkDisable(indexColumn, column, activity, block.title)">
              </v-number-input>
              <v-number-input v-else
                :reverse="false" class="selected" controlVariant="default"
                :hideInput="false" inset hide-details
                v-model="inputValues[route.name][active][block.title][activity][column]"
                disabled>
              </v-number-input>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </template>
      </div>
      <div v-if="isDevelopment" class="fill-buttons">
        <v-btn
          v-for="n in 4"
          :key="n"
          fab
          small
          color="#dd6d45"
          class="ma-2"
          @click="fillAllInputs(n - 1)"
        >
          {{ n - 1 }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content_cluster {
  padding-left: 7.5%;
}
.names_activities {
  margin-top: 1.25%;
  text-align: end;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.names {
  justify-content: flex-end;
  padding: 0px 10px !important;
}
.label_name {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  max-width: 80%;
  width: fit-content;
  display: inline-block;
  padding: 0 !important;
}
.selected {
  border-radius: 10px;
  width: 150px;
}
.content_block_scroll, .content_ask {
  max-height: 275px;
  overflow-y: scroll;
}
.content_select {
  display: flex;
  flex-direction: column;
}
.title_descriptor {
  margin-bottom: 3.5%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.cell_input_number {
  padding-left: 3% !important;
  padding-top: 1% !important;
}
.fill-buttons {
  position: fixed;
  top: 60px;
  right: 20px;
  display: flex;
  flex-direction: row;
  z-index: 1000;
}
.fill-buttons .v-btn {
  background-color: #000; 
  color: #fff;
}
</style>
