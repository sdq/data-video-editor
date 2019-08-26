import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider, Input } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;

export default class TextTool extends Component {

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
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }

        return (
            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px'}}>

                <Divider>Attribute</Divider>
                <Row style={{margin: '10px 15px 0px 15px', fontSize: '14px'}}>
                        <Select defaultValue="Helvetica"  style={{ width: '100%' , align :'center' }}>
                            <Option value="SimSun">宋体</Option>
                            <Option value="SimHei">黑体</Option>
                            <Option value="Helvetica">Helvetica</Option>
                            <Option value="Pingfang">Pingfang SC</Option>
                        </Select>
                </Row>
                <Row style={{margin: '15px 5px 0px 15px', fontSize: '14px'}}>
                    <Col span={8} style={{margin: '0px 10px 0px 0px'}}>
                        <Button type="danger" block size="small" style={{margin: '0px 0px 0px 0px'}} onClick={ this.handleClick } ></Button>
                            { this.state.displayColorPicker ? <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                            <SketchPicker />
                            </div> : null }
                    </Col>
                    <Col span={120}  style={{margin: '0px 0px 0px 30px'}} >
                        <Button shape="circle" size="small" icon="plus" style={{margin: '0px 0px 0px 15px'}} theme="twoTone" twoToneColor="#f4c444" />
                        <Input size="small" style={{margin: '0px 10px 0px 10px', width: 70, textAlign: 'center' }} placeholder="16" />
                        <Button shape="circle" size="small" icon="minus" style={{margin: '0px 0px 0px 0px'}} theme="twoTone" twoToneColor="#f4c444"  />
                    </Col>
                  


                </Row>

                <Row style={{margin: '15px 10px 0px 10px', fontSize: '14px'}}>
                    
                    <Button type="link" icon="bold" size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                    <Button type="link" icon="italic" size="large"style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                    <Button type="link" icon="underline"size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}}  ></Button>
                    <Button type="link" icon="medium" size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                     
                </Row>

                <Row style={{margin: '0px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={5} style={{ padding: '8px 5px 0 5px'}}>Alpha</Col>
                <Col span={19} style={{textAlign:'center', padding: '0px 5px 0 0px'}}>
                   <Slider defaultValue={0} /> 
                </Col>  
                     
                </Row>
                <Divider>Position</Divider>
                <Row style={{margin: '15px 10px 0px 10px', fontSize: '14px'}}>
                    
                    <Button type="dashed" icon="align-left" size="small" style={{width: '28%',margin: '0px 10px 0px 5px'}} ></Button>
                    <Button type="dashed" icon="align-center" size="small"style={{width: '28%',margin: '0px 10px 0px 5px'}} ></Button>
                    <Button type="dashed" icon="align-right"size="small" style={{width: '28%',margin: '0px 5px 0px 5px'}}  ></Button>

                </Row>
                <Row style={{margin: '15px 0px 0px 10px', fontSize: '12px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '5px 5px 0 0px'}}>X</Col>
                    <Col span={5}><InputNumber min={0} max={600} defaultValue={10} size="small" style={{width: '100%',padding: '0px 5px 0 10px'}} /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '5px 5px 0 10px'}}>Y</Col>
                    <Col span={5}><InputNumber min={0} max={600} defaultValue={10} size="small"  style={{width: '100%',padding: '0px 5px 0 10px'}}/></Col>
                    <Col span={2}  style={{textAlign:'center', padding: '5px 5px 0 15px'}}>R</Col>
                    <Col span={5}><InputNumber min={-180} max={180} defaultValue={10} size="small" style={{width: '100%',padding: '0px 5px 0 10px'}}/></Col>
                </Row>
                <Row style={{margin: '10px 20px 20px 0px', fontSize: '12px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 0px'}}>W</Col>
                    <Col span={8}><InputNumber min={0} max={600} defaultValue={100} size="small"/></Col>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>H</Col>
                    <Col span={8}><InputNumber min={0} max={600} defaultValue={100} size="small"/></Col>
                </Row>
                
            </div>
        )
    }
}

