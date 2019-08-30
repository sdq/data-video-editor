import React, { Component } from 'react';
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class PlayControlBar extends Component {
    constructor(props) {
        super(props);
        this.videoTimeouts = [];
        this.sceneTimeouts = [];
        this.play = this.play.bind(this);
        this.nextScene = this.nextScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
    };

    play() {
        if (this.props.isPerforming === false) {
            this.props.unselectElement();
            this.props.displayTrackEditor();
            this.props.playVideo();
            var sceneStart = 0;

            for (let index = 0; index < this.props.scenes.length; index++) {
                const sceneDuration = this.props.scenes[index].duration();
                this.videoTimeouts.push(setTimeout(function () {
                    this.props.selectScene(index);
                    this.props.setPosition(0);
                }.bind(this), sceneStart));
                for (let time = 0; time < sceneDuration; time++) {
                    this.sceneTimeouts.push(setTimeout(function () {
                        this.props.setPosition(time);
                    }.bind(this), sceneStart + time*60));
                }
                sceneStart += sceneDuration * 60;
            }
            this.videoTimeouts.push(setTimeout(function () {
                this.props.stopVideo();
            }.bind(this), sceneStart));
        } else {
            this.pause();
        }
    };

    pause() {
        for (var i = 0; i < this.videoTimeouts.length; i++) {
            clearTimeout(this.videoTimeouts[i]);
        }
        for (var j = 0; j < this.sceneTimeouts.length; j++) {
            clearTimeout(this.sceneTimeouts[j]);
        }
        this.props.stopVideo();
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
            <div style = { {textAlign: 'center'} }>
                <ButtonGroup style = { {margin: '10px 0 0 0'}}>
                    <Button icon="step-backward" style = { {padding: '0 20px 0 20px'} } disabled = {isFirstScene || isPerforming} onClick={this.lastScene}/>
                    <Button icon={isVideoPerforming?"pause":"caret-right"} disabled = {this.props.isScenePerforming} onClick={this.play} style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="step-forward" style = { {padding: '0 20px 0 20px'} } disabled = {isLastScene || isPerforming} onClick={this.nextScene}/>
                </ButtonGroup>
            </div>
        )
    }
}
