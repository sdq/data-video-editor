import React, { Component } from 'react';
import {Button, Row} from 'antd';

const ButtonGroup = Button.Group;

export default class PlayControlBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
        };
        this.play = this.play.bind(this);
    }

    play() {
        var newState = !this.state.isPlaying;
        this.setState({
            isPlaying: newState
        });
    }

    render() {
        return (
            <div style = { {textAlign: 'center'} }>
                <ButtonGroup style = { {margin: '10px 0 0 0'}}>
                    <Button icon="step-backward" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon={this.state.isPlaying?"pause":"caret-right"} onClick={this.play} style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="step-forward" style = { {padding: '0 20px 0 20px'} }/>
                </ButtonGroup>
            </div>
        )
    }
}
