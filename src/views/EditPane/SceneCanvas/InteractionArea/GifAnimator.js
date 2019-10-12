import React, { Component } from 'react';

export default class GifAnimator extends Component {
    constructor(props) {
        super(props);
        this._gifInfo =this.props.currentElement && this.props.currentElement._info;
    }

    render() {

        return (
            <img
                style={{
                    width: this._gifInfo.width,
                    height: this._gifInfo.height,
                    position: 'relative',
                    zIndex: 1,
                    top: this._gifInfo.y,
                    left: this._gifInfo.x,
                }}
                src={this._gifInfo.src}
                alt={this._gifInfo.name}>
            </img>
        )
    }
}
