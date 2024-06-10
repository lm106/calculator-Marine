import {inputValues, values} from "@/variables/store.js";
import {checkClusterValues} from "@/modules/ValuesValue.js";

export function getValueOtherStep (nameStep, nameCluster, blockTitle, activity, question){
    // console.log('value---->',values.value)
    // let indexStep= checkQuestionsStepValues(nameStep);
    let indexCluster= checkClusterValues(nameStep, nameCluster);
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