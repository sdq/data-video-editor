import React, { Component } from 'react';
import {Icon} from 'antd';

export default class ClipButton extends Component {
    render() {
        return (
            <div style={{cursor:'pointer', position:'absolute',zIndex: 1, width: 12, height: 12,backgroundColor: 'red', marginLeft: this.props.x, marginTop: 11}} onClick={this.props.onClick}>
                <Icon style={{fontSize:8, color:'white', position: 'absolute'}} type="scissor" />
            </div>
        )
    }
}
