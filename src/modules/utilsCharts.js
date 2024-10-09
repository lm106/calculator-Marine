import {seriesStepsCluster} from "@/variables/chartOptions.js";
import {questions} from "@/variables/clusters.js";

export function getCategories(step){
    // let categories=[]
    //
    // seriesStepsCluster.value[step].forEach((obj)=>{
    //     categories.push(obj.name)
    // })
    return questions[step];
}
export function getCategoriesCluster(){
    return [
        'Relevance for national MSP process','Considered/used within MSP process',
        'Data is Findable', 'Data is Accesible', 'Data is Interoperable',
        'Data is Reusable', 'Spatial coverage (extension) of the data set',
        'Spatial resolution of the data (level of details)', 'Temporal coverage',
        'Temporal resolution', 'Completeness and timeliness',
        'Data accuracy and possible margin of error', 'Data consistency with MSP input data'
    ]
}
export function getAllScore(){
    return ['Relevance scores','Fair scores', 'Resolution and temporal scores','SDQF scores'];
}