import React, { Component } from 'react';
import Color from '@/constants/Color';

export default class AssistLines extends Component {


    render() {
        //console.log(this.props)
        const { x, y } = this.props.dragPos;

        return (
            <div style={{ position: 'absolute', zIndex: 1 }}>
                <div style={{ display: Math.abs(x - 400) < 40 ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: Math.abs(y - 225) < 40 ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
                <div style={{ position: 'absolute', zIndex: 1, marginLeft: x - 1 || 0, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ position: 'absolute', zIndex: 2, marginTop: y - 1 || 0, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
            </div>
        )
    }
}
