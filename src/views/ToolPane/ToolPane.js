import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider } from 'antd';
import Color from '../../constants/Color';
import ImageTool from './Tools/ImageTool';
import AudioTool from './Tools/AudioTool';
import ChartTool from './Tools/ChartTool';
import Tool from './Tools/ImageTool';

export default class ToolPane extends Component {

    chooseTool() {
        //TODO: choose tool
        return <div>default</div>
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: Color.LIGHT_ORANGE, height: "50px", padding: '13px 10px 0 10px', fontSize: '16px'}}>
                    <p style={{color:Color.DEEP_ORANGE}}>Toorbar</p>
                </div>
                <ImageTool />
            </div>
        )
    }
}
