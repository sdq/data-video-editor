import React, { Component } from 'react';

import AnimationTargetArea from './AnimationTargetArea';
import ResourceTargetArea from './ResourceTargetArea';
// import MusicTargetArea from './MusicTargetArea';
import AssistLines from './AssistLines';
import GridLines from './GridLines';
import TextEditor from './TextEditor';
import GifEditor from './GifAnimator';
import VideoEiditor from './VideoAnimator'
import ChartInteractionArea from './ChartInteractionArea';

export default class InteractionArea extends Component {

    render() {

        const { showAnimationTargetArea, showResourceTargetArea, showAssistLines, showTextEditor, showGridLines, showGifEditor, showVideoEditor, showChartPreview } = this.props;
        return ( 
            <div style={{position:'absolute', zIndex:1}}>
                {showAnimationTargetArea?<AnimationTargetArea {...this.props}/>:null}
                {showResourceTargetArea?<ResourceTargetArea {...this.props}/>:null}
                {/* {showMusicTargetArea?<MusicTargetArea {...this.props}/>:null} */}
                {showAssistLines ? <AssistLines {...this.props}/> : null }
                {/* {showPathAnimator ? <PathAnimator {...this.props}/> : null } */}
                {showGridLines ? <GridLines {...this.props}/> : null }
                {showTextEditor ? <TextEditor {...this.props}/> : null }
                {showGifEditor ? <GifEditor  {...this.props}/> : null }
                {showVideoEditor ? <VideoEiditor {...this.props}/> : null}
                {showChartPreview ? <ChartInteractionArea  {...this.props}/> : null }
            </div>
        )
    }
}
