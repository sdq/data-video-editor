import ChartType from '@/constants/ChartType';
import {getDefaultSpec} from '@/charts/Info';

const chart = ChartType.BARCHART;
const spec = getDefaultSpec('D3', chart);

export {chart, spec}
