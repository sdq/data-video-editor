import ChartType from '@/constants/ChartType';
import barchartChannels from './BarChart/channels';

export default function d3Channels(chartType) {
    switch (chartType) {
        case ChartType.BARCHART:
            return barchartChannels;
    
        default:
            return {}
    }
}