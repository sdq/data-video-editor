import React, { Component } from 'react';
import { Image } from 'react-konva';
import { AnimationCreator } from '@/animation';
import * as vega from 'vega';
import * as vegalite from 'vega-lite';

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
        const animations = this.props.animations; 
        if (this.props.showAnimation && animations.length !== 0) {
            let animationCreator = new AnimationCreator(this.imageref);
            for (let index = 0; index < animations.length; index++) {
                let current = this.props.current;
                if (this.props.isVideoPerforming) {
                    current = 0;
                }
                const animation = animations[index];
                animationCreator.fromModel(animation).play(current);
            }
        }
    }
    componentDidUpdate(oldProps) {
        if (oldProps.spec !== this.props.spec) {
            this.loadChart();
        }
    }
    // TODO: unmount remove listener
    componentWillUnmount() {
        this.chartImage.removeEventListener('load', this.handleLoad);
    }
    loadChart() {
        const {spec, data} = this.props;
        spec.data = data;
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
                                .run();
                this.view.toImageURL('png', 1).then(function(url) {
                    //console.log(url);
                    this.chartImage = new window.Image();
                    //TODO: load image from vegalite spec
                    this.chartImage.src = url;
                    this.chartImage.crossOrigin = 'Anonymous';
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
                ref={node=>this.imageref=node}
                name={this.props.name}
                image={this.state.chartImage} 
            />
        )
    }
}
