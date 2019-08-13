import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './audiocard.css';

export default class AudioCard extends Component {

    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <ReactAudioPlayer
                    src={this.props.soundurl}
                    controls
                />
            </div>
        )
    }
}
