import React, { Component } from 'react';
import { Icon } from 'antd';
import './timelinebar.css';

export default class PlayController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPerforming: false
        };
        this.timeouts = [];
        this.playScene = this.playScene.bind(this);
        this.lastScene = this.lastScene.bind(this);
        this.nextScene = this.nextScene.bind(this);
    }

    playScene() {
        if (this.state.isPerforming === false) {
            // play
            this.setState({
                isPerforming: true
            })
            const current = this.props.scenePosition;
            const end = this.props.currentScene.duration();
            const n = (end - current) + 1;
            for (let index = 0; index < n; index++) {
                this.timeouts.push(setTimeout(function () {
                    this.props.setPosition(current+index);
                    if (index===(n-1)) {
                        this.setState({
                            isPerforming: false
                        });
                        this.props.setPosition(0);
                    }
                }.bind(this), index*60));
            }
        } else {
            // pause
            this.pauseScene();
        }
    }

    pauseScene() {
        this.setState({
            isPerforming: false
        });
        for (var i = 0; i < this.timeouts.length; i++) {
            clearTimeout(this.timeouts[i]);
        }
    }

    nextScene() {
        if (this.props.sceneIndex === this.props.scenes.length-1) {
            return
        }
        this.pauseScene();
        this.props.selectScene(this.props.sceneIndex+1);
        this.props.setPosition(0);
    }

    lastScene() {
        if (this.props.sceneIndex === 0) {
            return
        }
        this.pauseScene();
        this.props.selectScene(this.props.sceneIndex-1);
        this.props.setPosition(0);
    }

    render() {
        const {isPerforming} = this.state;
        return (
            <div className="play-controller">
                <div style={{height: 34, width: 60, float: 'left', backgroundColor: 'black' }} onClick={this.playScene}>
                    <Icon type={isPerforming?'pause':'caret-right'} style={{color: 'white', fontSize: 20, marginTop: 7, marginLeft:22}}/>
                </div>
                <div style={{height: 34, width: 38, float: 'left', backgroundColor: 'white' }} onClick={this.lastScene}>
                    <Icon type={'step-backward'} style={{color: 'black', fontSize: 20, marginTop: 7, marginLeft:9}}/>
                </div>
                <div style={{height: 34, width: 64, float: 'left', backgroundColor: 'white', textAlign: 'center', paddingTop: 6 }}>00:00:00</div>
                <div style={{height: 34, width: 38, float: 'left', backgroundColor: 'white' }} onClick={this.nextScene}>
                    <Icon type={'step-forward'} style={{color: 'black', fontSize: 20, marginTop: 7, marginLeft:9}}/>
                </div>
            </div>
        )
    }
}
