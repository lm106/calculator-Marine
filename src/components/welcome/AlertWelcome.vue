<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
const props = defineProps({
  showModal:Boolean
});
const cantidad = ref(1);
const router=useRouter();
const textos = ref([]);

const updateInputs = () => {
  // Reiniciar el array de textos y agregar los nuevos
  textos.value = [];
  for (let i = 0; i < cantidad.value; i++) {
    textos.value.push('');
  }
};
const navigateToNewPage = () => {
  router.push('/form');
};

// Vigilar cambios en showModal y actualizar la cantidad de inputs
watch(() => props.showModal, (newValue) => {
  if (!newValue) {
    cantidad.value = 1; // Reiniciar cantidad cuando showModal es falso
  }
});
</script>

<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
    <span class="close" @click="$emit('hide-modal')">&times;</span>
    <!--        <button @click="hideModal">&times;</button>-->
      <div>
        <label for="cantidad">Nº Dataset:</label>
        <input type="number" id="cantidad" v-model="cantidad" @input="updateInputs">

        <!-- Mostrar inputs de texto dinámicos -->
        <div v-for="index in cantidad" :key="index">
          <label for="name">Name dataset</label>
          <input type="text" :placeholder="'Texto ' + index" v-model="textos[index - 1]">
        </div>
      </div>
    <button @click="navigateToNewPage">Form</button>
  </div>
  </div>
</template>

<style scoped>
.modal {
  //display: none; /* Oculta el modal inicialmente */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* Fondo oscuro */
  overflow: auto;
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* Centra el modal verticalmente */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Ancho del modal */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>