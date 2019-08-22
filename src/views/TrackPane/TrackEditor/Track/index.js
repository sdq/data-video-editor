import React, { Component } from 'react';
import { Layout } from 'antd';
import TrackInfo from './TrackInfo';
import TrackBar from './TrackBar';
import './track.css';

const { Sider, Content } = Layout;

export default class Track extends Component {

    constructor(props) {
        super(props);
        this.clickTrack = this.clickTrack.bind(this);
    }

    clickTrack() {
        this.props.selectElement(this.props.index);
    }

    render() {
        return (
            <div className="track" onClick={this.clickTrack}>
                <Layout style={{ background: '#eee', height: '36px' }}>
                    <Sider width="200px">
                        <TrackInfo {...this.props}/>
                    </Sider>
                    <Content>
                        <TrackBar {...this.props}/>
                    </Content>
                </Layout>
            </div>
        )
    }
}
