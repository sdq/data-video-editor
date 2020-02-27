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
        this.deleteBackgroundMusic = this.deleteBackgroundMusic.bind(this);
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



    deleteBackgroundMusic(){
        this.props.updateBackgroundMusic(null,'none')
    }

    render() {  
        const { isVideoPerforming, isPerforming, isLastScene, isFirstScene,backgroundMusicName } = this.props;
        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;
    

        //当宽高同时变化，按照最小的scale缩放
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        //获取现在画布的真实大小
        //let fakeWidth = 0;
        let fakeHeight = 0;
        if(scaleX>scaleY){
            //fakeWidth = 800*canvasH/450;
            fakeHeight = canvasH;
        }else {
            //fakeWidth = canvasW;
            fakeHeight = canvasW*450/800;
        }
        var margin =(canvasH-fakeHeight)/2;
    
        return (
            <div id='playcontrol' style = { { background: Color.LIGHT_ORANGE,marginTop:margin,zIndex:2} }>
            {/* <div id='playcontrol' style = { { background: Color.LIGHT_ORANGE,marginTop:margin,position:"relative"} }> */}
                <Button icon="delete" type="link" style = { {float:"left",margin:"10px 0px 10px 12px"} }  onClick={this.deleteBackgroundMusic}/> 
                <p style = { {float:"left",paddingTop:"15px",marginLeft:"10px",textAlign:"left",zIndex:5} }>Music: {backgroundMusicName}</p>  
                <div style = { {textAlign:"center",paddingRight: '90px'}}>
                <ButtonGroup style = { {textAlign:"center",paddingTop:"10px",width:"180px",zIndex:2}}>
                    <Button icon="step-backward" style = { {paddingRight: '20px',paddingLeft:"20px"} } disabled = {isFirstScene || isPerforming} onClick={this.lastScene}/>
                    <Button icon={isPerforming?"pause":"caret-right"} disabled = {isVideoPerforming} onClick={this.playScene} style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="step-forward" style = { {padding: '0 20px 0 20px'} } disabled = {isLastScene || isPerforming} onClick={this.nextScene}/>
                </ButtonGroup>
                </div>
            </div>
        )
    }
}
