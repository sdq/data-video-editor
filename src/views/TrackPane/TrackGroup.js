import React, { Component } from 'react';
import Track from './Track';

export default class TrackGroup extends Component {
    render() {
        return (
            <div>
                <Track/>
                <Track/>
                <Track/>
            </div>
        )
    }
}
