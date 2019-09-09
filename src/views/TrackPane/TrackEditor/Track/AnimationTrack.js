import React, { Component } from 'react';
import { Layout } from 'antd';
import AnimationInfo from './AnimationInfo';
import AnimationBar from './AnimationBar';
import './track.css';

const { Sider, Content } = Layout;

export default class AnimationTrack extends Component {
    render() {
        return (
            <div className="track">
                <Layout style={{ background: '#eee', height: '34px' }}>
                    <Sider width="200px">
                        <AnimationInfo 
                            {...this.props}
                        />
                    </Sider>
                    <Content>
                        <AnimationBar 
                            {...this.props}
                        />
                    </Content>
                </Layout>
            </div>
        )
    }
}
