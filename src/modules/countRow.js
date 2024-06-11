import {countRow} from "@/variables/store.js";
import {getKey} from "@/modules/utils.js";
import {questions} from "@/variables/clusters.js";

export function getNamesScore(){
    if(getKey(countRow.value).length==0) return [];
    let nameCluster=getKey(countRow.value)[0];
    let r=Object.keys(countRow.value[nameCluster].percent).filter((item)=>item.includes('scores'));
    // console.log(r);
    return r;
}
export function getValuesScore(nameStep){
    let valuesCluster=[];
    Object.entries(countRow.value).forEach(([keyCluster, content_cluster]) => {
        console.log(nameStep);
        valuesCluster.push(content_cluster.percent[nameStep])

    })
    return valuesCluster
}
export function getNamesAskStep(nameStep){
    return questions[nameStep];
}
export function getValuesAsk(nameAsk){
    let values=[];
    Object.entries(countRow.value).forEach(([keyCluster, content_cluster]) => {
        // subquestion.forEach((ask)=>{
        values.push(content_cluster.percent[nameAsk]);
        // })

    })
    console.log(values)
    return values
}