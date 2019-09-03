import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderBar from '../HeaderBar';
import EditPane from '../EditPane';
import ResourcePane from '../ResourcePane';
import ToolPane from '../ToolPane';
import StorylinePane from '../StorylinePane';
import TrackPane from '../TrackPane';
// import ActionTracker from '../ActionTracker';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import UIMode from '@/constants/UIMode';

const { Sider, Content } = Layout;

const contentHeight = '550px'

export default class EditorView extends Component {
    render() {
        const {showResourcePane, showToolPane} = this.props;
        return (
            <DndProvider backend={HTML5Backend}>
                <HeaderBar/>
                <Layout>
                    <Layout>
                        <Sider 
                            width={360} 
                            style={{ background: '#fff', height: contentHeight }} 
                            // trigger={null} 
                            // collapsible 
                            collapsedWidth={0} 
                            collapsed={!showResourcePane}
                        >
                            <ResourcePane/>
                        </Sider>
                        <Content style={{ background: '#fff', height: contentHeight }}>
                            <EditPane/>
                        </Content>
                        <Sider 
                            width={300} 
                            style={{ background: '#fff', height: contentHeight }} 
                            // trigger={null} 
                            // collapsible 
                            collapsedWidth={0} 
                            collapsed={!showToolPane}
                        >
                            <ToolPane />
                        </Sider>
                    </Layout>
                    <Layout>
                        <Content
                        style={{ background: '#eee', height: '320px' }} 
                        >
                            {this.props.uimode === UIMode.TRACK_MODE?<TrackPane />:<StorylinePane />}
                            
                        </Content>
                    </Layout>
                    {/* <Layout>
                        <Content
                        style={{ background: '#eee', height: '30px' }} 
                        >
                            <ActionTracker />
                        </Content>
                    </Layout> */}
                </Layout>
            </DndProvider>
        )
    }
}
