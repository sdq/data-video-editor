import React, { Component } from 'react';

export default class GifAnimator extends Component {
    constructor(props) {
        super(props);
        this._gifInfo =this.props.currentElement && this.props.currentElement.info();
    }

    render() {
        //画布伸缩
        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        const scale = scaleX>scaleY?scaleY:scaleX;
        const  rotation = this.props.currentElement?this.props.currentElement.info().rotation:0;
        if(!this._gifInfo) return null;
        return (
            <img
                style={{
                    width: this._gifInfo.width*scale,
                    height: this._gifInfo.height*scale,
                    position: 'relative',
                    zIndex: 1,
                    top: this._gifInfo.y*scale,
                    left: this._gifInfo.x*scale,
                    transformOrigin:"left top",
                    transform:"rotate("+rotation+"deg)",
                    overflow:"hidden",
                }}
                src={this._gifInfo.src}
                alt={this._gifInfo.name}>
            </img>
        )
    }
}
