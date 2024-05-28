<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
  showModal: Boolean
});

const cantidad = ref(1);
const router = useRouter();
const textos = ref([]);

const items = ref(['']);

const updateInputs = () => {
  const itemsCount = items.value.length;
  const newItemsCount = cantidad.value;

  if (newItemsCount > itemsCount) {
    // Agregar nuevos elementos al array items
    for (let i = itemsCount; i < newItemsCount; i++) {
      items.value.push('');
    }
  } else if (newItemsCount < itemsCount) {
    // Eliminar elementos del array items
    items.value.splice(newItemsCount);
  }
};

const navigateToNewPage = () => {
  router.push({name:'Relevance'});
};

watch(() => props.showModal, (newValue) => {
  if (!newValue) {
    cantidad.value = 1;
  }
});

</script>

<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <v-btn @click="$emit('hide-modal')" class="close"  density="comfortable" icon="$close" variant="plain"></v-btn>
    <div class="content_alert">
        <div>
          <h2 id="title_alert_welcome">What collection do you want to use?</h2>
          <label for="cantidad"></label>
          <v-number-input id="cantidad" v-model="cantidad" label="Nº Colection:" :min="1" :max="4" @input="updateInputs"></v-number-input>
          <!-- Mostrar inputs de texto dinámicos -->
          <div v-for="index in cantidad" :key="index">
            <v-text-field  v-model="textos[index - 1]" :label="'Name colection ' + index"></v-text-field>
          </div>
        </div>
      <v-btn @click="navigateToNewPage" id="btn_alert_start" class="text-none btn btn_padding btn_weight btn_start" base-color="#D76B42" append-icon="mdi-arrow-right">Start</v-btn>
    </div>

  </div>
  </div>
</template>

<style scoped>
.modal {
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
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: end;
  border-radius: 10px;
  border: 1px solid transparent;
}
#title_alert_welcome{
  margin: 2.5% auto;
  width: 50%;
  text-align: center;
}
.content_alert{
  margin: 5% auto;
  width: 75%;
}
#btn_alert_start{
  margin: 5% 30% auto;
  width: 40%;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>