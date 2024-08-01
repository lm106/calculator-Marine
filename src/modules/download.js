import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import ApexCharts from "apexcharts";

import { jsPDF } from 'jspdf';
import {generateChart, generateChartsCategory} from "@/modules/Charts.js";
let pdf = new jsPDF();
const config = styleFilePdf();
const lineHeight = 15;

function resetPDF(){
    pdf=new jsPDF();
}

export async function generatePDF(dataValues, dataScore,dataCountRow){

    // const options2 = {
    //     chart: {
    //         height: 450,
    //         type: 'bar',
    //         animations: {
    //             enabled: false
    //         }
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             columnWidth: '40%',
    //             endingShape: 'rounded'
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     colors: ['#008000', '#d4a823', '#fb0707'],
    //     stroke: {
    //         show: true,
    //         width: 2,
    //         colors: ['transparent']
    //     },
    //     series: [{
    //         name: 'Net Profit',
    //         data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    //     },
    //         {
    //             name: 'Revenue',
    //             data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    //         },
    //         {
    //             name: 'Free Cash Flow',
    //             data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    //         }],
    //     xaxis: {
    //         categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    //     },
    //     yaxis: {
    //         title: {
    //             text: '$ (thousands)'
    //         }
    //     },
    //     fill: {
    //         opacity: 1
    //
    //     },
    //     tooltip: {
    //         y: {
    //             formatter: function (val) {
    //                 return "$ " + val + " thousands"
    //             }
    //         }
    //     }
    // }
    // const [categoriaImage, clusterImage] = await Promise.all([
    //     generateChart(options),
    //     generateChart(options2),
    // ]);
    resetPDF();
    let y = config.y;
    y = generatePageToValues(dataValues, config.x, y);
    y = generatePageToScoreGlobal(dataScore, config.x, y);
    y = generatePageToCountRow(dataCountRow, config.x, y);
    addPageChart(await generateChartsCategory())

    pdf.save(getNameFile());
}
function generatePageToValues(data, x, y, indent = 0) {
    for (const key in data) {
        if (typeof data[key] === 'object') {
            if (indent === 0) {
                drawText(`${key}:`, x, y, { bold: true });
            } else if (indent === 1) {
                drawText(`${'  '.repeat(indent)}Cluster: ${key}`, x, y);
            } else if (indent === 2) {
                drawUnderlineText(`${'  '.repeat(indent)}${key}`, x, y);
            } else {
                drawText(`${'  '.repeat(indent)}${key}:`, x, y);
            }
            y += lineHeight;
            y = addPageIfNeeded(y);
            y = generatePageToValues(data[key], x, y, indent + 1);
        } else {
            drawText(`${'  '.repeat(indent)}${key}: ${data[key]}`, x, y);
            y += lineHeight;
            y = addPageIfNeeded(y);
        }
    }
    return y;
}
function generatePageToScoreGlobal(data, x, y, indent = 0){
    for (const key in data) {
        if (typeof data[key] === 'object') {
            if (indent === 0) {
                drawText(`Topic`, x, y, { bold: true });
                y+=lineHeight;
                drawText(`${key}:`, x, y, { bold: true });
            } else if (indent === 1) {
                drawText(`${'  '.repeat(indent)}Cluster: ${key}`, x, y);
            } else if (indent === 2) {
                drawUnderlineText(`${'  '.repeat(indent)}${key}`, x, y);
            } else {
                drawText(`${'  '.repeat(indent)}${key}:`, x, y);
            }
            y += lineHeight;
            y = addPageIfNeeded(y);
            y = generatePageToScoreGlobal(data[key], x, y, indent + 1);
        } else {
            drawText(`${'  '.repeat(indent)}${key}: ${data[key]}`, x, y);
            y += lineHeight;
            y = addPageIfNeeded(y);
        }
    }
    return y;
}
function generatePageToCountRow(data, x, y, indent = 0){
    for (const key in data) {
        if (typeof data[key] === 'object') {
            if (indent === 0) {
                drawText(`Topic`, x, y, { bold: true });
                y+=lineHeight;
                drawText(`${key}:`, x, y, { bold: true });
            } else if (indent === 1) {
                drawText(`${'  '.repeat(indent)}Cluster: ${key}`, x, y);
            } else if (indent === 2) {
                drawUnderlineText(`${'  '.repeat(indent)}${key}`, x, y);
            } else {
                drawText(`${'  '.repeat(indent)}${key}:`, x, y);
            }
            y += lineHeight;
            y = addPageIfNeeded(y);
            y = generatePageToCountRow(data[key], x, y, indent + 1);
        } else {
            drawText(`${'  '.repeat(indent)}${key}: ${data[key]}`, x, y);
            y += lineHeight;
            y = addPageIfNeeded(y);
        }
    }
    return y;
}
function addPageChart(list_chart){
    let y=config.y;
    let margin=25;
    pdf.addPage();

    for (let i = 0; i < list_chart.length; i++) {
        pdf.addImage(list_chart[i], 'PNG', config.x, y);
        if(i==0){
            y+=100;
            addPageIfNeeded(y)
        }else{
            if(i==list_chart.length-1){break;}
            if (i%2!=0){
                pdf.addPage();
                y=config.y;
            }else{
                y+=100;
                addPageIfNeeded(y)
            }
        }
    }
}


function addPageIfNeeded (y) {
    if (y >= 280) { // Ajusta esto según sea necesario
        pdf.addPage();
        return config.y;
    } else {
        return y;
    }
}

function drawText (text, x, y, options = {}) {
    pdf.setFont(options.bold ? "helvetica" : "helvetica", options.bold ? "bold" : "normal");
    pdf.setFontSize(config.size);
    pdf.setTextColor(...config.color);
    pdf.text(text, x, y);
}

function drawUnderlineText (text, x, y) {
    drawText(text, x, y, { bold: true });
    const textWidth = pdf.getTextWidth(text);
    pdf.line(x, y + 2, x + textWidth, y + 2);
}


function styleFilePdf() {
    return { x: 25, y: 25, size: 12, color: [0, 0, 0] };
}

function getNameFile() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    return `reports_${day}${month}${year}.pdf`;
}
