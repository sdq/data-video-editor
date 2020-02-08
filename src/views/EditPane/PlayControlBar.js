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
        this.state = {
            backgroundMusic : "none",
            backgroundMusicID: "",
        }
        this.playScene = this.playScene.bind(this);
        this.nextScene = this.nextScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
        this.deleteBackgroundMusic = this.deleteBackgroundMusic.bind(this);
    };

    playScene() {
        this.props.unselectElement();
        this.props.displayTrackEditor();
        if (this.props.isPerforming === false) {
            player.playScene(this.state.backgroundMusicID);
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


    componentWillReceiveProps(){
        this.setState({
            backgroundMusic:this.props.scenes[0].backgroundMusic(),
        })
        for(let i = 0;i<this.props.scenes[0].elements().length;i++){ 
            if(this.props.scenes[0].elements()[i].info().name === this.props.scenes[0].backgroundMusic())
            {
                this.setState({
                    backgroundMusicID:this.props.scenes[0].elements()[i].id(),
                })
            }
        }
    }

    deleteBackgroundMusic(){
        this.setState({
            backgroundMusic:"none",
        })
        for(let i = 0;i<this.props.scenes[0].elements().length;i++){ //element删除
            if(this.props.scenes[0].elements()[i].info().name === this.props.scenes[0].backgroundMusic())
            {
                this.props.scenes[0].elements().splice(i, 1);
                this.props.updateScene(0, this.props.scenes[0]);
            }
        }
        this.props.scenes[0].backgroundMusic("none");//name置空
    }



    render() {  
        const { isVideoPerforming, isPerforming, isLastScene, isFirstScene } = this.props;

        return (
            <div id='playcontrol' style = { { background: Color.LIGHT_ORANGE} }>
                <div className='bgMusicWrapper'>
                <Button icon="delete" type="link" style = { {float:"left",margin:"10px 0px 10px 12px"} }  onClick={this.deleteBackgroundMusic}/> 
                <p style = { {float:"left",paddingTop:"15px",marginLeft:"10px",textAlign:"left",zIndex:5} }>Music: {this.state.backgroundMusic}</p>  
                <div style = { {textAlign:"center",paddingRight: '90px'}}>
                </div>
                </div>
                <ButtonGroup style = { {textAlign:"center",
                // paddingTop:"10px",
                width:"180px",zIndex:2}}>
                    <Button icon="step-backward" style = { {paddingRight: '20px',paddingLeft:"20px"} } disabled = {isFirstScene || isPerforming} onClick={this.lastScene}/>
                    <Button icon={isPerforming?"pause":"caret-right"} disabled = {isVideoPerforming} onClick={this.playScene} style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="step-forward" style = { {padding: '0 20px 0 20px'} } disabled = {isLastScene || isPerforming} onClick={this.nextScene}/>
                </ButtonGroup>
            </div>
        )
    }
}
