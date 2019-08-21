import React, { Component } from 'react';
import { Icon } from 'antd';
import Color from '@/constants/Color';
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
        return (
            <div className="trackinfo">
                <div style={{float: 'left'}}>
                    <Icon type="picture" style={{color: Color.ORANGE}}/>
                </div>
                <div onClick={this.showAnimations} style={{float: 'left', marginLeft: 8}}>
                    <Icon type="caret-right" />
                </div>
                <p style={{float: 'left', marginLeft: 8}}>text</p>
            </div>
        )
    }
}
