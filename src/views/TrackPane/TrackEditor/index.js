import React, { Component } from 'react';
import { Layout } from 'antd';
import TimelineHeader from './TimelineHeader';
import TrackHeader from './TrackHeader';
import TrackGroup from './TrackGroup';
import './trackeditor.css';

const { Sider, Content } = Layout;

export default class TrackEditor extends Component {
    render() {
        return (
            <div className="trackeditor">
                <TimelineHeader {...this.props}/>
                <TrackHeader {...this.props}/>
                <TrackGroup {...this.props}/>
            </div>
        )
    }
}
