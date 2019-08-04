import React, { Component } from 'react';
import {Button, Row} from 'antd';

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
            <Row>
                <Button icon="step-backward" />
                <Button icon={this.state.isPlaying?"pause":"caret-right"} onClick={this.play}/>
                <Button icon="step-forward" />
            </Row>
        )
    }
}
