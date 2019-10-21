import ChartType from '@/constants/ChartType';
import BarchartConfigure from './BarChart/configure';

// export default function d3Configure(chartType) {
//     switch (chartType) {
//         case ChartType.BARCHART:
//             return barchartConfigure;
    
//         default:
//             return null
//     }
// }

import React, { Component } from 'react';

export default class D3Configure extends Component {

    chooseConfigure = (chartType) => {
        switch (chartType) {
            case ChartType.BARCHART:
                return <BarchartConfigure  {...this.props}/>;
        
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
