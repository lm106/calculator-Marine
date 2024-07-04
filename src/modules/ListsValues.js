import {listValues, outputValues, scoreGlobal} from "@/variables/store.js";


export function getValueListValues(keyParameter, position){
    return listValues.value[keyParameter][position];
}

export function setInitListValues() {
    let res = {};
    Object.entries(outputValues.value.Relevance).forEach(([keyCluster, list_block]) => {
        Object.entries(list_block).forEach(([keyBlock, list_activities]) => {
            Object.entries(list_activities).forEach(([keyActivity, valuesArray]) => {
                res={...res,[getNameParameter(keyBlock,keyActivity)]: [...valuesArray]};
            })
        })
    })
    return res;
}

export function setListValues(list){
    let res=list;
    Object.entries(outputValues.value).forEach(([keyStep, list_cluster])=>{
        if(keyStep != 'Relevance'){
            Object.entries(list_cluster).forEach(([keyCluster, list_block])=>{
                Object.entries(list_block).forEach(([keyBlock, list_activities])=>{
                    Object.entries(list_activities).forEach(([keyActivity, valuesArray])=>{
                        res[getNameParameter(keyBlock,keyActivity)].push(...valuesArray);
                        if(keyStep =='SDQF') {
                            let score = [
                                scoreGlobal.value.Relevance[keyCluster][keyBlock][keyActivity],
                                scoreGlobal.value.Fair[keyCluster][keyBlock][keyActivity],
                                scoreGlobal.value['Resolution and temporal'][keyCluster][keyBlock][keyActivity],
                                scoreGlobal.value.SDQF[keyCluster][keyBlock][keyActivity]
                            ];
                            res[getNameParameter(keyBlock,keyActivity)].push(...score);
                        }
                    })

                })
            })
        }
    })
    return res;
}

function getNameParameter(nameBlock, nameActivity){
     return nameBlock + ' - ' + nameActivity;

}