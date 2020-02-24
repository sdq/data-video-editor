import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

export default class VideoAnimator extends Component {
    constructor(props) {
        super(props);
        this.videoPlayer = {};
        this._videoInfo = this.props.currentElement && this.props.currentElement.info();
    }

    componentDidMount() {
        //console.log("this.videoPlayer ", this.videoPlayer)
        // subscribe state change
        //this.videoPlayer.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
       //console.log("handleStateChange",state,prevState)
    }

    render() {
        //画布伸缩
        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        const scale = scaleX>scaleY?scaleY:scaleX;

        if (!this._videoInfo) {
            return null;
        }
        const  rotation = this.props.currentElement?this.props.currentElement.info().rotation:0;

        return (
            <div style={{
                marginLeft:this._videoInfo && this._videoInfo.x*scale,
                marginTop:this._videoInfo && this._videoInfo.y*scale,
                transformOrigin:"left top",
                transform:"rotate("+rotation+"deg)",
                }} >
                <Player
                     ref={(player) => { this.videoPlayer = player }}
                     fluid={false}
                     width={ this._videoInfo && this._videoInfo.width*scale }
                     height={ this._videoInfo && this._videoInfo.height*scale }  
                    autoPlay
                >
                    <source src={this._videoInfo.src} />
                    <ControlBar disableCompletely={true}></ControlBar>
                </Player>
            </div>
        )
    }
}
