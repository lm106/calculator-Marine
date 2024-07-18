import {seriesCluster, seriesStepsCluster} from "@/variables/chartOptions.js";
import {getAllValuesStep, getValuesPercent} from "@/modules/countRow.js";
import {getCategories} from "@/modules/utilsCharts.js";
import {getCopy} from "@/modules/utils.js";



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
