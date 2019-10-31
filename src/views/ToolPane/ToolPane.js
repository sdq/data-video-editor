import React, { Component } from 'react'
import { Tabs } from 'antd';
import ElementType from '@/constants/ElementType';
import Color from '@/constants/Color';
import SceneTool from './Tools/SceneTool';
import ImageTool from './Tools/ImageTool';
import GifTool from './Tools/GifTool';
import VideoTool from './Tools/VideoTool';
// import AudioTool from './Tools/AudioTool';
import ChartTool from './Tools/ChartTool';
import TextTool from './Tools/TextTool';
import DataTool from './Tools/DataTool';
import AnimationTool from './Tools/AnimationTool';
import PosTool from './Tools/PosTool';
import './toolpane.css';

const { TabPane } = Tabs;

export default class ToolPane extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         title: "Scene Tool"
    //     }
    // }

    chooseTool() {
        //每当切换toolbar时，清空公用dragpos,transinfo
        this.props.dragElement('');
        this.props.transformElement('');

        if (this.props.isElementSelected && this.props.currentElement) {
            switch (this.props.currentElement.type()) {
                case ElementType.IMAGE:
                    return <div className="card-container">
                    <PosTool {...this.props}/>
                    <Tabs type="card">
                        <TabPane tab="Design" key="Design" >
                            <ImageTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>
                    </div>
                case ElementType.GIF:
                        return <div className="card-container">
                        <PosTool {...this.props}/>
                        <Tabs type="card">
                        <TabPane tab="Design" key="Design">
                            <GifTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>
                    </div>
                 case ElementType.VIDEO:
                    return <div className="card-container">
                    <PosTool {...this.props}/>
                    <Tabs type="card">
                    <TabPane tab="Design" key="Design">
                        <VideoTool {...this.props}/>
                    </TabPane>
                    <TabPane tab="Animation" key="Animation">
                        <AnimationTool {...this.props}/>
                    </TabPane>
                </Tabs>
                </div>
                case ElementType.CHART:
                    return <div className="card-container">
                    <PosTool {...this.props}/>
                    <Tabs type="card">
                        <TabPane tab="Data" key="Data">
                            <DataTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Chart" key="Chart">
                            <ChartTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>
                    </div>
                case ElementType.TEXT:
                    return <div className="card-container">
                    <PosTool {...this.props}/>
                    <Tabs type="card">
                        <TabPane tab="Text" key="Text">
                            <TextTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>
                    </div>
                default:
                    return <SceneTool {...this.props}/>
            }
        } else {
            return <Tabs type="card">
                <TabPane tab="Scene" key="Scene">
                    <SceneTool {...this.props}/>
                </TabPane>
            </Tabs> 
        }
    }

    render() {
        return (
            <div className="card-container" style={{position:'absolute', zIndex: 20, width: 300, height: 550, borderLeftStyle: 'solid', borderLeftColor: Color.ORANGE, borderLeftWidth: 1}}>
                {this.chooseTool()}
            </div>
        )
    }
}
