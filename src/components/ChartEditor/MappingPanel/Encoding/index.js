import React, { Component } from 'react';
import { Divider } from 'antd';
import Shelf from '../Shelf';

export default class Encoding extends Component {
    render() {
        const shelves = [];
        const animationShelves = [];
        for (const channel in this.props.channels) {
            if (this.props.channels[channel].animation) {
                animationShelves.push(<Shelf key={channel} channel={this.props.channels[channel]} dropAvailable={true} {...this.props}/>);
            } else {
                shelves.push(<Shelf key={channel} channel={this.props.channels[channel]} dropAvailable={true} {...this.props}/>);
            }
        }
        return (
            <div style={{marginTop:"25px"}}>
                {shelves}
                <Divider>Animation Channels</Divider>
                {animationShelves}
            </div>
        )
    }
}
