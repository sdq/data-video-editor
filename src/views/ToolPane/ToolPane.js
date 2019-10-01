import React, { Component } from 'react'
import { Tabs } from 'antd';
import ElementType from '@/constants/ElementType';
import Color from '@/constants/Color';
import SceneTool from './Tools/SceneTool';
import ImageTool from './Tools/ImageTool';
import GifTool from './Tools/GifTool'
// import AudioTool from './Tools/AudioTool';
import ChartTool from './Tools/ChartTool';
import TextTool from './Tools/TextTool';
import DataTool from './Tools/DataTool';
import AnimationTool from './Tools/AnimationTool';

const { TabPane } = Tabs;

export default class ToolPane extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         title: "Scene Tool"
    //     }
    // }

    chooseTool() {
        if (this.props.isElementSelected && this.props.currentElement) {
            switch (this.props.currentElement.type()) {
                case ElementType.IMAGE:
                    return <Tabs type="card">
                        <TabPane tab="Design" key="Design">
                            <ImageTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>;
                case ElementType.GIF:
                        return <Tabs type="card">
                        <TabPane tab="Design" key="Design">
                            <GifTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>;
                case ElementType.CHART:
                    return <Tabs type="card">
                        <TabPane tab="Data" key="Data">
                            <DataTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Chart" key="Chart">
                            <ChartTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>;
                case ElementType.TEXT:
                    return <Tabs type="card">
                        <TabPane tab="Text" key="Text">
                            <TextTool {...this.props}/>
                        </TabPane>
                        <TabPane tab="Animation" key="Animation">
                            <AnimationTool {...this.props}/>
                        </TabPane>
                    </Tabs>;
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
