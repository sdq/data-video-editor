import React, { Component } from 'react';
import AnimationTargetArea from './AnimationTargetArea';

export default class InteractionArea extends Component {
    render() {
        const { displayAnimationTargetArea } = this.props;
        return (
            <div style={{position:'absolute', zIndex:2}}>
                {displayAnimationTargetArea?<AnimationTargetArea {...this.props}/>:null}
                
            </div>
        )
    }
}
