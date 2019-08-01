import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderBar from '../HeaderBar';
import EditPane from '../EditPane';
import ResourcePane from '../ResourcePane';
import ToolPane from '../ToolPane';
import TrackPane from '../TrackPane';

const { Header, Footer, Sider, Content } = Layout;

export default class EditorView extends Component {
    render() {
        return (
            <div>
                <HeaderBar/>
                <Layout>
                    <Layout>
                        <Sider 
                        width={360} 
                        style={{ background: '#fff', height: '500px' }} 
                        // trigger={null} collapsible collapsedWidth={0} collapsed={this.props.isSidebarDisplayed}
                        >
                            <ResourcePane/>
                        </Sider>
                        <Content style={{ background: '#fff', height: '500px' }}>
                            <EditPane/>
                        </Content>
                        <Sider 
                        width={300} 
                        style={{ background: '#fff', height: '500px' }} 
                        // trigger={null} collapsible collapsedWidth={0} collapsed={this.props.isSidebarDisplayed}
                        >
                            <ToolPane/>
                        </Sider>
                    </Layout>
                    <Layout>
                        <Content
                        style={{ background: '#eee', height: '300px' }} 
                        >
                            <TrackPane/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
