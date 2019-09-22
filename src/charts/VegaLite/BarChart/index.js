import React, { Component } from 'react';
import VegaLiteChart from '../VegaLiteChart';
import Color from '@/constants/Color';
import VegaLite from 'react-vega-lite';
import _ from 'lodash';

const demodata = {
  "values": []
};

const barchart = {
    "mark": "bar",
    "encoding": {
      "color": {"value": Color.DEEP_ORANGE},
    }
}

export default class BarChart extends Component {

    get spec() {
        var sizedSpec;
        if (_.isEmpty(this.props.spec) || _.isEmpty(this.props.spec.encoding)) {
            sizedSpec = Object.assign({},barchart);
        } else {
            sizedSpec = Object.assign({},this.props.spec);
        }
        sizedSpec.mark = "bar";
        sizedSpec.width = this.props.width;
        sizedSpec.height = this.props.height;
        return sizedSpec;
    }

    get data() {
        if (_.isEmpty(this.props.data)) {
            return demodata;
        } else {
            return {
                "values": this.props.data
            };
        }
    }

    render() {
        if (this.props.onCanvas) {
            return (<VegaLiteChart name={this.props.name} spec={this.spec} data={this.data} showAnimation={this.props.showAnimation} animations={this.props.animations}/>);
        } else {
            return (<VegaLite data={this.data} spec={this.spec}/>);
        }
    }
}
