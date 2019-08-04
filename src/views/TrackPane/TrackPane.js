import React, { Component } from 'react';
import TrackGroup from './TrackGroup';
import './trackpane.css';

export default class TrackPane extends Component {
    render() {
        return (
            <div className="trackpane">
                TrackPane
                <TrackGroup scenes={this.props.scenes}/>
            </div>
        )
    }
}
