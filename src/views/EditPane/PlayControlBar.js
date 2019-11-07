import React, { Component } from 'react';
import Player from '@/player';
import Color from '@/constants/Color';
import {Button} from 'antd';
import './editpane.css';

const player = new Player();
const ButtonGroup = Button.Group;

export default class PlayControlBar extends Component {
    constructor(props) {
        super(props);
        this.playScene = this.playScene.bind(this);
        this.nextScene = this.nextScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
    };

    playScene() {
        this.props.unselectElement();
        this.props.displayTrackEditor();
        if (this.props.isPerforming === false) {
            player.playScene();
        } else {
            player.pauseScene();
        }
    };

    pause() {
        player.pauseScene();
    }

    nextScene() {
        if (this.props.sceneIndex === this.props.scenes.length-1) {
            return
        }
        this.props.selectScene(this.props.sceneIndex+1)
    }

    lastScene() {
        if (this.props.sceneIndex === 0) {
            return
        }
        this.props.selectScene(this.props.sceneIndex-1)
    }

    render() {
        const { isVideoPerforming, isPerforming, isLastScene, isFirstScene } = this.props;
        return (
            <div id='playcontrol' style = { { background: Color.LIGHT_ORANGE} }>
                <ButtonGroup style = { {margin: '10px 0 0 0'}}>
                    <Button icon="step-backward" style = { {padding: '0 20px 0 20px'} } disabled = {isFirstScene || isPerforming} onClick={this.lastScene}/>
                    <Button icon={isPerforming?"pause":"caret-right"} disabled = {isVideoPerforming} onClick={this.playScene} style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="step-forward" style = { {padding: '0 20px 0 20px'} } disabled = {isLastScene || isPerforming} onClick={this.nextScene}/>
                </ButtonGroup>
            </div>
        )
    }
}
