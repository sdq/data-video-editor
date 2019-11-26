import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Slider } from 'antd';


function formatter(value) {
    return `${value}%`;
}

export default class GifTool extends Component {
    constructor(props) {
    super(props);
    this.state = {
            displayColorPicker: false,
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
        return (
            <div style={{padding: '0px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:this.props.contentHeight-140+'px',overflow: 'auto'}}>
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


