import ApexCharts from "apexcharts";
import {getAllClusters, getCopy} from "@/modules/utils.js";
import {nameAllQuestions, nameClusters, nameQuestions, title} from "@/variables/clusters.js";
import {
    chartOptionsClusterCategory,
    chartOptionsClusterScoreCategory,
    optionsChartClusters,
    optionsStepClusters
} from "@/variables/chartOptions.js";
import {getValuesPercent} from "@/modules/countRow.js";
import {getCategories, getCategoriesCluster} from "@/modules/utilsCharts.js"
import {getSeries, getSeriesClusters, getSeriesScores} from "@/modules/SeriesCharts.js";

const chartOptionsScore = {
    series:[{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    chart: {
        height: 325,
        width: 425,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal:true,
            dataLabels: {
                position: 'center',
            },
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val + "%";
        },
        // offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#fff","#304758"]
        }
    },
    xaxis: {
        categories: getAllClusters(),
        position: 'bottom',
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: true,
        }
    },
    yaxis: {
        reversed:true,
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true,
        },
        labels: {
            show: true,
            formatter: function (val) {
                return val;
            }
        }
    },
    legend: {
        showForSingleSeries: true,
    },
    title: {
        text: '',
        align: 'center',
        style: {
            color: '#444'
        }
    },
    colors: ['#fb4300'],
};

export async function generateChart(options){
    let chartDiv=document.createElement('div');
    chartDiv.id=options.title.text.trim();
    const containerChart=document.querySelector("#chart");
    containerChart.appendChild(chartDiv);
    const chart=new ApexCharts(chartDiv, options);
    return chart.render().then(async () => {

        const { imgURI } = await chart.dataURI();
        return (imgURI == 'data:,')?'': imgURI;
        // chart.dataURI().then(({ imgURI, blob }) => {
        //     var pdf = new jsPDF();
        //     pdf.addImage(imgURI, 'PNG', 0, 0);
        //     pdf.save("chart.pdf");
        // })
    })
}


export async function generateChartsCategory(){
    let list_img_chart=[];
    let response;
    for (let i = 0; i < nameQuestions.length; i++) {
        let nameStep=nameQuestions[i];
        let optionsclusterCategory=getOptionsClusterCategory(nameStep);
        let optionsclusterScoreCategory=getOptionsClusterScoreCategory(title[i]);

        optionsclusterCategory.series=getSeries(nameStep);
        optionsclusterCategory.dataLabels.enabled=true;

        optionsclusterScoreCategory.series=getSeriesScores(nameStep);
        response=await Promise.all([
            generateChart(optionsclusterCategory),
            generateChart(optionsclusterScoreCategory)
        ]);
        list_img_chart.push(...response);

    }
    return list_img_chart
}

export async function generateChartsCluster(){
    let list_img_chart=[];
    let response;
    for (let i = 0; i < nameClusters.length; i++) {
        let nameCluster=nameClusters[i];
        let optionscluster=getOptionsClusters(nameCluster);
        let optionsStepCluster=getOptionsStepClusters(title[i]);

        optionscluster.series=getSeriesClusters(nameCluster);
        optionscluster.title.text=nameCluster;

        optionsStepCluster.dataLabels.enabled=true;
        optionsStepCluster.dataLabels.floating=false;

        // optionsStepCluster.series=getSeriesScores(nameStep);
        response=await Promise.all([
            generateChart(optionscluster),
        //     // generateChart2(optionsStepCluster),
        ]);
        list_img_chart.push(...response);
    }
    return list_img_chart
}

export function getOptionsClusterCategory(nameTitle){
    let options=getCopy(chartOptionsClusterCategory.value);
    options.xaxis.categories=getAllClusters();
    options.xaxis.labels= {
        formatter: function (val) {
            return val + "%"
        }
    }
    options.title.text=nameTitle;
    return options;
}
export function getOptionsClusterScoreCategory(nameTitle){
    let options=getCopy(chartOptionsClusterScoreCategory.value);
    options.xaxis.categories=getAllClusters();
    options.xaxis.labels= {
        formatter: function (val) {
            return val + "%"
        }
    }
    options.title.text=nameTitle;
    return options;
}

export function getOptionsClusters(namecluster){
    let options=getCopy(optionsChartClusters.value);
    options.xaxis.categories=getCategoriesCluster();
    options.xaxis.labels= {
        formatter: function (val) {
            return val + "%"
        }
    }
    return options;
}

export function getOptionsStepClusters(step){
    let options= getCopy(optionsStepClusters.value);
    options.xaxis.categories=getCategories(step);
    options.xaxis.labels= {
        formatter: function (val) {
            return val + "%"
        }
    }
    return options;
}