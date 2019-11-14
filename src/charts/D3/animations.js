import ChartType from '@/constants/ChartType';
import barchartAnimations from './BarChart/animations';
import linechartAnimations from './LineChart/animations';
import areachartAnimations from './AreaChart/animations';
import piechartAnimations from './PieChart/animations';
import proportionAnimations from './ProportionChart/animations';
import treemapAnimations from './TreeMap/animations';
import scatterplotAnimations from './ScatterPlot/animations';

export default function d3Animations(chartType) {
    switch (chartType) {
        case ChartType.BARCHART:
            return barchartAnimations;

        case ChartType.LINECHART:
            return linechartAnimations;

        case ChartType.AREACHART:
            return areachartAnimations;

        case ChartType.PIECHART:
            return piechartAnimations;

        case ChartType.PROPORTIONCHART:
            return proportionAnimations;

        case ChartType.TREEMAP:
            return treemapAnimations;

        case ChartType.SCATTERPLOT:
            return scatterplotAnimations;

        default:
            return []
    }
}