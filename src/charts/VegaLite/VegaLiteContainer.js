import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarChart from './BarChart';
import LineChart from './LineChart';
import Scatterplot from './Scatterplot';
import AreaChart from './AreaChart';
import Histogram from './Histogram';

export default class VegaLiteContainer extends Component {

    chooseChart() {
        switch (this.props.type) {
            case ChartType.AREACHART:
                return  <AreaChart {...this.props}/>
            case ChartType.BARCHART:
                return  <BarChart {...this.props}/>
            case ChartType.LINECHART:
                return  <LineChart {...this.props}/>
            case ChartType.SCATTERPLOT:
                return  <Scatterplot {...this.props}/>
            case ChartType.HISTOGRAM:
                return  <Histogram {...this.props}/>
        
            default:
                console.log('error in chart type');
                return  <Histogram {...this.props}/>
        }
    }

    render() {
        return this.chooseChart()
    }
}
