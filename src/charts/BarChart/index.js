import React, { Component } from 'react';
import VegaLiteChart from '../VegaLiteChart';
import Color from '../../constants/Color';
import VegaLite from 'react-vega-lite';

const data = {
  "values": [
    {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
    {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
    {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
  ]
};

const barchart = {
    "mark": "bar",
    "encoding": {
      "x": {"field": "a", "type": "ordinal"},
      "y": {"field": "b", "type": "quantitative"},
      "color": {"value": Color.DEEP_ORANGE},
    }
}

export default class BarChart extends Component {

    get spec() {
        var sizedSpec = Object.assign({},barchart);
        sizedSpec.width = this.props.width;
        sizedSpec.height = this.props.height;
        return sizedSpec;
    }

    render() {
        if (this.props.onCanvas) {
            return (<VegaLiteChart name={this.props.name} spec={barchart} data={data}/>);
        } else {
            return (<VegaLite data={data} spec={this.spec}/>);
        }
    }
}
