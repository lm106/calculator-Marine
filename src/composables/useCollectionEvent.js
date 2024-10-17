import { ref } from 'vue'

const collectionCreated = ref(null)

export function useCollectionEvent() {
  const emitCollectionCreated = (collectionName) => {
    collectionCreated.value = collectionName
  }

  const resetCollectionCreated = () => {
    collectionCreated.value = null
  }

  return {
    collectionCreated,
    emitCollectionCreated,
    resetCollectionCreated
  }
}