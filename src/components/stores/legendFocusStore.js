import {defineStore} from "pinia";

export const useInputFocusLegend=defineStore( 'legend',{
    state:()=>({
        focusedInput:'',
        inputValue:null,
    }),
    actions:{
        setFocusedInput(inputName){
            this.focusedInput=inputName;
        },
        clearFocusedInput() {
            this.focusedInput = '';
        },
        setInputValue(value){
            this.inputValue=value;
        },
        clearInputValue() {
            this.inputValue=null;
        },
    },
});