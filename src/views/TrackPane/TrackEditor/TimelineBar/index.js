import React, { Component } from 'react';
import PlayController from './PlayController';
import TimelineRuler from './TimelineRuler';
import { Layout } from 'antd';
import './timelinebar.css';

const { Sider, Content } = Layout;
const performingHeight = 228;
const realHeight = 24;

export default class TimelineBar extends Component {
    render() {
        let height = this.props.isPerforming?performingHeight:realHeight;
        return (
            <div className="timeline-bar" style={{height: height, backgroundColor: 'transparent'}}>
                <Layout style={{ backgroundColor: 'transparent' , height: height}}>
                    <Sider width="200px" style={{ background: '#eee', height: realHeight }}>
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
