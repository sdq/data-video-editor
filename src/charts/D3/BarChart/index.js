import React, { Component } from 'react';
import { Image } from 'react-konva';
import canvg from 'canvg';
import draw from './vis';

export default class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartImage: null,
        };
    }

    componentDidMount() {
        const visSource = draw(this.props);
        if (this.props.onCanvas) {
            this.chartImage = new window.Image();
            this.chartImage.src = this.getImageUrl(visSource);
            this.chartImage.addEventListener('load', this.handleLoad);
        }
    }

    componentDidUpdate(preProps) {
        if (preProps.spec !== this.props.spec) {
            const chartImageUrl = draw(this.props);
            this.chartImage = new window.Image();
            this.chartImage.src = chartImageUrl;
            this.chartImage.addEventListener('load', this.handleLoad);
        }
    }

    handleLoad = () => {
        this.setState({
            chartImage: this.chartImage
        });
    };

    getImageUrl = (source) => {
        var canvas = document.createElement('canvas');
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        canvg(canvas, source);
        return canvas.toDataURL('image/png');
    }

    render() {
        if (this.props.onCanvas) {
            return  <Image 
                        ref={node=>this.imageref=node}
                        name={this.props.name}
                        image={this.state.chartImage} 
                    />
        } else {
            return <div className='vis-barchart'/>;
        }
    }
}
