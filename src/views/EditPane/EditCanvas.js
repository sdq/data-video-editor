import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import Scene from '../../models/Scene';
import { Element, ImageInfo, TextInfo} from '../../models/Element';
import SceneType from '../../constants/SceneType';
import './editpane.css';

const demoimage = new ImageInfo(
    "http://localhost:8080/images/man.png",
    100,
    100,
    100,
    100,
    0,
)
const demotext = new TextInfo(
    "http://localhost:8080/images/man.png",
    100,
    100,
)
const element1 = new Element(SceneType.IMAGE, demoimage);
const element2 = new Element(SceneType.TEXT, demotext);
const scene = new Scene([element1, element2], 5);

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
