import React, { Component } from 'react';
import Color from '../../constants/Color';
import { Stage, Layer } from 'react-konva';
import ImageElement from '../../components/Elements/ImageElement';
import TextElement from '../../components/Elements/TextElement';
import ChartElement from '../../components/Elements/ChartElement';
import ElementType from '../../constants/ElementType';
import UIMode from '../../constants/UIMode';
import './sceneblock.css';

export default class SceneBlock extends Component {

    constructor(props) {
        super(props);
        this.clickSceneBlock = this.clickSceneBlock.bind(this);
        this.dbclickSceneBlock = this.dbclickSceneBlock.bind(this);
    }

    clickSceneBlock() {
        this.props.selectScene(this.props.index);
    }

    dbclickSceneBlock() {
        console.log("double click!"+this.props.index);
        this.props.selectScene(this.props.index);
        if (this.props.uimode === UIMode.STORYLINE_MODE) {
            this.props.displayTrackEditor();
        } else {
            this.props.displayStoryline();
        }
    }

    render() {
        return (
            <div className="sceneblock" onClick={this.clickSceneBlock} onDoubleClick={this.dbclickSceneBlock} style={{borderColor: this.props.isSelected?Color.DEEP_ORANGE:Color.GRAY}}>
                <div className="canvasPreview">
                    <Stage width={192} height={108} scale={{x: 192/800, y:192/800}}>
                        <Layer>
                            {this.props.scene.elements.map(function(element, index) {
                                console.log(element.info());
                                switch (element.type()) {
                                    case ElementType.TEXT:
                                        return <TextElement key={this.props.sceneIndex+"-"+index} element={element} name={this.props.sceneIndex+"-"+index} draggable = {false}/>
                                    case ElementType.IMAGE:
                                        return <ImageElement key={this.props.sceneIndex+"-"+index} element={element} name={this.props.sceneIndex+"-"+index} draggable = {false}/>
                                    case ElementType.CHART:
                                        return <ChartElement key={this.props.sceneIndex+"-"+index} element={element} name={this.props.sceneIndex+"-"+index} draggable = {false}/>
                                    default:
                                        //TODO: remove
                                        console.log("wrong!!!!!!!");
                                        console.log(this.props.currentScene.elements);
                                        console.log(element);
                                        return;
                                }
                            }.bind(this))}
                        </Layer>
                    </Stage>
                </div>
                <div className="scriptPreview">
                    {this.props.scene.script()}
                </div>
            </div>
        )
    }
}
