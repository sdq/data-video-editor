import React, { Component } from 'react';
import { Tabs } from 'antd';
import IllustrationTab from './IllustrationTab/IllustrationTab';
import ChartTab from './ChartTab/ChartTab';
import UserTab from './UserTab';
import './resourcepane.css';

const { TabPane } = Tabs;

export default class ResourcePane extends Component {

    render() {
        return (
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="My Media" key="User">
                        <UserTab {...this.props}/>
                    </TabPane>
                    <TabPane tab="Illustration" key="Illustration">
                        <IllustrationTab {...this.props}/>
                    </TabPane>
                    <TabPane tab="Chart" key="Chart">
                        <ChartTab {...this.props}/>
                    </TabPane>
                </Tabs>
                </div>
        )
    }
}
