import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import SceneType from '../../constants/SceneType';
import './editpane.css';

export default class EditCanvas extends Component {

    constructor(props) {
        super(props);
        this.editElement = this.editElement.bind(this);
    }

    editElement(eleIndex, element) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements[eleIndex] = element;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    render() {
        return (
            <div>
                EditCanvas
                <div id="canvasContainer">
                    <Stage width={640} height={360}>
                        <Layer>
                            {this.props.currentScene.elements.map(function(element, index) {
                                switch (element.type) {
                                    case SceneType.TEXT:
                                        return <TextElement key={index} edit={ele => this.editElement(index, ele)} element={element}/>
                                    case SceneType.IMAGE:
                                        return <ImageElement key={index} edit={ele => this.editElement(index, ele)} element={element}/>
                                    default:
                                        return <div></div>;
                                }
                            }.bind(this))}
                        </Layer>
                    </Stage>
                </div>
            </div>
        )
    }
}
