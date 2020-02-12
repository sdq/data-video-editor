import ChartType from '@/constants/ChartType';
import barchartSpec from './BarChart/spec';
import linechartSpec from './LineChart/spec';
import areachartSpec from './AreaChart/spec';
import piechartSpec from './PieChart/spec';
import proportionSpec from './ProportionChart/spec';
import treemapSpec from './TreeMap/spec';
import scatterplotSpec from './ScatterPlot/spec';
import mapSpec from './Map/spec';

export default function d3DefaultSpec(chartType) {
    switch (chartType) {
        case ChartType.BARCHART:
            return barchartSpec;

        case ChartType.LINECHART:
            return linechartSpec;

        case ChartType.AREACHART:
            return areachartSpec;

        case ChartType.PIECHART:
            return piechartSpec;

        case ChartType.PROPORTIONCHART:
            return proportionSpec;

        case ChartType.TREEMAP:
            return treemapSpec;

        case ChartType.SCATTERPLOT:
            return scatterplotSpec;
    
        case ChartType.MAP:
            return mapSpec;
        default:
            return {}
    }
}