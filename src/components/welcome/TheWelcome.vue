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
  <div class="welcome">
    <div class="img_welcome">
      <img alt="Vue logo" class="logo" src="../../assets/logo.svg" width="125" height="125" />
    </div>
    <div class="content">
      <p id="description_content">Lorem ipsum dolor sit amet consectetur. Adipiscing aliquam lorem nunc dignissim.
         Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante non viverra turpis.
         Non feugiat duis pharetra.Lorem ipsum dolor sit amet consectetur. Adipiscing aliquam lorem nunc
         dignissim. Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante non viverra
         turpis. Non feugiat duis pharetra.Lorem ipsum dolor sit amet consectetur. Adipiscing aliquam
         lorem nunc dignissim. Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante
         non viverra turpis. Non feugiat duis pharetra.Lorem ipsum dolor sit amet consectetur. Adipiscing
         aliquam lorem nunc dignissim. Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante
         non viverra turpis. Non feugiat duis pharetra.Lorem ipsum dolor sit amet consectetur. Adipiscing
         aliquam lorem nunc dignissim. Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante
         non viverra turpis. Non feugiat duis pharetra.Lorem ipsum dolor sit amet consectetur. Adipiscing
         aliquam lorem nunc dignissim. Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante
         non viverra turpis. Non feugiat duis pharetra.Non feugiat duis pharetra.Lorem ipsum dolor sit
         amet consectetur. Adipiscing aliquam lorem nunc dignissim. Vivamus odio rhoncus id morbi at
         euismod elit nisi. Venenatis ante non viverra turpis. Non feugiat duis pharetra.Non feugiat
         duis pharetra.Lorem ipsum dolor sit amet consectetur. Adipiscing aliquam lorem nunc dignissim.
         Vivamus odio rhoncus id morbi at euismod elit nisi. Venenatis ante non viverra turpis.
         Non feugiat duis pharetra.</p>
      <v-btn class="text-none"  id="btn_start" @click="show">Start<v-icon icon="mdi-arrow-right" end></v-icon></v-btn>
      <alert-welcome :showModal="showModal" @hide-modal="hideModal"/>
    </div>
  </div>
</template>
<style scoped>
.img_welcome{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.welcome{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
}
.welcome >*{
  width:50%;
  height: 100vh;
  margin: 0%;
  padding: 2.5%;
}
.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
}
#description_content{
  text-align: center;
  width: 80%;
}
#btn_start{
  width: 25%;
  padding: 1% 5%;
  border-radius: 60px;
  color: white;
  background-color: #023139;
  border: transparent;
  font-weight: 600 !important;
  /* display: flex; */
  align-items: flex-end;
  /* flex-direction: row; */
}
</style>
