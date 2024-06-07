import {outputValues, scoreGlobal, transformValues, values} from "@/components/form/content/store.js";
import {
    checkCluster,
    checkQuestionsStep,
    getValue,
    getValueCluster,
    getValueOtherStep
} from "@/components/form/content/utils.js";
import {questions} from "@/components/form/content/clusters.js";

export function getCalculateFairReusable(name_cluster, blockTitle,name_activity){
    let d_findable = getValue('Fair', name_cluster, blockTitle, name_activity, questions.Fair[0]);
    let d_accesible = getValue('Fair', name_cluster, blockTitle, name_activity, questions.Fair[1]);
    let d_interoperable = getValue('Fair', name_cluster, blockTitle, name_activity, questions.Fair[2]);
    // console.log(d_accesible, d_findable,d_interoperable)
    let res=parseFloat(((d_findable +d_accesible + d_interoperable)/3).toFixed(3));
    // console.log(res)
    return res;
}

export function getCalculateSDQFCompleteness(name_cluster, blockTitle,name_activity){
    let spatial_coverage = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][0]);
    let spatial_resolution = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][1]);
    let temporal_coverage = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][2]);
    let temporal_resolution = getValueOtherStep('Resolution and temporal', name_cluster, blockTitle, name_activity, questions["Resolution and temporal"][3]);
    // console.log(spatial_coverage, spatial_resolution, temporal_coverage, temporal_resolution)
    let res=parseFloat(((spatial_coverage +spatial_resolution + temporal_coverage +temporal_resolution)/4).toFixed(3));
    // console.log(res)
    return res;
}

export function getValueRelevance(name_cluster, blockTitle,activity, questions){
    // let indexRelevance = checkQuestionsStep('Relevance');
    // let indexCluster= checkCluster('Relevance',name_cluster);
    let cluster=values.value['Relevance'][name_cluster];
    if(cluster) {
        return cluster[blockTitle][activity][questions] <= 1;
    }else{
        return true;
    }
}


/**
 * Devuelve el número de filas que hay en transformValues que tiene los valores que cumple
 * condición (filtrado antes)
 * @param cluster
 * @returns {{}}
 */
export function getLength(cluster, step){
    // console.log(transformValues.value)
    // let index=transformValues.value.Relevance.findIndex(item=> Object.keys(item)[0]==cluster);
    let count =
        (step !='Relevance')?
            Object.values(transformValues.value.Relevance[cluster])
            .flatMap(block => Object.values(block))
            .map(activity => Object.values(activity)).length
        :
            Object.values(outputValues.value.Relevance[cluster])
                .flatMap(block => Object.values(block)).length
        ;
        // .reduce((acc, values) => acc + (values[0] > 1 ? 1 : 0), 0);
    return {[cluster]: count}
}

/**
 * Devuelve el número de filas y la suma de todos los valores de cada columna
 * @param list
 * @param cluster
 * @param step
 * @returns {{}}
 */
export function getLengthFilterRelevance(list_blocks, cluster, step){
    let array = Object.entries(list_blocks)
        .flatMap(([keyBlock, block]) => Object.values(block));
    let count=getLength(cluster,step);
    let percent=getPercentColumn(cluster, step)
// :getPercentRelevanceNational(array, cluster, step);
    let sumTotalFilter=array.reduce((acc, curr)=>{
        return acc.map((value, index)=> value +curr[index]);
    })
    return {[cluster]: {columnTotal: count, sumTotalValue: sumTotalFilter,
        ...percent
    }};
}

/**
 * Calcula cada celda de las columnas scores.
 * @param list_blocks
 * @param cluster
 * @param step
 * @returns {{}}
 */
export function getScoreRow(list_blocks, cluster, step){
    console.log(list_blocks, cluster, step);
    let res_cluster_score=(step == 'Relevance')?
        Object.entries(list_blocks).reduce((acc, [keyBlock, activities]) => {
            acc[keyBlock] = Object.entries(activities).reduce((activityAcc, [keyActivity, activityValues]) => {
                let percent = activityValues.reduce((acc, value) => acc * value, 1) / (3 ** activityValues.length);
                activityAcc[keyActivity] = percent;
                return activityAcc;
            }, {});
            return acc;
        }, {})
        :
        Object.entries(list_blocks).reduce((acc, [keyBlock, activities]) => {
            acc[keyBlock] = Object.entries(activities).reduce((activityAcc, [keyActivity, activityValues]) => {
                let percent = activityValues.reduce((acc, value) => acc + value) /  activityValues.length/3;
                activityAcc[keyActivity] = percent;
                return activityAcc;
            }, {});
            return acc;
        }, {});

    return {[step]:{[cluster]: res_cluster_score}};
}

export function getPercentRelevanceNational(array, cluster, step){

}
export function getPercentColumn(cluster, step){
    // let indexStep=transformValues.value.findIndex(item=> Object.keys(item)[0]==step);
    // let indexcluster=transformValues.value[indexStep][step].findIndex(item=> Object.keys(item)[0]==cluster);

    let resScore=[], resOtherColumn, resRelevance;

    console.log('score', scoreGlobal.value)
    Object.entries(scoreGlobal.value).forEach(([step_score, cluster_object])=>{
        // console.log(cluster_object, step_score);
        // console.log(Object.values(step_score));
        Object.entries(cluster_object).forEach(([cluster_key, blocks])=>{
            let count=getLength(cluster_key,step_score)
            // console.log(cluster_key, blocks)
            // console.log(count)
            let sum = getSumTotalColumn(blocks, 'Score');
            resScore.push({[step_score + ' scores']: getPercentScore(sum,count[cluster_key])});
        })

    });
    console.log(resScore);

    Object.entries(transformValues.value).forEach(([keyStep, cluster_object])=>{
        console.log('transf', cluster_object, keyStep);
        console.log(cluster_object);
        Object.entries(cluster_object).forEach(([cluster_key, blocks])=>{
            console.log(cluster_key, blocks)
            let count=getLength(cluster_key,keyStep)
            // console.log(count)
            let sum = getSumTotalColumn(blocks, 'Transform');
            console.log('tsum', sum)
            sum.forEach((e, i)=>{
                resScore.push({[questions[keyStep][i]]: getPercentColumns(e,count[cluster_key])});

            })
        })

    });
    // transformValues.value.forEach(group => {
    //     Object.keys(group).forEach(groupName => {
    //         group[groupName].forEach(category => {
    //             Object.keys(category).forEach(descriptorName => {
    //                 const descriptor = category[descriptorName];
    //                 if (!resOtherColumn[descriptorName]) {
    //                     resOtherColumn[descriptorName] = {};
    //                 }
    //                 Object.keys(descriptor).forEach(subItem => {
    //                     if (!resOtherColumn[descriptorName][subItem]) {
    //                         resOtherColumn[descriptorName][subItem] = [];
    //                     }
    //                     descriptor[subItem].forEach((value, index) => {
    //                         if (!resOtherColumn[descriptorName][subItem][index]) {
    //                             resOtherColumn[descriptorName][subItem][index] = 0;
    //                         }
    //                         resOtherColumn[descriptorName][subItem][index] += value;
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // });
    // console.log(resOtherColumn)

    return {'scores': resScore};

}
function getPercentScore(sum, length){
    return parseFloat((sum/length).toFixed(3));
}
function getPercentColumns(sum, length){
    return parseFloat((sum/(length*3)).toFixed(3));
}
function getSumTotalColumn(list_blocks, type){
    let res=0;
        console.log('sum --------',list_blocks)
    if(type=='Score') {
        Object.entries(list_blocks).forEach(([block_key, block]) => {
            // console.log(block)
            Object.entries(block).forEach(([key, activity]) => {
                // console.log(activity)
                // Object.entries(activity).forEach(([key, value])=> {
                // console.log(value)
                res += activity;
                // });
            });
        });
        // console.log(res)
        return parseFloat(res.toFixed(3));


    }else{
        let resColums=[]
        Object.entries(list_blocks).forEach(([block_key, block]) => {
            Object.entries(block).forEach(([key, activity]) => {
                activity.forEach((value, index) => {
                    if (!resColums[index]) {
                        resColums[index] = 0;
                    }
                    resColums[index] += value;
                });
            });
        });
        resColums=resColums.map((value) => parseFloat((value).toFixed(3)));
        return resColums;
    }
    // });
}



