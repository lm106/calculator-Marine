import {outputValues, scoreGlobal} from "@/variables/store.js";
import {getScoreRow} from "@/rules/rules.js";

export function setScoreGlobal(){
    scoreGlobal.value=[];
    let resScoreList= {};
    Object.entries(outputValues.value).forEach(([keyStep, list_clusters])=> {
        // const name_step = Object.keys(step)[0];
        Object.entries(list_clusters).forEach(([keycluster, list_blocks])=> {
            // Object.entries(cluster).forEach(([keyCluster, blocks])=>{
            // const name_cluster = Object.keys(item)[0];
            if(!resScoreList[keyStep]){
                resScoreList[keyStep] = getScoreRow(list_blocks, keycluster, keyStep);
            } else {
                resScoreList[keyStep]={...resScoreList[keyStep], ...getScoreRow(list_blocks, keycluster, keyStep)}
            }
        })
    });
    scoreGlobal.value={...resScoreList};
}