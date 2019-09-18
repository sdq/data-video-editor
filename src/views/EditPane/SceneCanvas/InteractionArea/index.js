import React, { Component } from 'react';
import AnimationTargetArea from './AnimationTargetArea';
import ResourceTargetArea from './ResourceTargetArea';
import AssistLines from './AssistLines';
import TextEditor from './TextEditor';

export default class InteractionArea extends Component {
    render() {
        const { showAnimationTargetArea, showResourceTargetArea, showAssistLines, showTextEditor } = this.props;
        return (
            <div style={{position:'absolute', zIndex:1}}>
                {showAnimationTargetArea?<AnimationTargetArea {...this.props}/>:null}
                {showResourceTargetArea?<ResourceTargetArea {...this.props}/>:null}
                {showAssistLines ? <AssistLines /> : null }
                {showTextEditor ? <TextEditor {...this.props}/> : null }
            </div>
        )
    }
}
