import React, { Component } from 'react';
import {Icon} from 'antd';
import { Rnd } from "react-rnd";
export default class ClipButton extends Component {
    
    render() {
        //console.log("this.props.x...",this.props.x)
        return (
            <Rnd style={{backgroundColor: 'red'}}
            size={{ width: 12,  height: 12 }}
            position={{ x: this.props.x, y: 11 }}
            enableResizing={{
                left: false,
                right: false,
                top:false,
                bottom:false
            }}
            dragAxis={'x'}
            onDragStart={(e,d) => {
                //console.log('onDragStart',e,d)
                this.props.dragStartClipBtn(e.clientX)
            }}
            onDrag={(e,d) => {
                //console.log("onDrag...")
                this.props.dragClipBtn(e.clientX)
            }}
            onDragStop={(e,d) => {
                //console.log("onDragStop...")
                this.props.dragEndClipBtn(e.clientX)
            }}>
            <Icon style={{fontSize:8, color:'white', position: 'absolute'}} type="scissor" />
            </Rnd>
        )
    }
}
