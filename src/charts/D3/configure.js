import React, { Component } from 'react';
import ChartType from '@/constants/ChartType';
import BarchartStyle from './BarChart/style';

export default class D3Configure extends Component {

    chooseConfigure = (chartType) => {
        switch (chartType) {
            case ChartType.BARCHART:
                return <BarchartStyle  {...this.props}/>;
        
            default:
                return null
        }
    }

    render() {
        let conf = this.chooseConfigure(this.props.chartType)
        return (
            <div>
                {conf}
            </div>
        )
    }
}
