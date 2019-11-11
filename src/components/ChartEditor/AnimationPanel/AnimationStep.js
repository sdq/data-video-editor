import React, { Component } from 'react';
import {Button} from 'antd';

export default class AnimationStep extends Component {

    removeAnimation = () => {
        this.props.removeChartAnimation(this.props.index)
    }

    render() {
        return (
            <div className={'animation-step'}>
                {this.props.animation.type}
                <div style={{ float: 'right'}}>
                    <Button shape="circle" type="link" size="small" icon="close" onClick={this.removeAnimation}/>
                </div>
            </div>
        )
    }
}
