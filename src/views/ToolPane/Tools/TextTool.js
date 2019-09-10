
import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Icon } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;
const ButtonGroup = Button.Group;

function onTextSizeChange(value) {
    console.log('changed', value);
}

export default class TextTool extends Component {

    state = {
        displayColorPicker: false,
        textX : this.props.currentElement.info().x,
        textY : this.props.currentElement.info().y,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    ChangeTextXX (value)  {
        this.props.currentElement.info().x = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };
    ChangeTextYY = (value) => {
        this.props.currentElement.info().y = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };


    render() {
        const {currentElement} = this.props;
        //const {textX,textY} = this.state;
        const popover = {
            //position: 'absolute',
            position: 'relative',
            //position: 'fixed',
            zIndex: '66',
            float:'right',
           // top: '10px',
            margin:'10px 15px 0px 0px',
          // right: '10px',
            //bottom: '0px',
            left: '0px',
        }
        const cover = {
            position: 'fixed',
        }

        return (

            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:'500px',overflow: 'auto'}}>

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
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().x} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                    onChange = {value => this.ChangeTextXX(value)}
                    onPressEnter={value => this.ChangeTextX(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().y} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.ChangeTextYY(value)}
                    onPressEnter={value => this.ChangeTextY(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                    <Col span={6}><InputNumber min={-360} max={360} defaultValue={0}  formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                   
                </Row>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                    <Col span={6}><InputNumber min={0} max={600} defaultValue={100} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                    <Col span={6}><InputNumber min={0} max={600} defaultValue={100} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col>
                </Row>    
            </div>
        )
    }
}