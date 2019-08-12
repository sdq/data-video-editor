import React, { Component } from 'react';
import { Tabs } from 'antd';
import IllustrationTab from './IllustrationTab/IllustrationTab';
import PictographTab from './PictographTab/PictographTab';
// import TextTab from './TextTab/TextTab';
// import AudioTab from './AudioTab/AudioTab';
import ChartTab from './ChartTab/ChartTab';
import './resourcepane.css';

const { TabPane } = Tabs;

export default class ResourcePane extends Component {
    render() {
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Illustration" key="Illustration">
                        <IllustrationTab {...this.props}/>
                    </TabPane>
                    <TabPane tab="Chart" key="Chart">
                        <ChartTab {...this.props}/>
                    </TabPane>
                    <TabPane tab="Pictograph" key="Pictograph">
                        <PictographTab/>
                    </TabPane>
                    {/* <TabPane tab="Audio" key="Audio">
                        <AudioTab {...this.props}/>
                    </TabPane>
                    <TabPane tab="Text" key="Text">
                        <TextTab {...this.props}/>
                    </TabPane> */}
                </Tabs>
            </div>
        )
    }
}
