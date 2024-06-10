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
export function getNamesCluster(){
    let list_names=[];
    Object.entries(transformValues.value).forEach(([key, list_cluster])=>{
        let names=Object.keys(list_cluster);
        names.forEach((name)=>{
            if(list_names.findIndex((item)=>item==name)==-1){
                list_names.push(name);
            }
        })
    })
    return list_names;
}

export function setFilterValues(){
    transformValues.value ={};
    // console.log(outputValues.value)
    let data_relevance={...getCopy(outputValues.value)};
    const filteredRelevance = filterRelevance(data_relevance.Relevance);

    Object.entries(outputValues.value).forEach(([keyStep, cluster_content]) => {
        // let key=Object.keys(step);
        let newStep = {};
        if (keyStep!='Relevance') {
            newStep[keyStep] = filterOtherSections(cluster_content || [], filteredRelevance);
        }else{
            newStep.Relevance = filteredRelevance;
        }
        transformValues.value={...transformValues.value, ...newStep};

    });
    console.log(transformValues.value)

}

// Función recursiva para filtrar los valores en Relevance
function filterRelevance(relevance) {
    console.log(relevance)
    if(relevance ==undefined || relevance==null) return {};
    let res= Object.entries(relevance).reduce((acc,[key, item]) => {
        // const mainKey = Object.keys(item)[0];
        // console.log(item)
        // console.log(key)
        // const descriptors = item[key];

        const filteredDescriptors = filterDescriptors(item);

        if (Object.keys(filteredDescriptors).length > 0) {
            acc[key] = filteredDescriptors;
            return acc;
        }
    },{});
    // console.log(res)
    return res;
        // .filter(item => item !== null);
}

function filterDescriptors(descriptors) {
    const filteredDescriptors = {};
console.log(descriptors)
    Object.entries(descriptors).forEach(([descriptor, activities]) => {
        const filteredActivities = filterActivities(activities);

        if (Object.keys(filteredActivities).length > 0) {
            filteredDescriptors[descriptor] = filteredActivities;
        }
    });

    return filteredDescriptors;
}

function filterActivities(activities) {
    const filteredActivities = {};

    Object.entries(activities).forEach(([activity, values]) => {
        if (values[0] > 1) {
            filteredActivities[activity] = values;
        }
    });

    return filteredActivities;
}

// Función para filtrar las secciones 'Fair', 'Resolution and temporal' y 'SDQF' basadas en 'Relevance'
function filterOtherSections(cluster, filteredRelevance) {
    // return section.map(item => {
    //     const mainKey = Object.keys(item)[0];
    //     const descriptors = item[mainKey];
    //
    //     const filteredDescriptors = filterDescriptorsBasedOnRelevance(descriptors, filteredRelevance);
    //
    //     if (Object.keys(filteredDescriptors).length > 0) {
    //         return { [mainKey]: filteredDescriptors };
    //     }
    //     return null;
    // }).filter(item => item !== null);

    let res= Object.entries(cluster).reduce((acc,[key, item]) => {
        // const mainKey = Object.keys(item)[0];
        console.log(item)
        console.log(key)
        const filteredDescriptors = filterDescriptorsBasedOnRelevance(item, filteredRelevance);

        if (Object.keys(filteredDescriptors).length > 0) {
            acc[key] = filteredDescriptors;
            return acc;
        }
    },{});
    console.log(res)
    return res;
}

function filterDescriptorsBasedOnRelevance(descriptors, filteredRelevance) {
    const filteredDescriptors = {};

    const relevanceDescriptors = extractDescriptorsFromRelevance(filteredRelevance);

    Object.entries(descriptors).forEach(([descriptor, activities]) => {
        const relevantActivities = relevanceDescriptors[descriptor] || {};
        const filteredActivities = filterActivitiesBasedOnRelevance(activities, relevantActivities);

        if (Object.keys(filteredActivities).length > 0) {
            filteredDescriptors[descriptor] = filteredActivities;
        }
    });

    return filteredDescriptors;
}

function filterActivitiesBasedOnRelevance(activities, relevantActivities) {
    const filteredActivities = {};

    Object.entries(activities).forEach(([activity, values]) => {
        if (relevantActivities[activity]) {
            filteredActivities[activity] = values;
        }
    });

    return filteredActivities;
}

function extractDescriptorsFromRelevance(filteredRelevance) {
    const descriptors = {};

    Object.entries(filteredRelevance).forEach(([keyCluster,list_blocks]) => {
        // const mainKey = Object.keys(item)[0];
        // const subDescriptors = item[mainKey];
        Object.entries(list_blocks).forEach(([keyBlock, activities]) => {
            if (!descriptors[keyBlock]) {
                descriptors[keyBlock] = {};
            }
            Object.keys(activities).forEach(activity => {
                descriptors[keyBlock][activity] = true;
            });
        });
    });

    return descriptors;
}
