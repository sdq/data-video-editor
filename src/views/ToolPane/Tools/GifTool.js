import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Slider, Icon } from 'antd';


function formatter(value) {
    return `${value}%`;
}

export default class GifTool extends Component {
    constructor(props) {
    super(props);
    this.state = {
            displayColorPicker: false,
            gifX : this.props.currentElement.info().x,
            gifY : this.props.currentElement.info().y,
            opacity : this.props.currentElement.info().opacity, 
            speed : this.props.currentElement.info().delay, 
        };
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };


    changeGifX (value)  {
        this.props.currentElement.info().x = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };
    changeGifY = (value) => {
        this.props.currentElement.info().y = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     };
     changeGifR = (value) => {
        this.props.currentElement.info().rotation = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     };
     changeGifW = (value) => {  
        this.props.currentElement.info().width = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     };
     changeGifH = (value) => {
        this.props.currentElement.info().height = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     };

     onSliderChange = (value)=>{
        const newScene = Object.assign({},this.props.currentScene);
        this.setState({opacity:value}); //record
        this.props.currentElement.info().opacity = value/100;
        this.props.updateScene(this.props.sceneIndex, newScene);    
    }

    onSpeedChange = (value)=>{
        const newScene = Object.assign({},this.props.currentScene);
        this.setState({speed:value}); //record current speed
        //TODO : let value match real speed 
        this.props.currentElement.info().delay = value;
        this.props.updateScene(this.props.sceneIndex, newScene);    
    }


    render() {
        const {currentElement} = this.props;
        return (
            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',overflow: 'auto'}}>
                <Divider>Position</Divider>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.dragPos ? this.props.dragPos.x : currentElement.info().x } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                    onChange = {value => this.changeGifX(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.dragPos ? this.props.dragPos.y : currentElement.info().y } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeGifY(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                    <Col span={6}><InputNumber min={-360} max={360} value={this.props.transformInfo ? this.props.transformInfo.r : currentElement.info().rotation} precision={0.1} formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                     onChange = {value => this.changeGifR(value)}
                    /></Col>
                   
                </Row>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.transformInfo ? this.props.transformInfo.w : currentElement.info().width} size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeGifW(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.transformInfo ? this.props.transformInfo.h : currentElement.info().height} size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeGifH(value)}
                    /></Col>
                    {/* <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col> */}
                </Row>


                <Divider>Style</Divider>
                <Row style={{margin: '0px 10px 0px 15px', fontSize: '14px'}}>
                <Col span={8} style={{ padding: '10px 0px 0 0px'}}>Transparency</Col>
                <Col span={16} style={{textAlign:'center', padding: '2px 0px 0 10px'}}>
                   <Slider 
                   max={100}
                   min={0}
                   defaultValue={(this.state.opacity)*100} 
                   tipFormatter={formatter} 
                   onChange={this.onSliderChange}  /> 
                </Col>      
                </Row>
                <Divider>Duration</Divider>
                <Row style={{margin: '0px 10px 0px 15px', fontSize: '14px'}}>
                <Col span={16} style={{ padding: '10px 0px 0 0px'}}>Playback Speed</Col>
                <Col span={8} style={{margin: '5px 0px 0px 0px',float:'right'}}>
                        <InputNumber min={0.1} max={8.0} 
                        defaultValue={this.props.currentElement.info().delay} 
                        onChange={value => this.onSpeedChange(value)}
                        style={{width: '100%',float:'right'}}
                        formatter={value => `${value}X`}
                        step={0.1}
                        parser={value => value.replace('X', '')}
                        />
                </Col> 
                </Row>
             
            </div>
        )
    }
}


