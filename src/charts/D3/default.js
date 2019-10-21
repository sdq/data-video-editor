import ChartType from '@/constants/ChartType';
import barchartDefaultSpec from './BarChart/default';

export default function d3DefaultSpec(chartType) {
    switch (chartType) {
        case ChartType.BARCHART:
            return barchartDefaultSpec;
    
        default:
            return {}
    }
}