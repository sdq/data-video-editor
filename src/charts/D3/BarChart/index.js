import React, { Component } from 'react';
import { Image } from 'react-konva';
import draw from './vis';

export default class BarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartImage: null,
        };
    }

    componentDidMount() {
        const chartImageUrl = draw(this.props);
        this.chartImage = new window.Image();
        this.chartImage.src = chartImageUrl;
        this.chartImage.addEventListener('load', this.handleLoad);
    }

    componentDidUpdate(preProps) {
        const chartImageUrl = draw(this.props);
        this.chartImage = new window.Image();
        this.chartImage.src = chartImageUrl;
        this.chartImage.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setState({
            chartImage: this.chartImage
        });
    };

    render() {
        if (this.props.onCanvas) {
            return <Image 
                        ref={node=>this.imageref=node}
                        name={'d3 chart'}
                        image={this.state.chartImage} 
                    />
        } else {
            return (
                <div className='vis-barchart'/>
            )
        }
    }
}
