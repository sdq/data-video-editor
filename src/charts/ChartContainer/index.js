import React, { Component } from 'react';
import VegaLite from '../VegaLite';

export default class ChartContainer extends Component {

    render() {
        //TODO: VegaLite and D3
        return <VegaLite {...this.props}/>
    }
}
