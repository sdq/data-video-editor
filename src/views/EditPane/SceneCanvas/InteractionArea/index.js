import React, { Component } from 'react';
import AnimationTargetArea from './AnimationTargetArea';
import ResourceTargetArea from './ResourceTargetArea';
import AssistLines from './AssistLines';

export default class InteractionArea extends Component {
    render() {
        const { showAnimationTargetArea, showResourceTargetArea, showAssistLines } = this.props;
        return (
            <div style={{position:'absolute', zIndex:1}}>
                {showAnimationTargetArea?<AnimationTargetArea {...this.props}/>:null}
                {showResourceTargetArea?<ResourceTargetArea {...this.props}/>:null}
                {showAssistLines ? <AssistLines /> : null }
            </div>
        )
    }
}
