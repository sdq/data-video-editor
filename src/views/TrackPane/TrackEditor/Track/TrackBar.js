import React, { Component } from 'react';
import Color from '@/constants/Color';

export default class TrackBar extends Component {
    render() {
        return (
            <div style={{padding: 6}}>
                <div style={{height: 24, width: 900, borderRadius: 3 ,backgroundColor: Color.LIGHT_ORANGE}} />
            </div>
        )
    }
}
