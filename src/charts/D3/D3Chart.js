import React, { Component } from 'react';
import ChartImage from '../ChartImage';
import canvg from 'canvg';

export default class D3Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specString: '',
            chartImageUrl: '',
        };
        this._animations = [];
    }

    componentDidMount() {
        if (this.props.showAnimation) {
            this.renderAnimation();
        } else {
            this.renderChart();
        }
    }

    componentDidUpdate() {
        if (this.state.specString !== JSON.stringify(this.props.spec)) {
            if (this.props.showAnimation && this.props.spec.animation.length > 0) {
                this.renderAnimation();
            } else {
                this.renderChart();
            }
        }
    }

    renderChart = () => {
        this.cancelAnimation();
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
        this.cancelAnimation();
        this.setState({
            specString: JSON.stringify(this.props.spec),
        });
        const animations = this.props.spec.animation;
        let animationDelay = 0;
        for (let index = 0; index < animations.length; index++) {
            const animation = animations[index];
            this._animations.push(setTimeout(function () {
                this.props.animate(animation, this.props);
            }.bind(this), animationDelay))
            animationDelay += animation.duration;
        }
        // Reset
        // this._animations.push(setTimeout(function () {
        //     this.renderChart();
        // }.bind(this), animationDelay))
    }

    cancelAnimation = () => {
        for (var i = 0; i < this._animations.length; i++) {
            clearTimeout(this._animations[i]);
        }
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
