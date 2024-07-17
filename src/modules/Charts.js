import ApexCharts from "apexcharts";
import {getAllClusters} from "@/modules/utils.js";
import {jsPDF} from "jspdf";


const chartOptionsScore = {
    series:[{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal:true,
            // borderRadius: 10,
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
export function createChartInCanvas (){
    const options = {
        chart: {
            height: 450,
            type: 'bar',
            animations: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#008000', '#d4a823', '#f92525'],
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
            {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            },
            {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1

        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    }

    return new ApexCharts(document.querySelector("#chart"), options);
}
