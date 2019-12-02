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
        const scale = (this.props.contentHeight-100)/450;
        //console.log("this._videoInfo", this._videoInfo)

        if (!this._videoInfo) {
            return null;
        }

        return (
            <div style={{marginLeft:this._videoInfo && this._videoInfo.x*scale,marginTop:this._videoInfo && this._videoInfo.y*scale}} >
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
