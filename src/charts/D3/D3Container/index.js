import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarChart from '../BarChart';

export default class D3Container extends Component {
    chooseChart() {
        switch (this.props.type) {
            case ChartType.BARCHART:
                return  <BarChart {...this.props}/>
        
            default:
                console.log('error in chart type');
                return  <BarChart {...this.props}/>
        }
    }

    render() {
        return this.chooseChart()
    }
}
