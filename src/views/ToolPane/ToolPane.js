import React, { Component } from 'react'
//import { InputNumber, Row, Col, Divider, Button, Select, Slider } from 'antd';
import ElementType from '../../constants/ElementType';
import Color from '../../constants/Color';
import SceneTool from './Tools/SceneTool';
import ImageTool from './Tools/ImageTool';
import AudioTool from './Tools/AudioTool';
import ChartTool from './Tools/ChartTool';
import TextTool from './Tools/TextTool';

export default class ToolPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Scene Tool"
        }
    }

    chooseTool() {
        if (this.props.isSelected && this.props.currentElement) {
            switch (this.props.currentElement.type) {
                case ElementType.IMAGE:
                    return <ImageTool {...this.props}/>;
                case ElementType.CHART:
                    return <ChartTool {...this.props}/>;
                case ElementType.TEXT:
                    return <TextTool {...this.props}/>;
                default:
                    return <SceneTool {...this.props}/>
            }
        } else {
            return <SceneTool {...this.props}/>
        }
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: Color.LIGHT_ORANGE, height: "50px", padding: '13px 10px 0 10px', fontSize: '16px'}}>
                    <p style={{color:Color.DEEP_ORANGE}}>{this.state.title}</p>
                </div>
                {this.chooseTool()}
            </div>
        )
    }
}
