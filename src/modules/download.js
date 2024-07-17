import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import ApexCharts from "apexcharts";

import { jsPDF } from 'jspdf';
import {generateChart} from "@/modules/Charts.js";

export async function generatePDF(data){
    const pdf = new jsPDF();
    const config = styleFilePdf();
    const categoriaOptions = {
        chart: {
            type: 'bar',
            height: 400,
            width: 600,
        },
        series: [{
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60],
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: 0,
                        to: 100,
                        color: '#f3b415',
                    }],
                },
            },
        },
    };
    const clusterOptions = {
        chart: {
            type: 'line',
            height: 400,
            width: 600,
        },
        series: [{
            name: 'Revenue',
            data: [45, 55, 65, 75, 85, 95],
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        },
        colors: ['#FF1654', '#247BA0'],
    };

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
        colors: ['#008000', '#d4a823', '#2548f9'],
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
    const options2 = {
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
        colors: ['#008000', '#d4a823', '#fb0707'],
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
    const [categoriaImage, clusterImage] = await Promise.all([
        generateChart(options),
        generateChart(options2),
    ]);

    let y = config.y;
    const lineHeight = 15;

    const drawText = (text, x, y, options = {}) => {
        pdf.setFont(options.bold ? "helvetica" : "helvetica", options.bold ? "bold" : "normal");
        pdf.setFontSize(config.size);
        pdf.setTextColor(...config.color);
        pdf.text(text, x, y);
    };

    const drawUnderlineText = (text, x, y) => {
        drawText(text, x, y, { bold: true });
        const textWidth = pdf.getTextWidth(text);
        pdf.line(x, y + 2, x + textWidth, y + 2);
    };

    const addPageIfNeeded = (y) => {
        if (y >= 280) { // Ajusta esto según sea necesario
            pdf.addPage();
            return config.y;
        } else {
            return y;
        }
    };

    const drawData = (data, x, y, indent = 0) => {
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
                y = drawData(data[key], x, y, indent + 1);
            } else {
                drawText(`${'  '.repeat(indent)}${key}: ${data[key]}`, x, y);
                y += lineHeight;
                y = addPageIfNeeded(y);
            }
        }
        return y;
    };

    y = drawData(data, config.x, y);
    for (const imgURI of [categoriaImage, clusterImage]) {
        pdf.addPage();
        pdf.addImage(imgURI, 'PNG', 10, 10);
    }

    pdf.save(getNameFile());
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
