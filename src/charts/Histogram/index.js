import React, { Component } from 'react';
import VegaLiteChart from '../VegaLiteChart';
import Color from '../../constants/Color';
import VegaLite from 'react-vega-lite';

const data = {
    "values": [
      {"bin_start": 8, "bin_end": 10, "count": 7},
      {"bin_start": 10, "bin_end": 12, "count": 29},
      {"bin_start": 12, "bin_end": 14, "count": 71},
      {"bin_start": 14, "bin_end": 16, "count": 127},
      {"bin_start": 16, "bin_end": 18, "count": 94},
      {"bin_start": 18, "bin_end": 20, "count": 54},
      {"bin_start": 20, "bin_end": 22, "count": 17},
      {"bin_start": 22, "bin_end": 24, "count": 5}
    ]
};

const histogram = {
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "bin_start",
            "bin": {
            "binned": true,
            "step": 2
            },
            "type": "quantitative"
        },
        "x2": {"field": "bin_end"},
        "y": {
            "field": "count",
            "type": "quantitative"
        },
        "color": {"value": Color.DEEP_ORANGE},
    }
}

export default class Histogram extends Component {

    get spec() {
        var sizedSpec = Object.assign({},histogram);
        sizedSpec.width = this.props.width;
        sizedSpec.height = this.props.height;
        return sizedSpec;
    }

    render() {
        if (this.props.onCanvas) {
            return (<VegaLiteChart name={this.props.name} spec={histogram} data={data}/>);
        } else {
            return (<VegaLite data={data} spec={this.spec}/>);
        }
    }
}
