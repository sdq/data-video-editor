import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import SceneType from '../../constants/SceneType';
import './editpane.css';

export default class EditCanvas extends Component {
    state = {
        currentScene: this.props.currentScene
    };
    render() {
        return (
            <div>
                EditCanvas
                <div id="canvasContainer">
                    <Stage width={640} height={360}>
                        <Layer>
                            {this.state.currentScene.elements.map(function(element, index) {
                                switch (element.type) {
                                    case SceneType.TEXT:
                                        return <TextElement key={index} x={element.info.x} y={element.info.y} text={element.info.text} />
                                    case SceneType.IMAGE:
                                        return <ImageElement key={index} x={element.info.x} y={element.info.y} src={element.info.src} />
                                    default:
                                        return <div></div>;
                                }
                            })}
                        </Layer>
                    </Stage>
                </div>
            </div>
        )
    }
}
