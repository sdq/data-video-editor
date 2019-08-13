import React, { Component } from 'react';
import { Layout } from 'antd';
import TrackGroup from './TrackGroup';
import SceneBlock from '../../components/SceneBlock';
import './trackpane.css';

const { Sider, Content } = Layout;

export default class TrackPane extends Component {
    //TODO: track editor
    render() {
        return (
            <div className="trackpane">
                <div style={{backgroundColor: "#FDC209", height: "40px"}}></div>
                <Layout>
                    <Sider width={200} height={250}>
                        <SceneBlock index={this.props.sceneIndex} scene={this.props.currentScene} isSelected={true} { ...this.props }/>
                    </Sider>
                    <Content>Track Manager</Content>
                    {/* <TrackGroup  { ...this.props }/> */}
                </Layout>
                
            </div>
        )
    }
}
