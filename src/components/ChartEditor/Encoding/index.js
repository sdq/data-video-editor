import React, { Component } from 'react';
import Shelf from '../Shelf';

export default class Encoding extends Component {
    render() {
        return (
            <div style={{marginTop:"25px"}}>
                <Shelf channel={this.props.channels.x} dropAvailable={true} {...this.props}/>
                <Shelf channel={this.props.channels.y} dropAvailable={true} {...this.props}/>
            </div>
        )
    }
}
