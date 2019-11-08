import React, { Component } from 'react';
import ChartImage from '../ChartImage';
import { AnimationCreator } from '@/animation';
import canvg from 'canvg';

export default class D3Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specString: '',
            showAnimation: false,
            chartImageUrl: '',
        };
    }

    componentDidMount() {
        if (this.props.animate) {
            this.renderAnimation();
        } else {
            this.renderChart();
        }
    }

    componentDidUpdate() {
        if (this.state.specString !== JSON.stringify(this.props.spec) || this.props.showAnimation !== this.state.showAnimation) {
            if (this.props.animate) {
                this.renderAnimation();
            } else {
                this.renderChart();
            }
        }
    }

    renderChart = () => {
        const svg = this.props.draw(this.props);
        this.setState({
            showAnimation: this.props.showAnimation
        });
        if (svg) {
            const visSource = svg.node().parentNode.innerHTML;
            const chartImageUrl = this.getImageUrl(visSource);
            this.setState({
                specString: JSON.stringify(this.props.spec),
                chartImageUrl: chartImageUrl
            });
        }
    }

    renderAnimation = () => {
        for (let index = 0; index < this.props.animate.length; index++) {
            setTimeout(function () {
                this.props.animate[index](this.props);
            }.bind(this), index * 2000)
        }
        this.setState({
            showAnimation: this.props.showAnimation
        });
    }

    getImageUrl = (source) => {
        var canvas = document.createElement('canvas');
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        canvg(canvas, source);
        return canvas.toDataURL('image/png');
    }

    getImageRef = (ref) => {
        if (!this.imageref && ref) {
            this.imageref = ref;
            const animations = this.props.animations; 
            if (this.props.showAnimation && animations.length !== 0) {
                let animationCreator = new AnimationCreator(ref);
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
    }

    render() {
        if (this.props.onCanvas) {
            return <ChartImage name={this.props.name} src={this.state.chartImageUrl} getImageRef={this.getImageRef}/>;
        } else {
            return <div className={this.props.chartId}/>;
        }
    }
}
