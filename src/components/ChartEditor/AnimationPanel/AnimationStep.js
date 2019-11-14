import React, { Component } from 'react';

export default class AnimationStep extends Component {

    render() {
        return (
            <div className={'animation-step'}>
                {this.props.animation.type}
            </div>
        )
    }
}
