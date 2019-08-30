import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;
const ButtonGroup = Button.Group;

function onSliderChange(value) {
    console.log('onChange: ', value);
}
  
function onAfterSliderChange(value) {
    console.log('onAfterChange: ', value);
}

function onTextSizeChange(value) {
    console.log('changed', value);
}
  
function formatter(value) {
    return `${value}%`;
}

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
            //position: 'relative',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            //position:
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }

        return (

            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px'}}>

                <Divider>Style</Divider>
                <Row style={{margin: '0px 15px 0px 15px', fontSize: '14px'}}>
                        <Select defaultValue="No style"  style={{ width: '100%' , align :'center' }}>
                            <Option value="0">
                                <Button type="link" icon="bold" size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                                No style
                            </Option>
                            <Option value="1">
                                <Button type="link" icon="bold" size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                                Shadow
                            </Option>
                            <Option value="2">
                                <Button type="link" icon="bold" size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                                Filling
                            </Option>
                            <Option value="3">
                                <Button type="link" icon="bold" size="large" style={{width: '20%',margin: '0px 5px 0px 5px'}} ></Button>
                                Distort
                            </Option> 
                            <Option value="4" style={{textAlign :'center' } }>
                                More...
                            </Option> 
                        </Select>
                </Row>

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

                <Divider>Character</Divider>
                <Row style={{margin: '0px 15px 0px 15px', fontSize: '14px'}}> 
                        <Select defaultValue="Helvetica"  style={{ width: '100%' , align :'center' }}>
                            <Option value="SimSun">宋体</Option>
                            <Option value="SimHei">黑体</Option>
                            <Option value="Helvetica">Helvetica</Option>
                            <Option value="Pingfang">Pingfang SC</Option>
                        </Select>
                </Row>

                <Row style={{margin: '15px 15px 0px 15px', fontSize: '14px'}}>
                <Col span={18} style={{margin: '0px 0px 0px 0px'}}>
                <Select defaultValue="Heavy"  style={{ width: '96%' , align :'center' }}>
                            <Option value="Heavy">Heavy</Option>
                            <Option value="Extralight">Extralight</Option>
                            <Option value="Demibold">Demibold</Option>
                        </Select>
                </Col>
                <Col span={6} style={{margin: '0px 0px 0px 0px',float:'right'}}>
                        <InputNumber min={1} max={64} 
                        defaultValue={14} 
                        onChange={onTextSizeChange} 
                        style={{width: '100%',float:'right'}}/>
                </Col>
                </Row>

                <Row style={{margin: '15px 15px 0px 15px', fontSize: '14px'}}>
                <Col span={18} style={{margin: '0px 0px 0px 0px'}}>
                <ButtonGroup style={{ width: '96%' , align :'center' }}>
                    <Button type="Default" icon="bold"  style={{width: '25%',margin: '0px 0px 0px 0px'}} ></Button>
                    <Button type="Default" icon="italic"  style={{width: '25%',margin: '0px 0px 0px 0px'}} ></Button>
                    <Button type="Default" icon="underline"  style={{width: '25%',margin: '0px 0px 0px 0px'}}  ></Button>
                    <Button type="Default" icon="strikethrough"   style={{width: '25%',margin: '0px 0px 0px 0px'}} ></Button>
                </ButtonGroup>
                </Col>

                    <Col span={6} style={{margin: '0px 0px 0px 0px',float:'right'}}>
                        <Button type="danger" block  style={{width: '100%',margin: '0px 0px 0px 0px'}} onClick={ this.handleClick } ></Button>
                            { this.state.displayColorPicker ? <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                            <SketchPicker />
                            </div> : null }
                    </Col>
                </Row>

                <Divider>Position</Divider>
               
                <Row style={{margin: '5px 15px 0px 15px', fontSize: '14px'}}>
                <ButtonGroup style={{ width: '100%' , align :'center' }}>
                     <Button type="Default" icon="align-left"  style={{width: '33.3%',textAlign:'center',margin: '0px 0px 0px 0px'}} ></Button>
                     <Button type="Default" icon="align-center" style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} ></Button>
                     <Button type="Default" icon="align-right" style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}}  ></Button>
                </ButtonGroup>

                </Row>
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

