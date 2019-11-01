import React, { Component } from 'react';
import VegaLiteContainer from './VegaLiteContainer';

export default class VegaLite extends Component {
    render() {
        return (
            <VegaLiteContainer
                type={this.props.type}
                name={this.props.name} 
                data={this.props.data} 
                spec={this.props.spec} 
                width={this.props.width} 
                height={this.props.height} 
                onCanvas={this.props.onCanvas} 
                showAnimation={this.props.showAnimation} 
                animations={this.props.animations} 
                current={this.props.current}
                isVideoPerforming = {this.props.isVideoPerforming}
            />
        )
    }
}