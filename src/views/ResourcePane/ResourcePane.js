import React, { Component } from 'react';
import { Tabs } from 'antd';
import ImageTab from './ImageTab/ImageTab';
import AudioTab from './AudioTab/AudioTab';
import VideoTab from './VideoTab';
import TextTab from './TextTab/TextTab';
import ChartTab from './ChartTab/ChartTab';
import './resourcepane.css';

const { TabPane } = Tabs;

export default class ResourcePane extends Component {
    render() {
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Image" key="Image">
                        <ImageTab {...this.props}/>
                    </TabPane>
                    <TabPane tab="Chart" key="Chart">
                        <ChartTab/>
                    </TabPane>
                    {/* <TabPane tab="Video" key="Video">
                        <VideoTab/>
                    </TabPane> */}
                    <TabPane tab="Audio" key="Audio">
                        <AudioTab/>
                    </TabPane>
                    <TabPane tab="Text" key="Text">
                        <TextTab {...this.props}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
