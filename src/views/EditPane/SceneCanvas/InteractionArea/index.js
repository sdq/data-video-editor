import React, { Component } from 'react';
import AnimationTargetArea from './AnimationTargetArea';
import ResourceTargetArea from './ResourceTargetArea';
import AssistLines from './AssistLines';
import GridLines from './GridLines';
import TextEditor from './TextEditor';

export default class InteractionArea extends Component {
    render() {
        const { showAnimationTargetArea, showResourceTargetArea, showAssistLines, showTextEditor, showGridLines } = this.props;
        return (
            <div style={{position:'absolute', zIndex:1}}>
                {showAnimationTargetArea?<AnimationTargetArea {...this.props}/>:null}
                {showResourceTargetArea?<ResourceTargetArea {...this.props}/>:null}
                {showAssistLines ? <AssistLines /> : null }
                {showGridLines ? <GridLines /> : null }
                {showTextEditor ? <TextEditor {...this.props}/> : null }
            </div>
        )
    }
}
