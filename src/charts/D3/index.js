import React, { Component } from 'react';
import D3Container from './D3Container';

export default class D3Chart extends Component {
    render() {
        return (
            <D3Container
                {...this.props}
            />
        )
    }
}