import React, { Component } from 'react';
import { Image } from 'react-konva';
import * as vega from 'vega';
import * as vegalite from 'vega-lite';

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
      "y": {"field": "b", "type": "quantitative"}
    }
}

export default class VegaLiteChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spec: this.props.spec,
            chartImage: null,
            renderer: 'canvas',
        };
        this.view = null;
    }
    componentDidMount() {
        this.loadChart();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.spec !== this.props.spec) {
            this.loadChart();
        }
    }
    componentWillUnmount() {
        this.chartImage.removeEventListener('load', this.handleLoad);
    }
    loadChart() {
        //const {spec} = this.props;
        const spec = barchart;
        if (spec) {
            let vegaSpec;
            try {
                vegaSpec = vegalite.compile(spec).spec;
            } catch (error) {
                this.showError(`Invalid vega-lite spec: ${error.message}`);
            return;
            }
            // Clear existing view
            if (this.view) {
                this.view.finalize();
            }

            try {
                const runtime = vega.parse(vegaSpec);
                this.view = new vega.View(runtime)
                                .renderer('canvas')
                                .initialize('#view')
                                .run();
                this.view.toImageURL('png').then(function(url) {
                    console.log(url);
                    this.chartImage = new window.Image();
                    //TODO: load image from vegalite spec
                    this.chartImage.src = url;
                    this.chartImage.addEventListener('load', this.handleLoad);
                }.bind(this)).catch(function(error) {
                    console.log("export error");
                    console.log(error);
                });
            } catch (error) {
                console.log("invalid vegalite")
                //his.showError(`Invalid vega spec: ${error.message}`);
            }
        }
    }
    handleLoad = () => {
        this.setState({
            chartImage: this.chartImage
        });
    };

    render() {
        return (
            <Image 
                name={this.props.name}
                image={this.state.chartImage} 
            />
        )
    }
}
