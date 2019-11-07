import React, { Component } from 'react';
import D3Chart from '../D3Chart';
import draw from './vis';
import {grow} from './animation';

export default class BarChart extends Component {
    render() {
        if (this.props.showAnimation) {
            return <D3Chart chartId={'vis-barchart'} draw={grow} {...this.props}/>
        } else {
            return <D3Chart chartId={'vis-barchart'} draw={draw} {...this.props}/>
        }
    }
}
