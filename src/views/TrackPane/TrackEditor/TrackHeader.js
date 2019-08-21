import React, { Component } from 'react';
import { Layout, Input } from 'antd';
import './trackeditor.css';

const { Sider, Content } = Layout;
const { Search } = Input;

export default class TrackHeader extends Component {
    render() {
        return (
            <div className="track-header">
                <Layout>
                    <Sider width="200px">
                        <div className="track-header-info">
                            <Search
                                placeholder="search element"
                                onSearch={value => console.log(value)}
                                style={{ width: 190 }}
                                size="small"
                            />
                        </div>
                    </Sider>
                    <Content>
                        <div />
                    </Content>
                </Layout>
            </div>
        )
    }
}