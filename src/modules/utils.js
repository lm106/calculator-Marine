import {inputValues, values, outputValues, transformValues} from "@/variables/store.js";
import {clusters, questions} from "@/variables/clusters.js";

export function getKey(obj){
    return Object.keys(obj);
    // return (key.length>0)? true: false;
}

export function getCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(getCopy);
    }

    const clonedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = getCopy(obj[key]);
        }
    }

    return clonedObj;
}

/***************************Values***********************/
/**
 * Comprueba si el Step está
 * @param keyStep
 * @returns {boolean}
 */
export function checkQuestionsStep(keyStep){
    // console.log('check',keyStep)
    return (values.value[keyStep]!=undefined)? true: false;
}

/**
 * Comprueba si el cluster está
 * @param keyStep
 * @param keyCluster
 * @returns {boolean|boolean}
 */
export function checkCluster(keyStep, keyCluster){
    // console.log(values.value[keyStep])
    if(values.value[keyStep] == undefined){
        return false;
    }else {
        return (values.value[keyStep][keyCluster] != undefined)? true: false;
    }
    // return values.value[keyStep].findIndex((item)=> Object.keys(item)==keyCluster);
}

/**
 * Comprueba si el cluster y el step está
 * @param nameStep
 * @param nameCluster
 * @returns {boolean}
 */
export function checkValuesStep(nameStep, nameCluster){
    let tokenStep=checkQuestionsStep(nameStep);
    let tokenCluster=checkCluster(nameStep,nameCluster)
    // return ( !tokenStep && !tokenCluster)? false:true;
    if(!tokenStep){
        return false;
    }else if(tokenStep && !tokenCluster){
        return false;
    }else{
        return true;
    }
}

export function getValuesCluster(nameStep, nameCluster){
    // let indexStep= checkQuestionsStep(nameStep);
    let indexCluster= checkCluster(nameStep, nameCluster);
    return (indexCluster)? {[nameCluster]:values.value[nameStep][nameCluster]}: {};
}
export function getValueCluster(nameStep,nameCluster, blockTitle, activity, question){

    return values.value[nameStep][nameCluster][blockTitle][activity][question] || {};
}

/************************InputValues****************/
export function getValueOtherStep (nameStep, nameCluster, blockTitle, activity, question){
    // console.log('value---->',values.value)
    // let indexStep= checkQuestionsStep(nameStep);
    let indexCluster= checkCluster(nameStep, nameCluster);
    if (values.value[nameStep] &&
        values.value[nameStep][nameCluster] &&
        values.value[nameStep][nameCluster][blockTitle] &&
        values.value[nameStep][nameCluster][blockTitle][activity]) {
        // console.log('value_celd---->',values.value[indexStep][nameStep][indexCluster][nameCluster][blockTitle][activity][question]);
        return values.value[nameStep][nameCluster][blockTitle][activity][question];
    }
    return 0;
}

export function getValue (nameStep, nameCluster, blockTitle, activity, question){
    // console.log('value---->',inputValues.value)
    if (inputValues.value[nameStep] &&
        inputValues.value[nameStep][nameCluster] &&
        inputValues.value[nameStep][nameCluster][blockTitle] &&
        inputValues.value[nameStep][nameCluster][blockTitle][activity]) {

        return inputValues.value[nameStep][nameCluster][blockTitle][activity][question] || 0;
    }
    return 0;
}

/************************OutputValues****************/

export function getOutputValues(){
    outputValues.value={};
    // console.log(outputValues.value)
    // console.log('----------------------------------')
    Object.entries(values.value).forEach(([keyStep, clusterObject])=>{
    //     let key=Object.keys(step)[0]
    const output = convertToOutput(clusterObject);
    // console.log(output)
    outputValues.value={...getCopy(outputValues.value), ...{[keyStep]: output}};
    console.log(outputValues.value)
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

/******************TransformValues*******************/