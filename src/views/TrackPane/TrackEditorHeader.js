import React, { Component } from 'react';
import { Layout, Icon, Slider } from 'antd';
import Color from '@/constants/Color';
import './trackpane.css';

const { Sider, Content } = Layout;

const min = 1;
const max = 9;

export default class TrackEditorHeader extends Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
        this.handleScaleChange = this.handleScaleChange.bind(this);
    }

    back() {
        this.props.displayStoryline();
    }

    handleScaleChange(value) {
        this.props.setSceneScale(value);
    }

    render() {
        return (
            <div id="track-editor-header">
                <Layout style={{ backgroundColor: Color.ORANGE}}>
                    <Sider width={220} style={{ backgroundColor: 'transparent'}} onClick={this.back}>
                        <Icon type="caret-left" style={{color: 'white' , float: 'left', marginTop: 5}}/>
                        <font color="white" weight="bold" style={{marginLeft: 10}}>Track Editor</font>
                    </Sider>
                    <Content>
                        <Slider onChange={this.handleScaleChange} value={this.props.sceneScale} min={min} max={max} tooltipVisible={false} style={{width: 190, marginTop: 10}}/>
                    </Content>
                </Layout>
            </div>
        )
    }
}
