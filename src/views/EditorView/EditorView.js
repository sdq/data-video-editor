import React, { Component } from 'react';
import { Layout } from 'antd';
import EditPane from '../EditPane';
import ResourcePane from '../ResourcePane';
import ToolPane from '../ToolPane';
import TrackPane from '../TrackPane/TrackPane';
import PreviewPane from '../PreviewPane/PreviewPane';

const { Header, Footer, Sider, Content } = Layout;

export default class EditorView extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        Header
                    </Header>
                    <Layout>
                        <Sider 
                        width={240} 
                        style={{ background: '#fff', height: '500px' }} 
                        // trigger={null} collapsible collapsedWidth={0} collapsed={this.props.isSidebarDisplayed}
                        >
                            <ResourcePane/>
                        </Sider>
                        <Content>
                            <PreviewPane/>
                        </Content>
                        <Sider 
                        width={240} 
                        style={{ background: '#fff', height: '500px' }} 
                        // trigger={null} collapsible collapsedWidth={0} collapsed={this.props.isSidebarDisplayed}
                        >
                            <ToolPane/>
                        </Sider>
                    </Layout>
                    <Layout>
                        <Content
                        style={{ background: '#eee', height: '200px' }} 
                        >
                            <TrackPane/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
