import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Slider } from 'antd';

function onSliderChange(value) {
    console.log('onChange: ', value);
}
  
function onAfterSliderChange(value) {
    console.log('onAfterChange: ', value);
}

function formatter(value) {
    return `${value}%`;
}

export default class ImageTool extends Component {

    state = {
        displayColorPicker: false,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {
  
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px'}}>
                <Divider>Style</Divider>
                <Row style={{margin: '0px 10px 0px 15px', fontSize: '14px'}}>
                <Col span={8} style={{ padding: '10px 0px 0 0px'}}>Transparency</Col>
                <Col span={16} style={{textAlign:'center', padding: '2px 0px 0 10px'}}>
                   <Slider 
                   max={99}
                   min={0}
                   defaultValue={0} 
                   tipFormatter={formatter} 
                   onChange={onSliderChange} 
                   onAfterChange={onAfterSliderChange} /> 
                </Col>      
                </Row>

                <Divider>Position</Divider>
                <Row style={{margin: '15px 15px 0px 15px', fontSize: '14px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                    <Col span={10}><InputNumber min={0} max={600} defaultValue={10} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}} /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                    <Col span={10}><InputNumber min={0} max={600} defaultValue={10} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                   
                </Row>
                <Row style={{margin: '15px 15px 0px 15px', fontSize: '14px'}}>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                    <Col span={10}><InputNumber min={0} max={600} defaultValue={100} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                    <Col span={10}><InputNumber min={0} max={600} defaultValue={100} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                </Row>
                
            </div>
        )
    }
}

