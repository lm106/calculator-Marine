import {ref} from "vue";
import {getOutputValues} from "@/modules/OutputValue.js";
import {setFilterTransformValues} from "@/modules/TransformValues.js";
import {setScoreGlobal} from "@/modules/ScoreGlobal.js";
import {setCountRow} from "@/modules/countRow.js";
import {
    setSeriesCategory,
    setSeriesClusters,
    setSeriesScoreCategory, setSeriesScoreClusters,
    setSeriesStepClusters
} from "@/modules/SeriesCharts.js";

export const tokenReport=ref(true);
export function initReport(n) {
    console.log("initReport");
    console.log(n);
    if(tokenReport.value){
        initReportValues();
        initReportChart();
        tokenReport.value=false;
    }
}

function initReportValues(){
    getOutputValues();
    setFilterTransformValues();
    setScoreGlobal();
    setCountRow();
}

function initReportChart(){
    setSeriesCategory();
    setSeriesScoreCategory();
    setSeriesClusters();
    setSeriesScoreClusters();
    // setSeriesStepClusters();
}

