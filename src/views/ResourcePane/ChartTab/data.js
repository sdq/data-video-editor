import MyURL from '@/constants/MyURL';
import ChartType from '@/constants/ChartType';

const data = [
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

export default data;