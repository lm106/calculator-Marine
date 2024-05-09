<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import AlertWelcome from "@/components/welcome/AlertWelcome.vue";

const showRouterLink = ref(false);

// const showAlert = () => {
//   // alert('Este es un mensaje de alerta');
//   showRouterLink.value = true; // Muestra el botón con router-link dentro del alert
// };

// const hideAlert = () => {
//   showRouterLink.value = false; // Oculta el botón con router-link
// };

const showModal = ref(false);
const show =()=>{
  showModal.value=true;
}
const hideModal = () => {
  showModal.value = false;
};
const navigateToNewPage = () => {
  // Utiliza router.push para navegar a una nueva página
  router.push('/form');

  // O utiliza router.replace para reemplazar la página actual en el historial de navegación
  // router.replace('/nueva-pagina');
};
</script>
<template>
  (<header>
    <img alt="Vue logo" class="logo" src="../../assets/logo.svg" width="125" height="125" />
  </header>)
 <div>
   <button @click="show">Start</button>
    <alert-welcome :showModal="showModal" @hide-modal="hideModal"/>
  </div>
</template>
<style scoped>
/* Estilos para el modal */


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
