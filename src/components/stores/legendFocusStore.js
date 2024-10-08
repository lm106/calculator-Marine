import {defineStore} from "pinia";

export const useInputFocusLegend=defineStore( 'legend',{
    state:()=>({
        focusedInput:'',
    }),
    actions:{
        setFocusedInput(inputName){
            this.focusedInput=inputName;
        },
        clearFocusedInput() {
            this.focusedInput = ''; // Limpia el estado cuando no hay foco
        },
    },
});