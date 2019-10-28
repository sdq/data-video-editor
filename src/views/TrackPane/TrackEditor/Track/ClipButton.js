import React, { Component } from 'react';
import {Icon} from 'antd';

export default class ClipButton extends Component {
    
    render() {
        return (
            <div style={{cursor:'pointer', position:'absolute',zIndex: 1, width: this.props.clipBtnWidth, height: 12,backgroundColor: 'red', marginLeft: this.props.x, marginTop: 11}} onClick={this.props.onClick}
            draggable={true}
            onDragStart={e => this.props.dragStartClipBtn(e.clientX)}
            onDrag={e => this.props.dragClipBtn(e.clientX)}
            onDragEnd={e => this.props.dragEndClipBtn(e.clientX)}>
            <Icon style={{fontSize:8, color:'white', position: 'absolute'}} type="scissor" />
            </div>
        )
    }
}
