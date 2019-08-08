import React, { Component } from 'react';
import VegaLiteChart from '../VegaLiteChart';
import Color from '../../constants/Color';

const barchart = {
    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
      "values": [
        {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
        {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
        {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
      ]
    },
    "mark": "bar",
    "encoding": {
      "x": {"field": "a", "type": "ordinal"},
      "y": {"field": "b", "type": "quantitative"},
      "color": {"value": Color.DEEP_ORANGE},
    }
}

export default class BarChart extends Component {
    render() {
        return (
            <VegaLiteChart name={this.props.name} spec={barchart}/>
        )
    }
}