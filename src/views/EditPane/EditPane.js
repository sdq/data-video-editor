import React, { Component } from 'react';
import { Layout } from 'antd';
import EditToolBar from './EditToolBar';
import PlayControlBar from './PlayControlBar';

const { Header, Footer, Sider, Content } = Layout;

export default class EditPane extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header style={{ background: '#eee', height: '50px' }}><EditToolBar/></Header>
                    <Content style={{ background: '#fff', height: '400px' }}>EditPane</Content>
                    <Footer style={{ background: '#eee', height: '50px' }}><PlayControlBar/></Footer>
                </Layout>
            </div>
        )
    }
}
