import {inputValues, values} from "@/components/form/content/store.js";


export function checkQuestionsStep(key){
    return values.value.findIndex((item)=> Object.keys(item)==key);
}
export function checkCluster(indexStep, nameStep, key){
    return values.value[indexStep][nameStep].findIndex((item)=> Object.keys(item)==key);
}
export function checkValuesStep(nameStep, nameCluster){
    let indexStep=checkQuestionsStep(nameStep);
    return ( indexStep!= -1 && checkCluster(indexStep, nameStep,nameCluster) != -1)? true: false;
}
export function getValuesCluster(nameStep, nameCluster){
    let indexStep= checkQuestionsStep(nameStep);
    let indexCluster= checkCluster(indexStep, nameStep, nameCluster);
    return values.value[indexStep][nameStep][indexCluster] || {};
}
export function getValueCluster(nameStep,nameCluster, blockTitle, activity, question){
    return values.value[indexStep][nameStep][indexCluster][nameCluster][blockTitle][activity][question] || {};
}

/************************InputValues****************/
export function getValueOtherStep (nameStep, nameCluster, blockTitle, activity, question){
    // console.log('value---->',values.value)
    let indexStep= checkQuestionsStep(nameStep);
    let indexCluster= checkCluster(indexStep, nameStep, nameCluster);
    if (values.value[indexStep][nameStep] &&
        values.value[indexStep][nameStep][indexCluster] &&
        values.value[indexStep][nameStep][indexCluster][nameCluster] &&
        values.value[indexStep][nameStep][indexCluster][nameCluster][blockTitle] &&
        values.value[indexStep][nameStep][indexCluster][nameCluster][blockTitle][activity]) {
        // console.log('value_celd---->',values.value[indexStep][nameStep][indexCluster][nameCluster][blockTitle][activity][question]);
        return values.value[indexStep][nameStep][indexCluster][nameCluster][blockTitle][activity][question];
    }
    return 0;
}

export function getValue (nameStep, nameCluster, blockTitle, activity, question){
    // console.log('value---->',inputValues.value)
    if (inputValues.value[nameStep] &&
        inputValues.value[nameStep][0] &&
        inputValues.value[nameStep][0][nameCluster] &&
        inputValues.value[nameStep][0][nameCluster][blockTitle] &&
        inputValues.value[nameStep][0][nameCluster][blockTitle][activity]) {

        return inputValues.value[nameStep][0][nameCluster][blockTitle][activity][question] || 0;
    }
    return 0;
}