import ApexCharts from "apexcharts";
import {getAllClusters, getCopy} from "@/modules/utils.js";
import {nameAllQuestions} from "@/variables/clusters.js";
import {optionsChartClusters, optionsStepClusters} from "@/variables/chartOptions.js";
import {getValuesPercent} from "@/modules/countRow.js";
import {getCategories} from "@/modules/utilsCharts.js"

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
    const chart=new ApexCharts(document.querySelector("#chart"), options);
    return chart.render().then(async () => {

        const { imgURI } = await chart.dataURI();
        return imgURI;
        // chart.dataURI().then(({ imgURI, blob }) => {
        //     var pdf = new jsPDF();
        //     pdf.addImage(imgURI, 'PNG', 0, 0);
        //     pdf.save("chart.pdf");
        // })
    })
}


async function generateChartCategory(){
    for (let i = 0; i < nameAllQuestions.length; i++) {
        let nameStep=nameAllQuestions[i];
        generateChart(nameStep);
        generateChart(nameStep);

    }
}




export function getOptionsClusters(namecluster){
    let options=getCopy(optionsChartClusters.value);
    options.xaxis.categories=Object.keys(getValuesPercent(namecluster))
    return options;
}

export function getOptionsStepClusters(step){
    let options= getCopy(optionsStepClusters.value);
    options.xaxis.categories=getCategories(step);
    return options;
}