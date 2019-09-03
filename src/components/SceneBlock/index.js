import React, { Component } from 'react';
import Color from '@/constants/Color';
import CanvasPreview from './CanvasPreview';
import UIMode from '@/constants/UIMode';
import './sceneblock.css';

export default class SceneBlock extends Component {

    constructor(props) {
        super(props);
        this.clickSceneBlock = this.clickSceneBlock.bind(this);
        this.dbclickSceneBlock = this.dbclickSceneBlock.bind(this);
    }

    clickSceneBlock() {
        this.props.unselectElement();
        this.props.selectScene(this.props.index);
    }

    dbclickSceneBlock() {
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
                <div className="canvas-preview">
                    <CanvasPreview {...this.props}/>
                </div>
                <div className="script-preview">
                    {this.props.scene.script()}
                </div>
            </div>
        )
    }
}
