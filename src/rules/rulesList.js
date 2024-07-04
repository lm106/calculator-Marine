import {getValueListValues} from "@/modules/ListsValues.js";

export function getHighlyModerately(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueRelevanceConsidered=getValueListValues(parameter,1);
    return (valueRelevanceProcess > 1 && valueRelevanceConsidered > 1);
}
export function getHighFairScore(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueFairScore=getValueListValues(parameter,14);
    return (valueRelevanceProcess > 1 && valueFairScore > 0.5);
}
export function getCoverage(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSpatialCoverage =getValueListValues(parameter,6);
    return (valueRelevanceProcess > 1 && valueSpatialCoverage > 1);
}
export function getResolution(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSpatialResolution =getValueListValues(parameter,7);
    return (valueRelevanceProcess > 1 && valueSpatialResolution > 1);
}
export function getRelevantFulfilling(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueTemporalCoverage =getValueListValues(parameter,8);
    return (valueRelevanceProcess > 1 && valueTemporalCoverage > 1);
}
export function getAccurancyConsistency(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSDQFDataAccuracy =getValueListValues(parameter,11),
        valueSDQFDataConsistency=getValueListValues(parameter,12);
    return (valueRelevanceProcess > 1 && valueSDQFDataConsistency > 1 && valueSDQFDataAccuracy > 1);
}



export function getNotUseNotAvailable(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueRelevanceConsidered=getValueListValues(parameter,1),
        valueFairAccessible=getValueListValues(parameter,3);
    return (valueRelevanceProcess > 1 && valueRelevanceConsidered > 1 && valueFairAccessible < 2);
}
export function getNotUseAvailable(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueRelevanceConsidered=getValueListValues(parameter,1),
        valueFairAccessible=getValueListValues(parameter,3);
    return (valueRelevanceProcess > 1 && valueRelevanceConsidered > 1 && valueFairAccessible > 1);
}
export function getNotFindable(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueFairFindable=getValueListValues(parameter,2);
    return (valueRelevanceProcess > 1 && valueFairFindable < 2);
}
export function getNotAvailable(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueFairFindable=getValueListValues(parameter,2);
    return (valueRelevanceProcess > 1 && valueFairFindable < 2);
}
export function getNotInteroperable(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueFairInteroperable=getValueListValues(parameter,4);
    return (valueRelevanceProcess > 1 && valueFairInteroperable < 2);
}
export function getNotAdequateSpatialCoverage(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSpatialCoverage=getValueListValues(parameter,6);
    return (valueRelevanceProcess > 1 && valueSpatialCoverage < 2);
}
export function getNotAdequateSpatialResolution(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSpatialResolution=getValueListValues(parameter,7);
    return (valueRelevanceProcess > 1 && valueSpatialResolution < 2);
}
export function getNotAdequateTemporalCoverage(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueTemporalCoverage=getValueListValues(parameter,8);
    return (valueRelevanceProcess > 1 && valueTemporalCoverage < 2);
}
export function getNotAdequateTemporalResolution(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueTemporalResolution=getValueListValues(parameter,9);
    return (valueRelevanceProcess > 1 && valueTemporalResolution < 2);
}
export function getInadequateAccuracy(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSDQFDataAccuracy =getValueListValues(parameter,11);
    return (valueRelevanceProcess > 1 && valueSDQFDataAccuracy < 2);
}
export function getInadequateConsistency(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        valueSDQFDataConsistency =getValueListValues(parameter,12);
    return (valueRelevanceProcess > 1 && valueSDQFDataConsistency < 2);
}





export function getNotFulfillingMonitoringRequirements(parameter){
    let valueRelevanceProcess=getValueListValues(parameter,0),
        value =getValueListValues(parameter,0);
    return (valueRelevanceProcess > 1);
}
