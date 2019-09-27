
import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Slider,Icon } from 'antd';




function formatter(value) {
    return `${value}%`;
}

export default class ImageTool extends Component {


    constructor(props) {
        super(props);
    this.state = {
        displayColorPicker: false,
        imageX : this.props.currentElement.info().x,
        imageY : this.props.currentElement.info().y,
        opacity : this.props.currentElement.info().opacity, 
    };
    this.onSliderChange = this.onSliderChange.bind(this);
}



    componentWillReceiveProps(props) {
        console.log('get new element');
        console.log(props.currentElement.info().x)
    }


    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };


    changeImageXX (value)  {
        console.log("X");
        //console.log(value);// INPUT事件先于value事件触发
        // const newElement = Object.assign({},this.props.currentElement);
        // const newInfo = Object.assign({},newElement.info());
        // const newScene = Object.assign({},this.props.currentScene);
        // console.log(newInfo);
        // newInfo.x = value;
        // this.setState({ imageX: value })
        // newElement.info(newInfo);
        // newScene.updateElement(newElement, this.props.elementIndex);
        // this.props.updateScene(this.props.sceneIndex, newScene);
        // const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        // this.props.updateElement(newElement, this.props.elementIndex, elementName);
       // console.log('######scene@@@@@@')
        //console.log(newScene);
        console.log(this.props.currentElement);
        this.props.currentElement.info().x = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

    };
    changeImageYY = (value) => {
        // console.log("Y");
        // //console.log(value);
        // const newElement = Object.assign({},this.props.currentElement);
        // const newInfo = Object.assign({},newElement.info());
        // const newScene = Object.assign({},this.props.currentScene);
        // console.log('imagey'+this.state.imageY);        
        // newInfo.y = value;
        // this.setState({ imageY: value })
        // newElement.info(newInfo);
        // newScene.updateElement(newElement, this.props.elementIndex);
        // this.props.updateScene(this.props.sceneIndex, newScene);
        // const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        // this.props.updateElement(newElement, this.props.elementIndex, elementName);
        //console.log('######scene@@@@@@')
        //console.log(newScene);
        this.props.currentElement.info().y = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeImageR = (value) => {
        console.log(this.props.currentElement);
        this.props.currentElement.info().rotation = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeImageW = (value) => {
        
        this.props.currentElement.info().width = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeImageH = (value) => {
        this.props.currentElement.info().height = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };

     onSliderChange = (value)=>{
        
        const newScene = Object.assign({},this.props.currentScene);
        this.setState({opacity:value}); //record
       this.props.currentElement.info().opacity = value/100;
        console.log(this.props.currentElement.info().opacity);
        this.props.updateScene(this.props.sceneIndex, newScene);
        
    }



    render() {
        const {currentElement} = this.props;
        //const {imageX,imageY} = this.state;
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white'}}>
                <Divider>Position</Divider>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                    <Col span={6}><InputNumber min={0} max={600}  size="small" 
                     value = {currentElement.info().x}
                    //value={this.state.imageX}
                    style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                    onChange = {value => this.changeImageXX(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().y} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeImageYY(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                    <Col span={6}><InputNumber min={-360} max={360} value={currentElement.info().rotation}  formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                     onChange = {value => this.changeImageR(value)}
                    /></Col>
                   
                </Row>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().width} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeImageW(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().height} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeImageH(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col>
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

             
            </div>
        )
    }
}


