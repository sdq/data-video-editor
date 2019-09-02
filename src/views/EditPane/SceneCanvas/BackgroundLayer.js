import React, { Component } from 'react';
import { Layer, Rect } from 'react-konva';
import Color from '@/constants/Color';

export default class BackgroundLayer extends Component {
    render() {
        const { currentScene } = this.props;
        return (
            <Layer 
                ref={node => (this.backgroundLayer = node)}
            >
                <Rect
                    x={0}
                    y={0}
                    width={800}
                    height={450}
                    fill={currentScene.backgroundColor()}
                />
            </Layer>
        )
    }
}
