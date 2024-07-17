import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
import ApexCharts from "apexcharts";

import { jsPDF } from 'jspdf';
import {createChartInCanvas} from "@/modules/Charts.js";
export async function generateChart(){
    const chart=createChartInCanvas()
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

    const [categoriaImage, clusterImage] = await Promise.all([
        generateChart(categoriaOptions),
        generateChart(clusterOptions),
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
