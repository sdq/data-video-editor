import React, { Component } from 'react';
import Color from '@/constants/Color';

export default class AssistLines extends Component {
    render() {
        return (
            <div style={{position:'absolute', zIndex:1}}>
                <div style={{position:'absolute', zIndex:1, marginLeft: 400, height:450, width:1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 225, height:3, width:800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed'}} />
            </div>
        )
    }
}
