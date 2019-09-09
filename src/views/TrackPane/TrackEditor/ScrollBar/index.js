import React, { Component } from 'react';
import { Layout } from 'antd';
import { Rnd } from "react-rnd";
import './scrollbar.css';

const { Sider, Content } = Layout;

const height = 20;
const padding = 6;
const scrollScale = 1.5;

export default class ScrollBar extends Component {
    render() {
        let {sceneWidth, screenX, screenWidth} = this.props;
        let width = screenWidth - padding;
        if (screenWidth <= scrollScale * sceneWidth) {
            width = screenWidth * ( screenWidth / (sceneWidth * scrollScale))
        }
        let scrollbar = <Rnd
            //style={{zIndex: 2}}
            size={{ width: width, height: height-8 }}
            position={{ x: screenX, y: 0 }}
            bounds='parent'
            // disableDragging={isPerforming}
            enableResizing={{}}
            enableUserSelectHack={false}
            onDrag={(e,d) => {
                console.log(e);
                console.log(d);
                //this.changeNeedlePlace(d.x);
            }}
            onDragStop={(e, d) => {
                console.log('drag end');
                //this.changeNeedlePlace(d.x);
                this.props.onDragScrollbar(d.x);
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
                        <div>
                            {scrollbar}
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}
