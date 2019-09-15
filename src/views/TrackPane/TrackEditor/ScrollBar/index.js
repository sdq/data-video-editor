import React, { Component } from 'react';
import { Layout } from 'antd';
import { Rnd } from "react-rnd";
import './scrollbar.css';

const { Sider, Content } = Layout;

const height = 20;
const padding = 6;

export default class ScrollBar extends Component {
    render() {
        let {sceneWidth, screenX, screenWidth, scrollScale} = this.props;
        let x = 0;
        let width = screenWidth - padding;
        if (screenWidth <= scrollScale * sceneWidth) {
            width = screenWidth * ( screenWidth / (sceneWidth * scrollScale)) // scale
            x = screenX * ( screenWidth / (sceneWidth * scrollScale))
        }
        let scrollbar = <Rnd
            //style={{zIndex: 2}}
            size={{ width: width, height: height-8 }}
            position={{ x: x, y: 0 }}
            bounds='#track-editor-scrollbar'
            // disableDragging={isPerforming}
            enableResizing={{}}
            enableUserSelectHack={false}
            onDrag={(e, d) => {
                const x = d.x - 412; //TODO: onDrag bug!!
                const screenX = x / (screenWidth / (sceneWidth * scrollScale));
                this.props.onDragScrollbar(screenX);
            }}
            onDragStop={(e, d) => {
                const screenX = d.x / (screenWidth / (sceneWidth * scrollScale));
                this.props.onDragScrollbar(screenX);
            }}
        >
            <div style={{width: width, height: height-8,backgroundColor: '#676767', borderRadius: 10}}/>
        </Rnd>
        return (
            <div className="scroll-bar">
                <Layout style={{ background: '#fff', height: '22px' }}>
                    <Sider width="200px" style={{ background: '#fff', height: '22px' }}>
                    </Sider>
                    <Content style={{backgroundColor: '#eee', height: '22px', padding: '4px', paddingLeft: '6px'}}>
                        <div id='track-editor-scrollbar'>
                            {scrollbar}
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}
