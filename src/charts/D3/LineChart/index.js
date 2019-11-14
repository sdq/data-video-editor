import React, { Component } from 'react';
import D3Chart from '../D3Chart';
import draw from './vis';
import {animate} from './animation';

export default class LineChart extends Component {
    render() {
        return <D3Chart chartId={'vis-linechart'} draw={draw} animate={animate} {...this.props}/>
    }
}