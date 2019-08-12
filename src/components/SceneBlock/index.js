import React, { Component } from 'react';
import Color from '../../constants/Color';
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
    }

    render() {
        return (
            <div className="sceneblock" onClick={this.clickSceneBlock} onDoubleClick={this.dbclickSceneBlock} style={{borderColor: this.props.isSelected?Color.DEEP_ORANGE:Color.GRAY}}>
                {this.props.scene.script}
            </div>
        )
    }
}
