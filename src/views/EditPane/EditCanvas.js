import React, { Component } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import Scene from '../../models/Scene';
import ImageInfo from '../../models/ImageInfo';
import TextInfo from '../../models/TextInfo';
import './editpane.css';

const demoimage = new ImageInfo(
    "http://localhost:8080/images/man.png",
    100,
    100,
    100,
    100,
    0,
    1,
)
const demotext = new TextInfo(
    "http://localhost:8080/images/man.png",
    100,
    100,
    100,
    100,
    0,
    1,
)
const scene = new Scene([demoimage, demotext], 5);

export default class EditCanvas extends Component {
    state = {
        currentScene: scene
    };
    render() {
        return (
            <div>
                EditCanvas
                <div id="canvasContainer">
                    <Stage width={640} height={360}>
                        <Layer>
                            <TextElement x={this.state.currentScene.elements[1].x} y={this.state.currentScene.elements[1].y} text={this.state.currentScene.elements[1].text} />
                            <ImageElement x={this.state.currentScene.elements[0].x} y={this.state.currentScene.elements[0].y} src={this.state.currentScene.elements[0].src} />
                        </Layer>
                    </Stage>
                </div>
            </div>
        )
    }
}
