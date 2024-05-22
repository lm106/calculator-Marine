import {values} from "@/components/form/content/store.js";
import {
    checkCluster,
    checkQuestionsStep,
    getValue,
    getValueCluster,
    getValueOtherStep
} from "@/components/form/content/utils.js";
import {questions} from "@/components/form/content/clusters.js";

export function getCalculateFairReusable(name_cluster, blockTitle,name_activity){
    let d_findable = getValue('Fair', name_cluster, blockTitle, name_activity, questions.Fair[0]);
    let d_accesible = getValue('Fair', name_cluster, blockTitle, name_activity, questions.Fair[1]);
    let d_interoperable = getValue('Fair', name_cluster, blockTitle, name_activity, questions.Fair[2]);
    // console.log(d_accesible, d_findable,d_interoperable)
    let res=parseFloat(((d_findable +d_accesible + d_interoperable)/3).toFixed(3));
    // console.log(res)
    return res;
}

export function getCalculateSDQFCompleteness(name_cluster, blockTitle,name_activity){
    let spatial_coverage = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][0]);
    let spatial_resolution = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][1]);
    let temporal_coverage = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][2]);
    let temporal_resolution = getValue('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][3]);
    // console.log(spatial_coverage, spatial_resolution, temporal_coverage, temporal_resolution)
    let res=parseFloat(((spatial_coverage +spatial_resolution + temporal_coverage +temporal_resolution)/4).toFixed(3));
    // console.log(res)
    return res;
}

export function getValueRelevance(name_cluster, blockTitle,activity, questions){
    let indexRelevance = checkQuestionsStep('Relevance');
    let indexCluster= checkCluster(indexRelevance, 'Relevance',name_cluster);
    if(indexCluster !=-1) {
        return values.value[indexRelevance]['Relevance'][indexCluster][name_cluster][blockTitle][activity][questions] <= 1;
    }else{
        return true;
    }
}