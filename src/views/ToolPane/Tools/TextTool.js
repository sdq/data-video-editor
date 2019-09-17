
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


    ChangeTextX = (value) => {
    //press
    };
    ChangeTextY = (value) => {
    //press
    };



    changeTextXX (value)  {
       
        // console.log("X");
        // console.log(value);// INPUT事件先于value事件触发
        // const newElement = Object.assign({},this.props.currentElement);
        // const newInfo = Object.assign({},newElement.info());
        // const newScene = Object.assign({},this.props.currentScene);
        // console.log(newInfo);
        // newInfo.x = value;
        
        // newElement.info(newInfo);
        // newScene.updateElement(newElement, this.props.elementIndex);
        // this.props.updateScene(this.props.sceneIndex, newScene);
        // const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        // this.props.updateElement(newElement, this.props.elementIndex, elementName);
        // console.log('######scene@@@@@@')
        // console.log(newScene);
        // this.setState({ textX: value })  //ddrag事件不会传递到state 所以不会实时更改
        this.props.currentElement.info().x = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };
    changeTextYY = (value) => {
        // console.log("Y");
        // console.log(value);
        // const newElement = Object.assign({},this.props.currentElement);
        // const newInfo = Object.assign({},newElement.info());
        // const newScene = Object.assign({},this.props.currentScene);
        // console.log(newInfo);
        // newInfo.y = value;
        // this.setState({ textY: value })
        // newElement.info(newInfo);
        // newScene.updateElement(newElement, this.props.elementIndex);
        // this.props.updateScene(this.props.sceneIndex, newScene);
        // const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        // this.props.updateElement(newElement, this.props.elementIndex, elementName);
        // console.log('######scene@@@@@@')
        // console.log(newScene);
        this.props.currentElement.info().y = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
 
     };

     changeTextR = (value) => {
        console.log(this.props.currentElement);
        this.props.currentElement.info().rotation = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeTextW = (value) => {
        
        this.props.currentElement.info().width = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeTextH = (value) => {
        this.props.currentElement.info().height = value;
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
            //position: 'absolute',
            //position:
           // top: '0px',
           // right: '0px',
           // bottom: '0px',
           //left: '0px',
        }

        return (

            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:'500px',overflow: 'auto'}}>

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
                   <Col span={6}><InputNumber min={0} max={700} value={currentElement.info().x} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                   onChange = {value => this.changeTextXX(value)}
                   onPressEnter={value => this.changeTextX(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                   <Col span={6}><InputNumber min={0} max={700} value={currentElement.info().y} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextYY(value)}
                   onPressEnter={value => this.changeTextY(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                   <Col span={6}><InputNumber min={-360} max={360} value={currentElement.info().rotation}  formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextR(value)}
                   /></Col>
                  
               </Row>
               <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                   <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().width} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextW(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                   <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().height} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextH(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col>
                  </Row>
                  
                {/* <Divider>Style</Divider>
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
                </Row> */}

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

            
            </div>
        
        )
    }
}


