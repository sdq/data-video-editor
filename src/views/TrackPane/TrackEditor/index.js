import React, { Component } from 'react';
import TimelineBar from './TimelineBar';
import TrackHeader from './Track/TrackHeader';
import TrackGroup from './TrackGroup';
import './trackeditor.css';

export default class TrackEditor extends Component {
    render() {
        return (
            <div className="trackeditor">
                <TimelineBar {...this.props}/>
                <TrackHeader {...this.props}/>
                <TrackGroup {...this.props}/>
            </div>
        )
    }
}
