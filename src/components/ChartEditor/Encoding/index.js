import React, { Component } from 'react';
import Shelf from '../Shelf';

export default class Encoding extends Component {
    render() {
        const shelves = [];
        for (const channel in this.props.channels) {
            shelves.push(<Shelf key={channel} channel={this.props.channels[channel]} dropAvailable={true} {...this.props}/>);
        }
        return (
            <div style={{marginTop:"25px"}}>
                {shelves}
            </div>
        )
    }
}
