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
export function getValueScore(nameCluster, nameStep){
    return (countRow.value[nameCluster])?countRow.value[nameCluster].percent[nameStep]: 0.0;
}
export function getValuesScore(nameStep){
    let valuesCluster=[];
    Object.entries(countRow.value).forEach(([keyCluster, content_cluster]) => {
        // console.log(nameStep);
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
    // console.log(values)
    return values
}
export function getValuesPercent(nameCluster){
    return (countRow.value[nameCluster])?countRow.value[nameCluster].percent: 0.0;
}
export function getAllValuesStep(nameCluster){
    let res={};
    if(countRow.value[nameCluster]) {
        let data = countRow.value[nameCluster].percent
        Object.entries(questions).forEach(([keyStep, arrayQuestions])=> {
            let step = [];
            Object.entries(data).forEach(([keyColumns, value]) => {
                if (!keyColumns.includes('scores') && arrayQuestions.includes(keyColumns)) {
                    step.push({ name:keyColumns, data:[value]});
                }
            })
            res={...res,[keyStep]:step}
        })
    }
    return res;
}