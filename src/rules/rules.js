import {outputValues, scoreGlobal, transformValues, values} from "@/variables/store.js";
import { checkClusterValues,checkQuestionsStepValues,getValueQuestionValues } from "@/modules/ValuesValue.js";
import {getValue, getValueOtherStep} from "@/modules/InputValues.js";

import {questions} from "@/variables/clusters.js";
import {get} from "jsdom/lib/jsdom/named-properties-tracker.js";

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
    // let indexRelevance = checkQuestionsStepValues('Relevance');
    // let indexCluster= checkClusterValues('Relevance',name_cluster);
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
 * @param step
 * @returns {{}}
 */
export function getLength(cluster, step){
    // console.log(transformValues.value)
    // let index=transformValues.value.Relevance.findIndex(item=> Object.keys(item)[0]==cluster);
    let count =
        (step !='Relevance')?
            Object.values(transformValues.value.Relevance[cluster])
            .flatMap(block => Object.values(block))
            .map(activity => Object.values(activity)[0]).reduce((acc, value) => {
                if (value>1) { // Ensure value is not undefined or null
                    acc += 1;
                }
                return acc;
            }, 0)
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
export function getLengthFilterRelevance(cluster){
    let list_steps_cluster = Object.entries(outputValues.value).flatMap(([keyStep, list_cluster])=>{
        // console.log(list_cluster, cluster, list_cluster[cluster])
        return {[keyStep]:Object.entries(list_cluster[cluster]).flatMap(([keyBlock, block]) =>
            Object.values(block))};
    });
    // console.log(list_steps_cluster)
    let res={};
    let countRelevance=getLength(cluster, 'Relevance')[cluster], countRest=getLength(cluster, 'Fair')[cluster];
    // console.log(countRest, countRelevance);
    list_steps_cluster.forEach((itemStep)=> {
    Object.entries(itemStep).forEach(([keyStep, list_blocks])=>{

        // console.log(itemStep)
        // console.log(list_blocks)
        let percent = getPercentColumn( countRest, countRelevance, cluster, keyStep)
        res={...res, ...percent};
    // let sumTotalFilter = array.reduce((acc, curr) => {
    //     return acc.map((value, index) => value + curr[index]);
    // })

    })
    })
    // console.log(res);
    return {
        [cluster]: {
            lengthColumnRelevance: countRelevance, lengthColumn:countRest,
            // sumTotalValue: sumTotalFilter,
            percent:res
        }
    };
}

/**
 * Calcula cada celda de las columnas scores.
 * @param list_blocks
 * @param cluster
 * @param step
 * @returns {{}}
 */
export function getScoreRow(list_blocks, cluster, step){
    // console.log(list_blocks, cluster, step);
    let res_cluster_score=(step == 'Relevance')?
        Object.entries(list_blocks).reduce((acc, [keyBlock, activities]) => {
            acc[keyBlock] = Object.entries(activities).reduce((activityAcc, [keyActivity, activityValues]) => {
                let percent = activityValues.reduce((acc, value) => acc * value, 1) / (3 ** activityValues.length);
                activityAcc[keyActivity] = parseFloat(percent.toFixed(3));
                return activityAcc;
            }, {});
            return acc;
        }, {})
        :
        Object.entries(list_blocks).reduce((acc, [keyBlock, activities]) => {
            acc[keyBlock] = Object.entries(activities).reduce((activityAcc, [keyActivity, activityValues]) => {
                let percent = activityValues.reduce((acc, value) => acc + value) /  activityValues.length/3;
                activityAcc[keyActivity] = parseFloat(percent.toFixed(3));;
                return activityAcc;
            }, {});
            return acc;
        }, {});

    return {[cluster]: res_cluster_score};
}

export function getPercentColumn(countRest,countRelevance, cluster, step){
    // let indexStep=transformValues.value.findIndex(item=> Object.keys(item)[0]==step);
    // let indexcluster=transformValues.value[indexStep][step].findIndex(item=> Object.keys(item)[0]==cluster);

    let resScore= {}, resOtherColumn, resRelevance;

    // console.log('score', scoreGlobal.value[step][cluster])
    // console.log('score', transformValues.value[step][cluster])
    let sum = getSumTotalColumn(scoreGlobal.value[step][cluster], 'Score');
    resScore={[step + ' scores']: getPercentScore(sum,(step=='Relevance')?countRelevance:countRest)};
    let sumQuestions = getSumTotalColumn(transformValues.value[step][cluster], 'Transform');

    let sumRelevanceNational = getSumTotalColumnRelevance(outputValues.value.Relevance[cluster]);
    // console.log('tsum', sumQuestions)
    // if(step!='Relevance') {
        sumQuestions.forEach((e, i) => {
            let ask = questions[step][i];
            let res;
            if(step=='Relevance'&& i ==0){
                resScore = {...resScore, [ask]: getPercentColumns(sumRelevanceNational, countRelevance)};
            }else{
                resScore = {...resScore, [ask]: getPercentColumns(e, countRest)};
            }
        })
    // console.log(resScore);
    return resScore;
}
function getPercentScore(sum, length){
    let res=(sum/length)*100;
    return parseFloat(res.toFixed(2));
}
function getPercentColumns(sum, length){
    let res=sum/(length*3)*100;
    return parseFloat(res.toFixed(2));
}
function getSumTotalColumn(list_blocks, type){
    let res=0;
        // console.log('sum --------',list_blocks)
    if(type=='Score') {
        Object.entries(list_blocks).forEach(([block_key, block]) => {
            Object.entries(block).forEach(([key, activity]) => {
                res += activity;
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
}

function getSumTotalColumnRelevance(list_blocks){
    let resColums=0
    Object.entries(list_blocks).forEach(([block_key, block]) => {
        Object.entries(block).forEach(([key, activity]) => {
            activity.forEach((value, index) => {
                if(index!=0) return;
                resColums += value;
            });
        });
    });
    resColums=parseFloat(resColums.toFixed(3));
    return resColums;
}