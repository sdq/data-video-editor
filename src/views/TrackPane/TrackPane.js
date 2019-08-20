import React, { Component } from 'react';
import { Layout } from 'antd';
import TrackGroup from './TrackGroup';
import Color from '@/constants/Color';
import SceneBlock from '@/components/SceneBlock';
import './trackpane.css';

const { Sider, Content } = Layout;

export default class TrackPane extends Component {
    //TODO: track editor
    render() {
        return (
            <div className="sceneeditor">
                <div style={{backgroundColor: Color.ORANGE, height: "40px"}}></div>
                <div className="scenetracks">
                    <Layout>
                        <Sider width={220} style={{backgroundColor: Color.GRAY, height: 280 }}>
                            <SceneBlock index={this.props.sceneIndex} scene={this.props.currentScene} isSelected={true} { ...this.props }/>
                        </Sider>
                        <Content style={{backgroundColor: Color.GRAY, height: 280 }}>
                            <TrackGroup  { ...this.props }/>
                        </Content>
                        {/* <TrackGroup  { ...this.props }/> */}
                    </Layout>
                </div> 
            </div>
        )
    }
}
