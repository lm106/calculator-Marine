import { values, currentCollection, inputValues } from '@/variables/store';
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
  }
}

export function getStoredCollections() {
  const collectionData = JSON.parse(localStorage.getItem('collectionData') || '{}');
  return Object.keys(collectionData);
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