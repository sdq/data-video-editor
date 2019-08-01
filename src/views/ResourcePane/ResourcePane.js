import React, { Component } from 'react';
import { Tabs } from 'antd';
import ImageTab from './ImageTab';
import AudioTab from './AudioTab';
import VideoTab from './VideoTab';
import TextTab from './TextTab';
import ChartTab from './ChartTab';
import './resourcepane.css';

const { TabPane } = Tabs;

export default class ResourcePane extends Component {
    render() {
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Image" key="Image">
                        <ImageTab/>
                    </TabPane>
                    <TabPane tab="Chart" key="Chart">
                        <ChartTab/>
                    </TabPane>
                    <TabPane tab="Video" key="Video">
                        <VideoTab/>
                    </TabPane>
                    <TabPane tab="Audio" key="Audio">
                        <AudioTab/>
                    </TabPane>
                    <TabPane tab="Text" key="Text">
                        <TextTab/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
