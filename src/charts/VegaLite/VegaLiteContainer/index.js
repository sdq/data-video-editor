import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarChart from '../BarChart';
import LineChart from '../LineChart';
import Scatterplot from '../Scatterplot';
import AreaChart from '../AreaChart';
import Histogram from '../Histogram';

export default class VegaLiteContainer extends Component {

    chooseChart() {
        switch (this.props.type) {
            case ChartType.AREACHART:
                return  <AreaChart 
                            name={this.props.name} 
                            data={this.props.data} 
                            spec={this.props.spec} 
                            width={this.props.width} 
                            height={this.props.height} 
                            onCanvas={this.props.onCanvas} 
                            showAnimation={this.props.showAnimation} 
                            animations={this.props.animations} 
                            current={this.props.scenePosition}
                        />
            case ChartType.BARCHART:
                return  <BarChart 
                            name={this.props.name} 
                            data={this.props.data} 
                            spec={this.props.spec} 
                            width={this.props.width} 
                            height={this.props.height} 
                            onCanvas={this.props.onCanvas} 
                            showAnimation={this.props.showAnimation} 
                            animations={this.props.animations} 
                            current={this.props.scenePosition}
                        />
            case ChartType.LINECHART:
                return  <LineChart
                            name={this.props.name} 
                            data={this.props.data} 
                            spec={this.props.spec} 
                            width={this.props.width} 
                            height={this.props.height} 
                            onCanvas={this.props.onCanvas} 
                            showAnimation={this.props.showAnimation} 
                            animations={this.props.animations} 
                            current={this.props.scenePosition}
                        />
            case ChartType.SCATTERPLOT:
                return  <Scatterplot
                            name={this.props.name} 
                            data={this.props.data} 
                            spec={this.props.spec} 
                            width={this.props.width} 
                            height={this.props.height} 
                            onCanvas={this.props.onCanvas} 
                            showAnimation={this.props.showAnimation} 
                            animations={this.props.animations} 
                            current={this.props.scenePosition}
                        />
            case ChartType.HISTOGRAM:
                return  <Histogram
                            name={this.props.name} 
                            data={this.props.data} 
                            spec={this.props.spec} 
                            width={this.props.width} 
                            height={this.props.height} 
                            onCanvas={this.props.onCanvas} 
                            showAnimation={this.props.showAnimation} 
                            animations={this.props.animations} 
                            current={this.props.scenePosition}
                        />
        
            default:
                console.log('error in chart type');
                return  <Histogram
                            name={this.props.name} 
                            data={this.props.data} 
                            spec={this.props.spec} 
                            width={this.props.width} 
                            height={this.props.height} 
                            onCanvas={this.props.onCanvas} 
                            showAnimation={this.props.showAnimation} 
                            animations={this.props.animations} 
                            current={this.props.scenePosition}
                        />;
        }
    }

    render() {
        return this.chooseChart()
    }
}
