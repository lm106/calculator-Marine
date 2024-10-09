import { values, currentCollection, inputValues } from '@/variables/store';
import { getAll } from '@/services/firestoreService';
export function saveValuesToLocalStorage() {
  const collectionData = JSON.parse(localStorage.getItem('collectionData') || '{}');
  if (currentCollection.value) {
    collectionData[currentCollection.value] = values.value;
  } else {
    const currentCollectionName = localStorage.getItem('currentCollection');
    if (currentCollectionName) {
      collectionData[currentCollectionName] = values.value;
    }
  }
  localStorage.setItem('collectionData', JSON.stringify(collectionData));
}

export function loadValuesFromLocalStorage(collectionName) {
  const collectionData = JSON.parse(localStorage.getItem('collectionData') || '{}');
  if (collectionData[collectionName]) {
    values.value = collectionData[collectionName];
    inputValues.value = collectionData[collectionName];
    currentCollection.value = collectionName;
    localStorage.setItem('currentCollection', collectionName);
  }
}

export async function getStoredCollections(user) {
  const allCollections = await getAll('collections', user.value.uid);
  return allCollections.map(collection => ({
    [collection.name]: { ...collection.data }
  }));
}

export function hasStoredValues() {
  return getStoredCollections().length > 0;
}

export function shouldAutoLoadCollection() {
  const collections = getStoredCollections();
  return collections.length === 1 && (collections[0] === currentCollection.value || collections[0] === localStorage.getItem('currentCollection'));
}

export function autoLoadCollection() {
  const collections = getStoredCollections();
  if (collections.length === 1) {
    loadValuesFromLocalStorage(collections[0]);
    return true;
  }
  return false;
}

export function deleteCollection(collectionName) {
  const collectionData = JSON.parse(localStorage.getItem('collectionData') || '{}');
  if (collectionData[collectionName]) {
    delete collectionData[collectionName];
    localStorage.setItem('collectionData', JSON.stringify(collectionData));
    localStorage.setItem('collections', JSON.stringify(JSON.parse(localStorage.getItem('collections')).filter(collection => collection !== collectionName)))
  }
}