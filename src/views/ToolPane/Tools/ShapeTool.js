import React, { Component } from 'react'
import { Row, Col, Divider, InputNumber , Slider,Button } from 'antd';
import { SketchPicker } from 'react-color';


function formatter(value) {
    return `${value}%`;
}

export default class ShapeTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            displayStrokeColorPicker: false,
            displayShadowColorPicker: false,
            opacity : this.props.currentElement.info().opacity, 
            strokeWidth :this.props.currentElement.info().strokeWidth, 
        };
        this.onSliderChange = this.onSliderChange.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this); 
        this.handleStrokeColorClick =  this.handleStrokeColorClick.bind(this);
        this.handleShadowColorClick =  this.handleShadowColorClick.bind(this);
        this.onStrokeWidthChange = this.onStrokeWidthChange.bind(this);
        this.onShadowChange = this.onShadowChange.bind(this);
        this.oncornerRadiusChange = this.oncornerRadiusChange.bind(this);
        this.onpointerLengthChange = this.onpointerLengthChange.bind(this);
        this.onpointerWidthChange = this.onpointerWidthChange.bind(this);
        this.onnumPointsChange = this.onnumPointsChange.bind(this);
    }


    handleColorClick () {
        let {displayColorPicker} =this.state;
        displayColorPicker = displayColorPicker==="none"?"block":"none";
        this.setState({displayColorPicker})
        if(displayColorPicker){
            //this.props.updateColor(key,color)
        }
        this.setState({ displayColorPicker: !this.state.displayColorPicker })

    };

    handleColorChange = (value)=>{
        const shapeType =this.props.currentElement.info().shapeType;
        let color = value.hex;  
        this.setState({color})
        const newScene = Object.assign({},this.props.currentScene);
        if(shapeType==="line"||shapeType==="arrow"){
            this.props.currentElement.info().stroke = color;
        }else{
            this.props.currentElement.info().color = color;
        }
        this.props.currentElement.info().color = color;
        this.props.updateScene(this.props.sceneIndex, newScene);
        //this.handleColorClose();
    }
  
    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleStrokeColorClick () {
        let {displayStrokeColorPicker} =this.state;
        displayStrokeColorPicker = displayStrokeColorPicker==="none"?"block":"none";
        this.setState({displayStrokeColorPicker})
        if(displayStrokeColorPicker){
            //this.props.updateColor(key,color)
        }
        this.setState({ displayStrokeColorPicker: !this.state.displayStrokeColorPicker })

    };

    handleStrokeColorChange = (value)=>{
        let color = value.hex;  
        this.setState({color})
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().stroke = color;
        this.props.updateScene(this.props.sceneIndex, newScene);
        //this.handleStrokeColorClose();
    }
  
    handleStrokeColorClose = () => {
        this.setState({ displayStrokeColorPicker: false })
    };

    handleShadowColorClick () {
        let {displayShadowColorPicker} =this.state;
        displayShadowColorPicker = displayShadowColorPicker==="none"?"block":"none";
        this.setState({displayShadowColorPicker})
        if(displayShadowColorPicker){
            //this.props.updateColor(key,color)
        }
        this.setState({ displayShadowColorPicker: !this.state.displayShadowColorPicker })

    };

    handleShadowColorChange = (value)=>{
        let color = value.hex;  
        this.setState({color})
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().shadowColor = color;
        this.props.updateScene(this.props.sceneIndex, newScene);
        //this.handleShadowColorClose();
    }
  
    handleShadowColorClose = () => {
        this.setState({ displayShadowColorPicker: false })
    };




    onSliderChange = (value)=>{
        const newScene = Object.assign({},this.props.currentScene);
        this.setState({opacity:value}); //record
        this.props.currentElement.info().opacity = value/100;
        this.props.updateScene(this.props.sceneIndex, newScene);    
    }

    onStrokeWidthChange = (value)=>{
        let strokeWidth = value;   
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().strokeWidth = strokeWidth;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    onShadowChange = (value)=>{
        let shadowBlur = value;   
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().shadowBlur = shadowBlur;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    oncornerRadiusChange = (value)=>{
        let cornerRadius = value;   
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().cornerRadius = cornerRadius;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    onpointerLengthChange = (value)=>{
        let pointerLength = value;   
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().pointerLength = pointerLength;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    onpointerWidthChange = (value)=>{
        let pointerWidth = value;   
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().pointerWidth = pointerWidth;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


   onnumPointsChange = (value)=>{
        let numPoints = value;   
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().numPoints = numPoints;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    render() {
        const shapeType =this.props.currentElement.info().shapeType;
        const popover = {
            position: 'fixed',
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
                <div style={{padding: '0px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:this.props.contentHeight-140+'px',overflow: 'auto'}}>
                <Divider>Style</Divider>
                <Row style={{margin: '0px 10px 0px 10px', fontSize: '14px'}}> 
                <Col span={4} style={{margin: '0px 0px 0px 0px'}}>
                Color
                </Col>
                <Col span={18} style={{margin: '0px 0px 0px 10px'}}>
                    <Button 
                    //disabled = {shapeType==="line"||shapeType==="arrow"}
                    size='small' icon="bg-colors" onClick={ this.handleColorClick } 
                    style={{width: '100%',margin: '0px 0px 0px 0px',
                    background:shapeType==="line"||shapeType==="arrow"?this.props.currentElement.info().stroke:this.props.currentElement.info().color,
                    border:"#ffffff",verticalAlign: "middle"}}></Button> 
                    {this.state.displayColorPicker ? <div style={ popover }>
                     <div style={ cover } onClick={ this.handleColorClose } />
                     <SketchPicker color={this.props.currentElement.info().color}  onChange={this.handleColorChange}  />
                     </div>:null }
                </Col>
                </Row> 
               
               { shapeType==="line"||shapeType==="arrow"?null:
                <Row style={{margin: '5px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '1px 0px 0px 0px'}}>
                Stroke
                </Col>
                <Col span={4} style={{margin: '0px 0px 0px 10px'}}>
                    <Button size='small' icon="bg-colors" onClick={ this.handleStrokeColorClick} style={{width: '100%',margin: '0px 0px 0px 0px',background:this.props.currentElement.info().stroke,border:"#ffffff",verticalAlign: "middle"}}></Button> 
                     {this.state.displayStrokeColorPicker ? <div style={ popover }>
                     <div style={ cover } onClick={ this.handleStrokeColorClose } />
                     <SketchPicker color={this.props.currentElement.info().stroke}  onChange={this.handleStrokeColorChange}  />
                     </div>:null }
                </Col>
                <Col span={8} style={{margin: '1px 0px 0px 8px'}}>
                 StrokeWidth
                </Col>
                <Col span={5} style={{margin: '0px 0px 0px 3px'}}>
                        <InputNumber size='small' min={0} max={50} 
                        defaultValue={this.props.currentElement.info().strokeWidth} 
                        onChange={value => this.onStrokeWidthChange(value)}
                        style={{width: '100%',}}/>
                </Col>
                </Row>
               }

                { shapeType==="line"||shapeType==="arrow"?
                <Row style={{margin: '0px 10px 18px 5px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '1px 0px 0px 5px'}}>
                Width
                </Col>
                <Col span={18} style={{margin: '0px 0px 0px 10px'}}>
                        <InputNumber size='small' min={0} max={50} 
                        defaultValue={this.props.currentElement.info().strokeWidth} 
                        onChange={value => this.onStrokeWidthChange(value)}
                        style={{width: '98%',}}/>
                </Col>
                </Row>
               :null}   


                <Row style={{margin: '5px 10px 0px 10px', fontSize: '13px'}}>
                <Col span={4} style={{margin: '2px 0px 0px 0px'}}>
                Shadow
                </Col>
                <Col span={4} style={{margin: '0px 0px 0px 11px'}}>
                     <Button size='small' icon="bg-colors" onClick={ this.handleShadowColorClick} style={{width: '100%',margin: '0px 0px 0px 0px',background:this.props.currentElement.info().shadowColor,border:"#ffffff",verticalAlign: "middle"}}></Button> 
                     {this.state.displayShadowColorPicker ? <div style={ popover }>
                     <div style={ cover } onClick={ this.handleShadowColorClose } />
                     <SketchPicker color={this.props.currentElement.info().shadowColor}  onChange={this.handleShadowColorChange}  />
                     </div>:null }
                </Col>
                <Col span={8} style={{margin: '2px 0px 0px 8px'}}>
                 ShadowWidth
                </Col>
                <Col span={5} style={{margin: '0px 0px 0px 6px'}}>
                        <InputNumber size='small' min={0} max={50} 
                        defaultValue={this.props.currentElement.info().shadowBlur} 
                        onChange={value => this.onShadowChange(value)}
                        style={{width: '92%'}}/>
                </Col>
                
                </Row>

                <Row style={{margin: '0px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={8} style={{ padding: '8px 0px 0 0px'}}>Transparency</Col>
                <Col span={15} style={{textAlign:'center', padding: '0px 0px 0px 10px'}}>
                   <Slider 
                   max={100}
                   min={0}
                   defaultValue={(this.state.opacity)*100} 
                   tipFormatter={formatter} 
                   onChange={this.onSliderChange}  /> 
                </Col>      
                </Row>

                {shapeType==="rect"?
                <Row style={{margin: '15px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '0px 0px 0px 0px'}}>
                cornerRadius
                </Col>
                <Col span={5} style={{margin: '0px 10px 0px 0px',float:'right'}}>
                        <InputNumber size='small' min={0} max={50} 
                        defaultValue={this.props.currentElement.info().cornerRadius} 
                        onChange={value => this.oncornerRadiusChange(value)}
                        style={{width: '100%',float:'right'}}/>
                </Col>
                </Row>
                :null}


                {shapeType==="arrow"?
                <Row style={{margin: '15px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '2px 0px 0px 0px'}}>
                pointerLength
                </Col>
                <Col span={6} style={{margin: '0px 10px 0px 0px',float:'right'}}>
                        <InputNumber size='small' min={0} max={50} 
                        defaultValue={this.props.currentElement.info().pointerLength} 
                        onChange={value => this.onpointerLengthChange(value)}
                        style={{width: '100%',float:'right'}}/>
                </Col>
                </Row>
                 :null}
                
                {shapeType==="arrow"?
                <Row style={{margin: '15px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '2px 0px 0px 0px'}}>
                pointerWidth
                </Col>
                <Col span={6} style={{margin: '0px 10px 0px 0px',float:'right'}}>
                        <InputNumber size='small' min={0} max={50} 
                        defaultValue={this.props.currentElement.info().pointerWidth} 
                        onChange={value => this.onpointerWidthChange(value)}
                        style={{width: '100%',float:'right'}}/>
                </Col>
                </Row>
                :null}

                {shapeType==="star"?
                <Row style={{margin: '15px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '2px 0px 0px 0px'}}>
                numPoints
                </Col>
                <Col span={6} style={{margin: '0px 15px 0px 10px',float:'right'}}>
                        <InputNumber size='small' min={1} max={50} 
                        defaultValue={this.props.currentElement.info().numPoints} 
                        onChange={value => this.onnumPointsChange(value)}
                        style={{width: '100%',float:'right'}}/>
                </Col>
                </Row>
                :null}   
             
            </div>
        )
    }
}


