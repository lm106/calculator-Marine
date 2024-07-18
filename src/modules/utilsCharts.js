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