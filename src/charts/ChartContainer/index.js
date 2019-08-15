import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarChart from '../BarChart';
import LineChart from '../LineChart';
import Scatterplot from '../Scatterplot';
import AreaChart from '../AreaChart';
import Histogram from '../Histogram';

export default class ChartContainer extends Component {

    chooseChart() {
        switch (this.props.element.info().type) {
            case ChartType.AREACHART:
                return <AreaChart name={this.props.name} {...this.props}/>
            case ChartType.BARCHART:
                return <BarChart name={this.props.name} {...this.props}/>
            case ChartType.LINECHART:
                return <LineChart name={this.props.name} {...this.props}/>
            case ChartType.SCATTERPLOT:
                return <Scatterplot name={this.props.name} {...this.props}/>
            case ChartType.HISTOGRAM:
                return <Histogram name={this.props.name} {...this.props}/>
        
            default:
                return <Histogram name={this.props.name} {...this.props}/>
        }
    }

    render() {
        return (
            <div>
                {this.chooseChart()}
            </div>
        )
    }
}
