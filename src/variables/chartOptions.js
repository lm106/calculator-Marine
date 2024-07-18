import {ref} from "vue";




export const seriesCluster = ref({});
export const seriesStepsCluster=ref([]);

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
        }
    },
    colors: ['#2b94a3','#fa6c3d'],
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