import MyURL from '@/constants/MyURL';
import ChartCategory from '@/constants/ChartCategory';
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
        chart: ChartType.BARCHART,
        src: MyURL.OSS+"/charts/barchart.png"
    },
]