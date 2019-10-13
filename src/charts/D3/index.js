import React, { Component } from 'react';
import D3Container from './D3Container';

export default class D3Chart extends Component {
    render() {
        return (
            <D3Container
                type={this.props.type}
                name={this.props.name} 
                data={this.props.data} 
                spec={this.props.spec} 
                width={this.props.width} 
                height={this.props.height} 
                onCanvas={this.props.onCanvas} 
                showAnimation={this.props.showAnimation} 
                animations={this.props.animations} 
                current={this.props.scenePosition}
            />
        )
    }
}