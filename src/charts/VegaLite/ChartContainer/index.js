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
                return <AreaChart name={this.props.name} data={this.props.data} spec={this.props.spec} width={this.props.width} height={this.props.height}/>
            case ChartType.BARCHART:
                return <BarChart name={this.props.name} data={this.props.data} spec={this.props.spec} width={this.props.width} height={this.props.height}/>
            case ChartType.LINECHART:
                return <LineChart name={this.props.name} data={this.props.data} spec={this.props.spec} width={this.props.width} height={this.props.height}/>
            case ChartType.SCATTERPLOT:
                return <Scatterplot name={this.props.name} data={this.props.data} spec={this.props.spec} width={this.props.width} height={this.props.height}/>
            case ChartType.HISTOGRAM:
                return <Histogram name={this.props.name} data={this.props.data} spec={this.props.spec} width={this.props.width} height={this.props.height}/>
        
            default:
                return <Histogram name={this.props.name} data={this.props.data} spec={this.props.spec} width={this.props.width} height={this.props.height}/>
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
