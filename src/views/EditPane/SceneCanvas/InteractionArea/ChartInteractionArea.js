import React, { Component } from 'react';
import { message } from 'antd';

export default class ChartInteractionArea extends Component {
    constructor(props) {
        super(props)
        this.chartInfo = this.props.currentElement && this.props.currentElement.info()
    }

    render() {
        //画布伸缩
        const scale = (this.props.contentHeight - 100) / 450;
        if (!this.chartInfo) {
            return null;
        }
        if (!this.chartInfo.src) {
            //提示用户去图表editor-animation-保存动画
            message.info("please set Animation Plan in Chart Editor first !")
            return null;
        }
        return (
            <div style={{ position: 'absolute', zIndex: 1, marginLeft: this.chartInfo.x * scale, marginTop: this.chartInfo.y * scale }}>
                <video
                    width={this.chartInfo && this.chartInfo.width * scale}
                    height={this.chartInfo && this.chartInfo.height * scale}
                    autoPlay
                >
                    <source src={this.chartInfo.src} />
                </video>
            </div>
        )
    }
}
