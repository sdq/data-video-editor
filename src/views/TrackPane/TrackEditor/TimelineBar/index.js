import React, { Component } from 'react';
import PlayController from './PlayController';
import TimelineRuler from './TimelineRuler';
import { Layout } from 'antd';
import './timelinebar.css';

const { Sider, Content } = Layout;

export default class TimelineBar extends Component {
    render() {
        return (
            <div className="timeline-bar">
                <Layout style={{ background: '#eee', height: '34px' }}>
                    <Sider width="200px" style={{ background: '#eee', height: '34px' }}>
                        <PlayController {...this.props}/>
                    </Sider>
                    <Content>
                        <TimelineRuler {...this.props}/>
                    </Content>
                </Layout>
            </div>
        )
    }
}
