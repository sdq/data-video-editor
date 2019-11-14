import React, { Component } from 'react';
import D3Chart from '../D3Chart';
import draw from './vis';
import {animate} from './animation';

export default class PieChart extends Component {
    render() {
        return <D3Chart chartId={'vis-piechart'} draw={draw} animate={animate} {...this.props}/>
    }
}