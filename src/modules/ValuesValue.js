import {values} from "@/variables/store.js";

export function getValueQuestionValues(nameStep,nameCluster, blockTitle, activity, question){

    return values.value[nameStep][nameCluster][blockTitle][activity][question] || {};
}
export function getValuesClusterValues(nameStep, nameCluster){
    // let indexStep= checkQuestionsStepValues(nameStep);
    let indexCluster= checkClusterValues(nameStep, nameCluster);
    return (indexCluster)? {[nameCluster]:values.value[nameStep][nameCluster]}: {};
}

/**
 * Comprueba si el Step está
 * @param keyStep
 * @returns {boolean}
 */
export function checkQuestionsStepValues(keyStep){
    // console.log('check',keyStep)
    return (values.value[keyStep]!=undefined)? true: false;
}

/**
 * Comprueba si el cluster está
 * @param keyStep
 * @param keyCluster
 * @returns {boolean|boolean}
 */
export function checkClusterValues(keyStep, keyCluster){
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
export function checkStepValues(nameStep, nameCluster){
    let tokenStep=checkQuestionsStepValues(nameStep);
    let tokenCluster=checkClusterValues(nameStep,nameCluster)
    // return ( !tokenStep && !tokenCluster)? false:true;
    if(!tokenStep){
        return false;
    }else if(tokenStep && !tokenCluster){
        return false;
    }else{
        return true;
    }
}

