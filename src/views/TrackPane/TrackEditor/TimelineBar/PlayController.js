import React, { Component } from 'react';
import { Icon } from 'antd';
import './timelinebar.css';

export default class PlayController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPerforming: false
        }
        this.playScene = this.playScene.bind(this);
    }

    playScene() {
        this.setState({
            isPerforming: !this.state.isPerforming
        })
    }

    render() {
        const {isPerforming} = this.state;
        return (
            <div className="play-controller">
                <div style={{height: 34, width: 80, float: 'left', backgroundColor: 'black' }} onClick={this.playScene}>
                    <Icon type={isPerforming?'pause':'caret-right'} style={{color: 'white', fontSize: 20, marginTop: 7, marginLeft:32}}/>
                </div>
            </div>
        )
    }
}
