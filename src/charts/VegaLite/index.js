import React, { Component } from 'react';
import VegaLiteContainer from './VegaLiteContainer';

export default class VegaLite extends Component {
    render() {
        return (
            <VegaLiteContainer {...this.props}/>
        )
    }
}