import ChartType from '@/constants/ChartType';
import barchartAnimations from './BarChart/animations';

export default function d3Animations(chartType) {
    switch (chartType) {
        case ChartType.BARCHART:
            return barchartAnimations;
    
        default:
            return []
    }
}