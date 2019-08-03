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
                <Button type="link" size="large" icon="step-backward" />
                <Button type="link" size="large" icon={this.state.isPlaying?"pause-circle":"play-circle"} onClick={this.play}/>
                <Button type="link" size="large" icon="step-forward" />
            </Row>
        )
    }
}
