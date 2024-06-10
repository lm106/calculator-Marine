import {outputValues, transformValues} from "@/variables/store.js";
import {getCopy} from "@/modules/utils.js";

export function getNamesClusterTransformValues(){
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
