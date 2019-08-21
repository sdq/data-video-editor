import React, { Component } from 'react';
import { Layout } from 'antd';
import TrackInfo from './TrackInfo';
import TrackBar from './TrackBar';
import './track.css';

const { Sider, Content } = Layout;

export default class Track extends Component {
    render() {
        return (
            <div className="track">
                <Layout>
                    <Sider width="200px">
                        <TrackInfo />
                    </Sider>
                    <Content>
                        <TrackBar />
                    </Content>
                </Layout>
            </div>
        )
    }
}
