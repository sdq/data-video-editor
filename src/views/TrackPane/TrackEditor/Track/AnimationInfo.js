import React, { Component } from 'react';
import {Icon} from 'antd'; 
import './track.css';

export default class AnimationInfo extends Component {

    constructor(props) {
        super(props);
        this.configAnimation = this.configAnimation.bind(this);
        this.deleteAnimation = this.deleteAnimation.bind(this);
    }

    deleteAnimation() {
        // TODO: delete animation
    }

    configAnimation() {
        // TODO: config animation
    }

    render() {
        let {animation} = this.props;
        return (
            <div className="trackinfo" style={{backgroundColor: '#ffffff'}}>
                <p style={{float: 'left', marginLeft: 42, width: 100, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {animation.name()}
                </p>
                <div style={{float: 'right', marginLeft: 8}} onClick={this.deleteAnimation}>
                    <Icon type="delete" />
                </div>
                <div style={{float: 'right', marginLeft: 8}} onClick={this.configAnimation}>
                    <Icon type="setting" />
                </div>
            </div>
        )
    }
}
