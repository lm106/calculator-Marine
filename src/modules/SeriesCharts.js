import {
    seriesCategory,
    seriesCluster,
    seriesScoreCategory,
    seriesScoreCluster,
    seriesStepsCluster
} from "@/variables/chartOptions.js";
import {
    getAllValuesStep,
    getNamesAskStep,
    getNamesScore,
    getValuesAsk,
    getValuesPercent,
    getValuesScore
} from "@/modules/countRow.js";
import {getCategories} from "@/modules/utilsCharts.js";
import {getCopy, getKey} from "@/modules/utils.js";
import {transformValues} from "@/variables/store.js";
import {nameClusters} from "@/variables/clusters.js";

// export const namesScore=getNamesScore();
// export const namesSteps=getKey(transformValues.value);

export function setSeriesCategory(){
    const namesSteps=getKey(transformValues.value);
    seriesCategory.value={};
    namesSteps.forEach((step)=>{
        let namesSeries=getNamesAskStep(step);
        let res=[];

        namesSeries.forEach((e)=>{
            // console.log(e);
            res.push({name: e, data: getValuesAsk(e) })
        });
        seriesCategory.value={...seriesCategory.value,[step]: res};
    });
}
export function setSeriesScoreCategory(){
    const namesScore=getNamesScore();
    seriesScoreCategory.value={};
    namesScore.forEach((e)=> {
        let values = getValuesScore(e);
        seriesScoreCategory.value={...seriesScoreCategory.value, [e]: values};
    });
}

export function getSeries(nameStep){
    const namesSteps=getKey(transformValues.value);
    let i= namesSteps.findIndex((e)=> e==nameStep)
    if(i!=-1){
        return seriesCategory.value[namesSteps[i]];
    }else{
        return [{name: undefined, data: []}]
    }
}
export function getSeriesScores(nameScore){
    const namesSteps=getKey(transformValues.value);
    const namesScore=getNamesScore();
    let i= namesSteps.findIndex((e)=> e==nameScore)
    if(i!=-1){
        // console.log(seriesScores.value[namesSteps[i]])
        return [{name: namesScore[i],data:getCopy(seriesScoreCategory.value[namesScore[i]])}];
    }else{
        return [{name: undefined, data: []}]
    }
}

export function setSeriesClusters(){
    for (let i = 0; i < nameClusters.length; i++) {
        let values=getValuesPercent(nameClusters[i]);

        values = Object.fromEntries(
            Object.entries(values).filter(([key]) => !key.includes('scores'))
        );
        let obj={name: nameClusters[i], data: getCopy(Object.values(values))};
        if (seriesCluster.value[nameClusters[i]]){
            seriesCluster.value[nameClusters[i]]=obj;
        }else{
            seriesCluster.value={...getCopy(seriesCluster.value),[nameClusters[i]]:obj};
        }
    }
}
export function getSeriesClusters(nameCluster){
    return [getCopy(seriesCluster.value[nameCluster])];
}

export function setSeriesScoreClusters(){
    for (let i = 0; i < nameClusters.length; i++) {
        let values=getValuesPercent(nameClusters[i]);

        values = Object.fromEntries(
            Object.entries(values).filter(([key]) => key.includes('scores'))
        );
        let obj={name: nameClusters[i], data: getCopy(Object.values(values))};
        if (seriesScoreCluster.value[nameClusters[i]]){
            seriesScoreCluster.value[nameClusters[i]]=obj;
        }else{
            seriesScoreCluster.value={...getCopy(seriesScoreCluster.value),[nameClusters[i]]:obj};
        }
    }
}
export function getSeriesScoreClusters(nameCluster){
   return [seriesScoreCluster.value[nameCluster]];
}

export function setSeriesStepClusters(nameCluster){
    seriesStepsCluster.value=getAllValuesStep(nameCluster);
}
export function getSeriesStepClusters(step){
    let values=[
        {name: step, data: []},
        {name:'', data:Array(getCategories(step).length).fill(100)}
    ];
    if(seriesStepsCluster.value[step]) {
        seriesStepsCluster.value[step].forEach((obj) => {
            values[0].data.push(obj.data[0])
        })
    }
    return values
}
