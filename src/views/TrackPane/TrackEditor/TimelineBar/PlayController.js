import React, { Component } from 'react';
import { Icon } from 'antd';
import './timelinebar.css';

export default class PlayController extends Component {

    constructor(props) {
        super(props);
        this.timeouts = [];
        this.playScene = this.playScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
        this.nextScene = this.nextScene.bind(this);
    }

    playScene() {
        if (this.props.isPerforming === false) {
            // play
            this.props.unselectElement();
            this.props.playScene(this.props.sceneIndex);
            const current = this.props.scenePosition;
            const end = this.props.currentScene.duration();
            const n = (end - current) + 1;
            for (let index = 0; index < n; index++) {
                this.timeouts.push(setTimeout(function () {
                    this.props.setPosition(current+index);
                    if (index===(n-1)) {
                        this.props.stopScene(this.props.sceneIndex);
                        this.props.setPosition(0);
                    }
                }.bind(this), index*60));
            }
        } else {
            // pause
            this.pauseScene();
            this.props.stopScene(this.props.sceneIndex);
        }
    }

    pauseScene() {
        this.props.setBarUnactive();
        this.setState({
            isPerforming: false
        });
        for (var i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
    }

    nextScene() {
        this.props.setBarUnactive();
        if (this.props.sceneIndex === this.props.scenes.length-1) {
            return
        }
        this.pauseScene();
        this.props.stopScene(this.props.sceneIndex);
        this.props.selectScene(this.props.sceneIndex+1);
        this.props.setPosition(0);
    }

    lastScene() {
        if (this.props.sceneIndex === 0) {
            return
        }
        this.pauseScene();
        this.props.stopScene(this.props.sceneIndex);
        this.props.selectScene(this.props.sceneIndex-1);
        this.props.setPosition(0);
    }

    ms2time(ms) {
        var minutes   = Math.floor(ms / 60000);
        var seconds = Math.floor((ms - (minutes * 60000)) / 1000);
        var milliseconds = ms - (minutes * 60000) - (seconds * 1000);

        if (minutes >= 100) {minutes = minutes%100;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        if (milliseconds < 10) {milliseconds = "00"+milliseconds;}
        else if (milliseconds < 100) {milliseconds = "0"+milliseconds;}
        return minutes+':'+seconds+'.'+milliseconds;
    }

    render() {
        const {scenePosition, isPerforming} = this.props;
        // TODO: time
        const ms = scenePosition * 60;
        return (
            <div className="play-controller">
                <div style={{height: 34, width: 60, float: 'left', backgroundColor: 'black' }} onClick={this.playScene}>
                    <Icon type={isPerforming?'pause':'caret-right'} style={{color: 'white', fontSize: 20, marginTop: 7, marginLeft:22}}/>
                </div>
                <div style={{height: 34, width: 32, float: 'left', backgroundColor: 'white' }} onClick={this.lastScene}>
                    <Icon type={'step-backward'} style={{color: 'black', fontSize: 20, marginTop: 7, marginLeft:6}}/>
                </div>
                <div style={{height: 34, width: 76, float: 'left', backgroundColor: 'white', textAlign: 'center', paddingTop: 6 }}>{this.ms2time(ms)}</div>
                <div style={{height: 34, width: 32, float: 'left', backgroundColor: 'white' }} onClick={this.nextScene}>
                    <Icon type={'step-forward'} style={{color: 'black', fontSize: 20, marginTop: 7, marginLeft:6}}/>
                </div>
            </div>
        )
    }
}
