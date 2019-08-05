import React, { Component } from 'react';
import TrackGroup from './TrackGroup';
import './trackpane.css';

export default class TrackPane extends Component {
    render() {
        return (
            <div className="trackpane">
                <div style={{backgroundColor: "#FDC209", height: "40px"}}></div>
                <TrackGroup  { ...this.props }/>
            </div>
        )
    }
}
