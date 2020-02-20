import MyURL from '@/constants/MyURL';
import ChartType from '@/constants/ChartType';

export const vegaliteCharts = [
    {
        chart: ChartType.AREACHART,
        src: MyURL.OSS+"/charts/areachart.png"
    },
    {
        chart: ChartType.BARCHART,
        src: MyURL.OSS+"/charts/barchart.png"
    },
    {
        chart: ChartType.HISTOGRAM,
        src: MyURL.OSS+"/charts/histogram.png"
    },
    {
        chart: ChartType.LINECHART,
        src: MyURL.OSS+"/charts/linechart.png"
    },
    {
        chart: ChartType.SCATTERPLOT,
        src: MyURL.OSS+"/charts/scatterplot.png"
    },
];

export const d3Charts = [
    {
        name:"Area",
        chart: ChartType.AREACHART,
        src: MyURL.OSS+"/charts/areachart.png"
    },
    {
        name:"Bar",
        chart: ChartType.BARCHART,
        src: MyURL.OSS+"/charts/barchart.png"
    },
    {
        name:"Line",
        chart: ChartType.LINECHART,
        src: MyURL.OSS+"/charts/linechart.png"
    },
    {
        name:"Scatterplot",
        chart: ChartType.SCATTERPLOT,
        src: MyURL.OSS+"/charts/scatterplot.png"
    },
    {
        name:"Proportion",
        chart: ChartType.PROPORTIONCHART,
        src: MyURL.OSS+"/charts/proportionchart.png"
    },
    {
        name:"Pie",
        chart: ChartType.PIECHART,
        src: MyURL.OSS+"/charts/piechart.png"
    },
    {
        name:"Map",
        chart: ChartType.MAP,
        src: MyURL.OSS+"/charts/map.png" //map.png
    }
]