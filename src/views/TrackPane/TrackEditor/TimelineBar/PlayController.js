import React, { Component } from 'react';
import Player from '@/player';
import { Icon } from 'antd';
import './timelinebar.css';

const player = new Player();

export default class PlayController extends Component {

    constructor(props) {
        super(props);
        this.playScene = this.playScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
        this.nextScene = this.nextScene.bind(this);
    }

    playScene() {
        this.props.setBarUnactive();
        this.props.unselectElement();
        
        if (this.props.isPerforming === false) {
            player.playScene();
        } else {
            player.pauseScene();
        }
    }

    pauseScene() {
        this.props.setBarUnactive();
        player.pauseScene();
    }

    nextScene() {
        this.props.setBarUnactive();
        if (this.props.isLastScene) {
            return
        }
        this.pauseScene();
        this.props.stopScene(this.props.sceneIndex);
        this.props.selectScene(this.props.sceneIndex+1);
        this.props.setPosition(0);
    }

    lastScene() {
        if (this.props.isFirstScene) {
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
        var milliseconds = Math.round(ms - (minutes * 60000) - (seconds * 1000));

        if (minutes >= 100) {minutes = minutes%100;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        milliseconds = milliseconds / 100;
        // if (milliseconds < 10) {milliseconds = "00"+milliseconds;}
        // else if (milliseconds < 100) {milliseconds = "0"+milliseconds;}
        return minutes+':'+seconds+'.'+milliseconds;
    }

    render() {
        const {scenePosition, isScenePerforming, isVideoPerforming, isFirstScene, isLastScene} = this.props;
        // TODO: time
        const ms = scenePosition * 1000;
        //console.log(scenePosition);
        return (
            <div className="play-controller">
                <div style={{height: 23, width: 60, float: 'left', backgroundColor: 'black', opacity: isVideoPerforming?0.6:1 }} onClick={isVideoPerforming?null:this.playScene}>
                    <Icon type={isScenePerforming?'pause':'caret-right'} style={{color: 'white', fontSize: 20, marginTop: 2, marginLeft:22}}/>
                </div>

                <div style={{height: 23, width: 32, float: 'left', backgroundColor: 'white' }} onClick={(isFirstScene || isVideoPerforming)?null:this.lastScene}>
                    <Icon type={'step-backward'} style={{color: (isFirstScene || isVideoPerforming)?'lightgray':'black', fontSize: 20, marginTop: 2, marginLeft:6}}/>
                </div>
                
                <div style={{height: 23, width: 76, float: 'left', backgroundColor: 'white', textAlign: 'center', paddingTop: 1 }}>{this.ms2time(ms)}</div>

                <div style={{height: 23, width: 32, float: 'left', backgroundColor: 'white' }} onClick={(isLastScene || isVideoPerforming)?null:this.nextScene}>
                    <Icon type={'step-forward'} style={{color: (isLastScene || isVideoPerforming)?'lightgray':'black', fontSize: 20, marginTop: 2, marginLeft:6}}/>
                </div>
            </div>
        )
    }
}
