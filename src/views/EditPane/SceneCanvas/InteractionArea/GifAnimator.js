import React, { Component } from 'react';

export default class GifAnimator extends Component {
    constructor(props) {
        super(props);
        this._gifInfo =this.props.currentElement && this.props.currentElement.info();
    }

    render() {
        //画布伸缩
        //const scale = (this.props.contentHeight-100)/450;

        if(!this._gifInfo) return null;
        return (
            <img
                style={{
                    // width: this._gifInfo.width*scale,
                    // height: this._gifInfo.height*scale,
                    width:this._gifInfo.width,
                    height: this._gifInfo.height,
                    position: 'relative',
                    zIndex: 1,
                    // top: this._gifInfo.y*scale,
                    // left: this._gifInfo.x*scale,
                }}
                src={this._gifInfo.src}
                alt={this._gifInfo.name}>
            </img>
        )
    }
}
