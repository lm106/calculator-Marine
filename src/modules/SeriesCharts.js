import {seriesCategory, seriesCluster, seriesScoreCategory, seriesStepsCluster} from "@/variables/chartOptions.js";
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
    if(namesSteps[nameStep]){
        return seriesCategory.value[namesSteps[nameStep]];
    }else{
        return [{name: undefined, data: []}]
    }
}
export function getSeriesScores(nameScore){
    const namesSteps=getKey(transformValues.value);
    const namesScore=getNamesScore();

    if(namesSteps[nameScore]){
        // console.log(seriesScores.value[namesSteps[i]])
        return [{name: namesScore[nameScore],data:seriesScoreCategory.value[namesScore[nameScore]]}];
    }else{
        return [{name: undefined, data: []}]
    }
}
export function setSeriesClusters(nameCluster){
    let values=getValuesPercent(nameCluster);
    let obj={name: nameCluster, data: Object.values(values)};
    if (seriesCluster.value[nameCluster]){
        seriesCluster.value[nameCluster]=obj;
    }else{
        seriesCluster.value={...getCopy(seriesCluster.value),[nameCluster]:obj};
    }
}
export function getSeriesClusters(nameCluster){
    return [getCopy(seriesCluster.value[nameCluster])];
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
