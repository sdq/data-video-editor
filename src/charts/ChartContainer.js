import React, { Component } from 'react';
import VegaLite from './VegaLite';
import D3Chart from './D3';
import ChartCategory from '@/constants/ChartCategory';

export default class ChartContainer extends Component {

    render() {
        if (this.props.category === ChartCategory.D3) {
            return <D3Chart {...this.props}/>
        } else {
            return <VegaLite {...this.props}/>
        }
    }
}
