import React, { Component } from 'react';
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class PlayControlBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
        };
        this.play = this.play.bind(this);
        this.nextScene = this.nextScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
    };

    play() {
        if (this.state.isPlaying === false) {
            this.setState({
                isPlaying: true
            });
            this.props.playVideo();

            for (let index = 0; index < this.props.scenes.length; index++) {
                setTimeout(function () {
                    this.props.selectScene(index);
                    if (index===this.props.scenes.length-1) {
                        this.setState({
                            isPlaying: false
                        });
                        this.props.stopVideo();
                    }
                }.bind(this), index*1000);
            }
        }
    };

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
        return (
            <div style = { {textAlign: 'center'} }>
                <ButtonGroup style = { {margin: '10px 0 0 0'}}>
                    <Button icon="step-backward" style = { {padding: '0 20px 0 20px'} } disabled = {this.props.sceneIndex === 0} onClick={this.lastScene}/>
                    <Button icon={this.state.isPlaying?"pause":"caret-right"} onClick={this.play} style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="step-forward" style = { {padding: '0 20px 0 20px'} } disabled = {this.props.sceneIndex === this.props.scenes.length-1} onClick={this.nextScene}/>
                </ButtonGroup>
            </div>
        )
    }
}
