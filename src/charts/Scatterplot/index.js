import React, { Component } from 'react';
import VegaLiteChart from '../VegaLiteChart';
import Color from '@/constants/Color';
import VegaLite from 'react-vega-lite';
import _ from 'lodash';

const demodata = {
    "values": [
      {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
      {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
      {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
    ]
};

const scatterplot = {
    "mark": "point",
    "encoding": {
      "x": {"field": "a", "type": "ordinal"},
      "y": {"field": "b", "type": "quantitative"},
      "color": {"value": Color.DEEP_ORANGE},
    }
}

export default class ScatterPlot extends Component {

    get spec() {
        var sizedSpec;
        if (_.isEmpty(this.props.spec) || _.isEmpty(this.props.spec.encoding)) {
            sizedSpec = Object.assign({},scatterplot);
        } else {
            sizedSpec = Object.assign({},this.props.spec);
        }
        sizedSpec.width = this.props.width;
        sizedSpec.height = this.props.height;
        return sizedSpec;
    }

    get data() {
        if (_.isEmpty(this.props.data)) {
            return demodata;
        } else {
            return this.props.data;
        }
    }

    render() {
        if (this.props.onCanvas) {
            return (<VegaLiteChart name={this.props.name} spec={this.spec} data={this.data}/>);
        } else {
            return (<VegaLite data={this.data} spec={this.spec}/>);
        }
    }
}
