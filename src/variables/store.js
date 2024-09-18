import {ref} from "vue";

export const values=ref({});
export const inputValues=ref([]);
export const outputValues=ref({});
export const transformValues=ref({});
export const countRow = ref({});
export const scoreGlobal=ref({});
export const listValues=ref({});

export function saveValuesToLocalStorage() {
    localStorage.setItem('formValues', JSON.stringify(values.value));
  }
  
  export function loadValuesFromLocalStorage() {
    const storedValues = localStorage.getItem('formValues');
    if (storedValues) {
      values.value = JSON.parse(storedValues);
    }
  }
  export function loadValuesFromLocalStorage() {
    const storedValues = localStorage.getItem('formValues');
    if (storedValues) {
      values.value = JSON.parse(storedValues);
    }
  }
  
  export function hasStoredValues() {
    return !!localStorage.getItem('formValues');
  }