import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import Color from '@/constants/Color';
import SceneBlock from '@/components/SceneBlock';
import TrackEditor from './TrackEditor';
import './trackpane.css';

const { Sider, Content } = Layout;

export default class TrackPane extends Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }

    back() {
        this.props.displayStoryline();
    }

    //TODO: track editor
    render() {
        return (
            <div className="sceneeditor">
                <div id="track-editor-header" onClick={this.back}>
                    <Icon type="caret-left" style={{color: 'white' , float: 'left', marginTop: 5}}/>
                    <font color="white" weight="bold" style={{marginLeft: 10}}>Track Editor</font>
                </div>
                <div>
                    <Layout>
                        <Sider width={220} style={{backgroundColor: Color.GRAY, height: 280, padding: '8px' }}>
                            <SceneBlock index={this.props.sceneIndex} scene={this.props.currentScene} isSelected={true} { ...this.props }/>
                        </Sider>
                        <Content style={{backgroundColor: Color.GRAY, height: 280, padding: '8px' }}>
                            <TrackEditor />
                        </Content>
                    </Layout>
                </div> 
            </div>
        )
    }
}
