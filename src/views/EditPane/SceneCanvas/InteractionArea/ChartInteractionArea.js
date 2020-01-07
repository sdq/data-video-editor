import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

export default class ChartInteractionArea extends Component {
    constructor(props) {
        super(props)
        this.chartInfo = this.props.currentElement && this.props.currentElement.info()
    }

    render() {
        //画布伸缩
        const scale = (this.props.contentHeight - 100) / 450;
        //console.log("this.chartInfo", this.chartInfo)

        if (!this.chartInfo) {
            return null;
        }
        if (!this.chartInfo.src) {
            //console.log("没有src")
            return null;
        }
        return (
            <div style={{ position: 'absolute', zIndex: 1, marginLeft: this.chartInfo.x, marginTop: this.chartInfo.y }}>
                <Player
                    ref={(player) => { this.videoPlayer = player }}
                    fluid={false}
                    width={this.chartInfo && this.chartInfo.width * scale}
                    height={this.chartInfo && this.chartInfo.height * scale}
                    top={this.chartInfo.y * scale}
                    left={this.chartInfo.x * scale}
                    autoPlay
                >
                    <source src={this.chartInfo.src} />
                    <ControlBar disableCompletely={true}></ControlBar>
                </Player>
            </div>
        )
    }
}
