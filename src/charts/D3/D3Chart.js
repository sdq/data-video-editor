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
    }

    componentDidMount() {
        const visSource = this.props.draw(this.props);
        const chartImageUrl = this.getImageUrl(visSource);
        this.setState({
            specString: JSON.stringify(this.props.spec),
            chartImageUrl: chartImageUrl
        })
    }

    componentDidUpdate() {
        if (this.state.specString !== JSON.stringify(this.props.spec)) {
            const visSource = this.props.draw(this.props);
            const chartImageUrl = this.getImageUrl(visSource);
            this.setState({
                specString: JSON.stringify(this.props.spec),
                chartImageUrl: chartImageUrl
            });
        }
    }

    getImageUrl = (source) => {
        var canvas = document.createElement('canvas');
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        source = '<svg>' + source + '</svg>';
        canvg(canvas, source);
        return canvas.toDataURL('image/png');
    }

    render() {
        if (this.props.onCanvas) {
            return <ChartImage name={this.props.name} src={this.state.chartImageUrl} />;
        } else {
            return <div className={this.props.chartId}/>;
        }
    }
}
