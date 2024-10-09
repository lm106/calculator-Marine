import {ref} from "vue";
import {getAllClusters} from "@/modules/utils.js";

export const color= ['#2b94a3','#fa6c3d'];
export const colorsCluster= ['#33b2df', '#546E7A', '#d4526e', '#13d8aa' ];
export const seriesCategory=ref({});
export const seriesScoreCategory=ref({});

export const chartOptionsClusterCategory=ref({
    chart: {
        height: 450,
        width: 400,
        type: 'bar',
        animations: {
            enabled: false
        }
    },
    xaxis: {
        categories: getAllClusters()
    },
    theme:{
        palette: 'palette2'
    },
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: '100%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        // show: true,
        width: 2.75,
        // colors: ['transparent']
    },
    tooltip:{
        y:{
            formatter: function (val) {
                return val + "%";
            },
        }
    },
    title: {
        text: '',
        align: 'center',
        style: {
            color: '#444'
        }
    },
});
export const chartOptionsClusterScoreCategory=ref({
    chart: {
        height: 350,
        width: 400,
        type: 'bar',
        animations: {
            enabled: false
        }
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
    colors: ['#fb4300']
});


export const seriesCluster = ref({});
export const seriesStepsCluster=ref([]);
export const seriesScoreCluster=ref([]);

export const optionsChartClusters =ref( {
    chart: {
        toolbar: {
            // show: true,
            // tools: {
            //   customIcons: [{
            //     icon: '<select id="chart-type-select"><option id="defa"></option> <option value="line">Line</option><option value="radar">radar</option><option value="bar">Bar</option><option value="area">Area</option></select>',
            //     index: 4,
            //     title: 'Change chart type',
            //     class: 'custom-icon',
            //     click: function (chart, options, e) {
            //       const selectElement = document.getElementById('chart-type-select');
            //       selectElement.addEventListener('change', function(e){
            //         updateTypeChart(chart, e);
            //       });
            //     }
            //   }]
            // }
        },
        type: 'bar',
        height: 450,
        width: 400,
        animations: {
            enabled: false
        }
    },
    colors: [],
    stroke:{
        width: 1
    },
    dataLabels:{
        enabled:true,
    },
    plotOptions: {
        bar: {
            columnWidth: '5%',
            horizontal: true,
            borderRadius:7.5,
            // borderRadiusOnAllStackedSeries: true
            // borderRadiusApplication:'end',
            // borderRadiusWhenStacked:'last'
        },
    },
    xaxis: {
        show:true,
        tickPlacement:'middle',
        categories: [],
        labels:{
            // rotate:0,
            // trim:false,
            showDuplicates:true,
            // hideOverlappingLabels:true
            labels:{
                minHeight: 50,
                maxHeight: 75,
            }
        },
    },
    fill: {
        opacity: 1
    },
    yaxis: {
        reversed: true,
        axisTicks:{
            show:true
        },
        labels: {
            show: true,
            align: 'left',
            style:{
                fontWeight:700
            },
            minWidth: 0,
            maxWidth: 100,
            offsetX: 0,
        },
    },
    title: {
        text: '',
        align: 'center',
        style: {
            color: '#444'
        }
    },
});

export const optionsStepClusters =ref({
    chart: {
        type: 'bar',
        stacked: true,
        stackType:'100%',
        width:450,
        heigth:450,
    },
    colors: ['#fa6c3d','rgba(255,237,227,0.77)'],
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: '25px',
            barHeight:'20px',
            borderRadius:10,
        }
    },
    dataLabels: {
        enabled: false,
        offsetX: 325,
        formatter: function (val) {
            return val + "%";
        },
        style: {
            fontSize: '12px',
            colors: ['#000']
        }
    },
    legend: {
        show: false,
    },
    xaxis: {
        categories: [],
        tickPlacement:'on',
        position:'top',
        labels:{
            show:false,
        },
        axisBorder:{
            show:false,
            heigth:0.5,
            width: '50%',
        },
        axisTicks:{
            show:false
        }
    },
    grid: {
        show:false,
        xaxis: {
            lines: {
                show: false
            }
        },
        yaxis:{
            lines:{
                show:false
            },
        }
    },
    yaxis: {
        // reversed: true,
        axisBorder:{
            show:false
        },
        axisTicks:{
            show:false
        },
        floating: true,
        labels: {
            show: true,
            align: 'left',
            style:{
                fontWeight:700
            },
            minWidth: 0,
            maxWidth: 1000,
            offsetX: 0,
            offsetY: -20,
            formatter: (val)=>{ return (!isNaN(val))?val+'%':val }
        },
    }});