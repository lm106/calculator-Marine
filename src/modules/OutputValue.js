import {outputValues, values} from "@/variables/store.js";
import {getCopy} from "@/modules/utils.js";

export function getOutputValues(){
    outputValues.value={};
    // console.log(outputValues.value)
    // console.log('----------------------------------')
    Object.entries(values.value).forEach(([keyStep, clusterObject])=>{
        //     let key=Object.keys(step)[0]
        const output = convertToOutput(clusterObject);
        // console.log(output)
        outputValues.value={...getCopy(outputValues.value), ...{[keyStep]: output}};
        // console.log(outputValues.value)
    })
    // console.log(values.value)
}

function convertToOutput(item) {
    // console.log(item)
    let obj= {...item};
    const hasOnlyPrimitives = Object.values(obj).every(value => typeof value !== 'object' || value === null);

    if (hasOnlyPrimitives) {
        // Si el objeto tiene solo propiedades primitivas, lo convertimos en un array
        return Object.values(obj);
    } else {
        // Si no, convertimos recursivamente los hijos más profundos en arrays de valores primitivos
        const newObj = {};
        for (let key in obj) {
            newObj[key] = convertToOutput(obj[key]);
        }
        return newObj;
    }
}
