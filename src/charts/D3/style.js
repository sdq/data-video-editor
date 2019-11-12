import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarchartStyle from './BarChart/style';
import LinechartStyle from './LineChart/style';
import AreachartStyle from './AreaChart/style';
import PiechartStyle from './PieChart/style';
import ProportionStyle from './ProportionChart/style';
import TreemapStyle from './TreeMap/style';
import ScatterplotStyle from './ScatterPlot/style';

export default class D3ConfigureStyle extends Component {

    chooseConfigureStyle = (chartType) => {
        switch (chartType) {
            case ChartType.BARCHART:
                return <BarchartStyle  {...this.props}/>;

            case ChartType.LINECHART:
                return <LinechartStyle  {...this.props}/>;

            case ChartType.AREACHART:
                return <AreachartStyle  {...this.props}/>;

            case ChartType.PIECHART:
                return <PiechartStyle  {...this.props}/>;

            case ChartType.PROPORTIONCHART:
                return <ProportionStyle  {...this.props}/>;

            case ChartType.TREEMAP:
                return <TreemapStyle  {...this.props}/>;

            case ChartType.SCATTERPLOT:
                return <ScatterplotStyle  {...this.props}/>;
        
            default:
                return null
        }
    }

    render() {
        let conf = this.chooseConfigureStyle(this.props.chartType)
        return (
            <div>
                {conf}
            </div>
        )
    }
}
