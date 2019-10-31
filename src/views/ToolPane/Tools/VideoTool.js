import React, { Component } from 'react'
import { Row, Col, Divider, Slider } from 'antd';


function formatter(value) {
    return `${value}%`;
}

export default class VideoTool extends Component {
    constructor(props) {
    super(props);
    this.state = {
            displayColorPicker: false,
            opacity : this.props.currentElement.info().opacity, 
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

    render() {
        return (
            <div style={{padding: '0px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',overflow: 'auto'}}>
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
            </div>
        )
    }
}


