import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Slider,Icon } from 'antd';

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

    componentWillReceiveProps(props) {
        console.log('get new element');
        console.log(props.currentElement.info().x)
    }

    state = {
        displayColorPicker: false,
        imageX : this.props.currentElement.info().x,
        imageY : this.props.currentElement.info().y,
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
        //const {imageX,imageY} = this.state;
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white'}}>
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
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                    <Col span={6}><InputNumber min={0} max={600}  size="small" 
                     value = {currentElement.info().x}
                    //value={this.state.imageX}
                    style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                    onChange = {value => this.ChangeTextXX(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().y} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.ChangeTextYY(value)}
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