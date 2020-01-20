import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarChart from './BarChart';
import LineChart from './LineChart';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import ProportionChart from './ProportionChart';
import TreeMap from './TreeMap';
import ScatterPlot from './ScatterPlot';
import _ from "lodash";
import countrys from '@/datasets/scatterPlot/countrys';

export default class D3Container extends Component {
    chooseChart() {
        switch (this.props.type) {
            case ChartType.BARCHART:
                return  <BarChart {...this.props}/>

            case ChartType.LINECHART:
                return  <LineChart {...this.props}/>

            case ChartType.AREACHART:
                return  <AreaChart {...this.props}/>

            case ChartType.PIECHART:
                return  <PieChart {...this.props}/>

            case ChartType.PROPORTIONCHART:
                return  <ProportionChart {...this.props}/>

            case ChartType.TREEMAP:
                return  <TreeMap {...this.props}/>

            case ChartType.SCATTERPLOT:
                let newProps = _.cloneDeep(this.props);
                newProps.data = countrys;
                //console.log("D3Container...",this.props)
                return  <ScatterPlot {...newProps}/>
        
            default:
                console.log('error in chart type');
                return  null
        }
    }

    render() {
        return this.chooseChart()
    }
}
