import React, { Component } from 'react';
import { Layout } from 'antd';
import Color from '@/constants/Color';
import SceneBlock from '@/components/SceneBlock';
import TrackEditor from './TrackEditor';
import './trackpane.css';

const { Sider, Content } = Layout;

export default class TrackPane extends Component {
    //TODO: track editor
    render() {
        return (
            <div className="sceneeditor">
                <div id="track-editor-header">
                    <font color="white" weight="bold">Track Editor</font>
                </div>
                <div>
                    <Layout>
                        <Sider width={220} style={{backgroundColor: Color.GRAY, height: 280, padding: '8px' }}>
                            <SceneBlock index={this.props.sceneIndex} scene={this.props.currentScene} isSelected={true} { ...this.props }/>
                        </Sider>
                        <Content style={{backgroundColor: Color.GRAY, height: 280, padding: '8px' }}>
                            <TrackEditor />
                        </Content>
                    </Layout>
                </div> 
            </div>
        )
    }
}
