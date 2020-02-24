import React, { Component } from 'react';
import { message } from 'antd';

export default class ChartInteractionArea extends Component {
    constructor(props) {
        super(props)
        this.chartInfo = this.props.currentElement && this.props.currentElement.info()
    }
    componentWillMount(){
        if (!this.chartInfo.src) {
            //提示用户去图表editor-animation-保存动画
            message.info("please set Animation Plan in Chart Editor first !")
        }
    }
 
    render() {
        //画布伸缩
        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        const scale = scaleX>scaleY?scaleY:scaleX;
        if (!this.chartInfo) {
            return null;
        }
        const  rotation = this.props.currentElement?this.props.currentElement.info().rotation:0;

        return (
               <video
               style={{
                    position: 'absolute', 
                    zIndex: 1,
                    marginTop: this.chartInfo.y * scale,
                    marginLeft: this.chartInfo.x * scale, 
                    transformOrigin:"left top",
                    transform:"rotate("+rotation+"deg)",
                    width:this.chartInfo && this.chartInfo.width * scale,
                    height:this.chartInfo && this.chartInfo.height * scale, 
                  }}
                  autoPlay
                >
                    <source src={this.chartInfo.src} />
                </video>

        )
    }
}
