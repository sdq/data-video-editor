import React, { Component } from 'react';
import { Icon } from 'antd';
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';
import './track.css';

export default class TrackInfo extends Component {

    constructor(props) {
        super(props);
        this.showAnimations = this.showAnimations.bind(this);
    }

    showAnimations() {
        console.log("showAnimation");
    }

    render() {
        let {element} = this.props;
        var icon;
        var name = '';
        switch (element.type()) {
            case ElementType.IMAGE:
                name = element.info().name;
                icon = <Icon type="picture" style={{color: Color.ILLUSTRATION_BAR}}/>;
                break;
            case ElementType.CHART:
                name = element.info().type;
                icon = <Icon type="line-chart" style={{color: Color.CHART_BAR}}/>;
                break;
            case ElementType.AUDIO:
                name = element.info().name;
                icon = <Icon type="sound" style={{color: Color.AUDIO_BAR}}/>;
                break;
            case ElementType.TEXT:
                name = element.info().text;
                icon = <Icon type="font-size" style={{color: Color.TEXT_BAR}}/>;
                break;
        
            default:
                break;
        }
        return (
            <div className="trackinfo" style={{backgroundColor: this.props.isSelected?Color.CLEAR_BLUE:'#ffffff'}}>
                <div style={{float: 'left'}}>
                    {icon}
                </div>
                <div onClick={this.showAnimations} style={{float: 'left', marginLeft: 8}}>
                    <Icon type="caret-right" />
                </div>
                <p style={{float: 'left', marginLeft: 8, width: 140, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {name}
                </p>
            </div>
        )
    }
}
