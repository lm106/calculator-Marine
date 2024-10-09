<script setup>
import {ref, watch} from 'vue';
import {useRoute} from "vue-router";
import {useInputFocusLegend} from "@/components/stores/legendFocusStore.js";
import {btn_info_ask} from "@/variables/helps.js";

const props=defineProps({
  columns:Array
})
const isVisible = ref(false);
let isDragging = ref(false);
let offsetX = ref(0);
let offsetY = ref(0);
const type= ref();
const legend=useInputFocusLegend();

const route=useRoute();

const getColumns=()=>{
  if(route.name=='Fair'){
    return props.columns.filter((item)=> item != 'Data is Reusable');
  }else if(route.name=='SDQF'){
    return props.columns.filter((item)=> item != 'Completeness and timeliness');
  }else {
    return props.columns;
  }
}
watch(() => props.columns, () => {
  type.value = undefined;
});



// Función que inicia el arrastre
const startDrag = (event) => {
  const draggable = event.currentTarget;

  const rect = draggable.getBoundingClientRect();
  offsetX.value = event.clientX - rect.left;
  offsetY.value = event.clientY - rect.top;

  isDragging.value = true;

  document.onmousemove = dragElement;
  document.onmouseup = stopDrag;
};

// Función que mueve el elemento
const dragElement = (event) => {
  if (isDragging.value) {
    const draggable = document.querySelector('.draggable');

    draggable.style.left = `${event.clientX - offsetX.value}px`;
    draggable.style.top = `${event.clientY - offsetY.value}px`;
  }
};

// Función que detiene el arrastre
const stopDrag = () => {
  isDragging.value = false;
  document.onmousemove = null;
  document.onmouseup = null;
};
</script>
<template>
  <v-btn class="btn_legend" @click="isVisible = true">Legend</v-btn>

  <div class="overlay" v-if="isVisible">
    <div
        class="draggable"
        ref="draggable"
        @mousedown="startDrag"
        @mouseup="stopDrag"
    >
      <div class="header">
        <span>Legend</span>
        <v-btn class="icon_btn_close" @click="isVisible = false" icon="$close"></v-btn>
      </div>
      <div class="content_alert_text">
        <h4 v-if="legend.focusedInput">{{ legend.focusedInput }}</h4>

        <v-divider  v-if="legend.focusedInput"></v-divider>
        <p v-else>On focus any input</p>
        <h5 v-for="(score, index) in btn_info_ask[legend.focusedInput]">
          <span :class="(legend.inputValue==(btn_info_ask[legend.focusedInput].length - 1 - index))? 'type_score_weight type_score':'type_score'"> {{ score }}</span><br>
        </h5>
      </div>
    </div>
  </div>
</template>
<style scoped>
.alert_legend{
  width: 15%;
  height: 300px;
  position: fixed;
  bottom: 1%;
  left: 2px;
  z-index: 5;
  padding: 7.5px !important;
}
.title_legend{
  margin-left: 5%;
  font-size: 16px ;
}
.btn_legend{
  position: absolute;
  top: 10%;
  left: 2.5%;
  background-color: var(--color-orange);
  color: white;
  text-transform: initial;
  font-weight: 500;
}
.icon_btn_close{
  background-color: transparent !important;
  border-radius: none !important;
  box-shadow: none !important;
  color: white !important;
  height: 30px;
  width: 30px ;
}
.content_alert_text{
  max-height: 450px;
  min-height: 100px;
  overflow-y: auto;
  padding: 0% 1.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: nowrap;
}
.type_score{
  font-weight: normal;
}
.type_score_weight{
  font-weight: bolder;
}
.draggable {
  position: absolute;
  width: 300px;
  top: 50%; /* Posición inicial */
  left: 10px; /* Posición inicial */
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Asegura que esté sobre otros elementos */
  border-radius: 10px;
}

.header {
  background-color:var(--color-btn-dark-blue);
  padding: 10px;
  color: white;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.content {
  padding: 20px;
}

button {
  margin-top: 10px;
}
</style>
