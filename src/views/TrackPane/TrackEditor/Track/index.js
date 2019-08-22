import React, { Component } from 'react';
import { Layout } from 'antd';
import TrackInfo from './TrackInfo';
import TrackBar from './TrackBar';
import './track.css';

const { Sider, Content } = Layout;

const animations = [];
const rowHeight = 36;

export default class Track extends Component {

    constructor(props) {
        super(props);
        this.state= {
            showAnimations: false,
        }
        this.clickTrack = this.clickTrack.bind(this);
        this.setShowAnimations = this.setShowAnimations.bind(this);
    }

    clickTrack() {
        this.props.selectElement(this.props.index);
    }

    setShowAnimations(showAnimations) {
        this.setState({
            showAnimations: showAnimations
        })
    }

    render() {
        var height = rowHeight;
        if (this.state.showAnimations) {
            height += rowHeight * ( animations.length + 1 )
        }
        return (
            <div style={{height: height, backgroundColor: '#fff'}}>
                <div className="track" onClick={this.clickTrack}>
                    <Layout style={{ background: '#eee', height: '36px' }}>
                        <Sider width="200px">
                            <TrackInfo {...this.props} showAnimations={this.state.showAnimations} setShowAnimations={this.setShowAnimations}/>
                        </Sider>
                        <Content>
                            <TrackBar {...this.props}/>
                        </Content>
                    </Layout>
                </div>
            </div>
        )
    }
}
