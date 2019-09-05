import React, { Component } from 'react';
import { Layout } from 'antd';
import Color from '@/constants/Color';
import SceneBlock from '@/components/SceneBlock';
import TrackEditor from './TrackEditor';
import TrackEditorHeader from './TrackEditorHeader';
import './trackpane.css';

const { Sider, Content } = Layout;

export default class TrackPane extends Component {

    render() {
        return (
            <div className="sceneeditor">
                <TrackEditorHeader {...this.props}/>
                <div>
                    <Layout>
                        <Sider width={220} style={{backgroundColor: Color.GRAY, height: 280, padding: '8px' }}>
                            <SceneBlock index={this.props.sceneIndex} scene={this.props.currentScene} isSelected={true} { ...this.props }/>
                        </Sider>
                        <Content style={{backgroundColor: Color.GRAY, height: 280, paddingLeft: '8px', paddingTop: '8px'}}>
                            <TrackEditor 
                                sceneWidth={this.props.currentScene.duration() * this.props.sceneScale}
                                {...this.props}
                            />
                        </Content>
                    </Layout>
                </div> 
            </div>
        )
    }
}
