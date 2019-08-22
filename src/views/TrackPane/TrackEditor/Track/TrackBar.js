import React, { Component } from 'react';
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

export default class TrackBar extends Component {
    render() {
        let {element} = this.props;
        var color = Color.LIGHT_ORANGE;
        switch (element.type()) {
            case ElementType.IMAGE:
                color = Color.ILLUSTRATION_BAR;
                break;
            case ElementType.CHART:
                color = Color.CHART_BAR;
                break;
            case ElementType.AUDIO:
                color = Color.AUDIO_BAR;
                break;
            case ElementType.TEXT:
                color = Color.TEXT_BAR;
                break;
        
            default:
                break;
        }
        return (
            <div style={{padding: 6}}>
                <div style={{height: 24, width: 900, borderRadius: 3 ,backgroundColor: color}} />
            </div>
        )
    }
}
