import React, { Component } from 'react';
import Shelf from '../Shelf';

export default class Encoding extends Component {
    render() {
        return (
            <div style={{marginTop:"25px"}}>
                <Shelf channel="x" slot={this.props.slots.x} dropAvailable={true} {...this.props}/>
                <Shelf channel="y" slot={this.props.slots.y} dropAvailable={true} {...this.props}/>
            </div>
        )
    }
}
