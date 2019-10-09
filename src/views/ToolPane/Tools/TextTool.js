import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider,Icon } from 'antd';
import { SketchPicker } from 'react-color';

const { Option, OptGroup } = Select;
const ButtonGroup = Button.Group;


function onAfterSliderChange(value) {
    //console.log('onAfterChange: ', value);
}

function formatter(value) {
    return `${value}%`;
}

export default class TextTool extends Component {
    constructor(props) {
        super(props);
    this.state = {
        displayColorPicker: false,
        textX : this.props.currentElement.info().x,
        textY : this.props.currentElement.info().y,
        color: '',
        textSize:'',
        textFamily:'',
        italic:false,
        bold:false,
        textunderline:false,
        textthroughline:false,
        opacity : this.props.currentElement.info().opacity,
        
    };
    this.handleColorClick = this.handleColorClick.bind(this);  //bind
    this.onTextSizeChange = this.onTextSizeChange.bind(this);
    this.onTextFamilyChange = this.onTextFamilyChange.bind(this);
    this.onTextItalicChange = this.onTextItalicChange.bind(this);
    this.onTextBoldChange = this.onTextBoldChange.bind(this);
    this.onTextUnderline = this.onTextUnderline.bind(this);
    this.onTextThroughline = this.onTextThroughline.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.setAlignLeft = this.setAlignLeft.bind(this);
    this.setAlignCenter = this.setAlignCenter.bind(this);
    this.setAlignRight = this.setAlignRight.bind(this);
}

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    changeTextX (x)  { 
        let y = this.props.currentElement.info().y;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);
        this.props.currentElement.info().x = x;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    changeTextY = (y) => {
        let x = this.props.currentElement.info().x;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);
        this.props.currentElement.info().y = y;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
 
     }

     changeTextR = (r) => {
        this.props.currentElement.info().rotation = r;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     }

     changeTextW = (w) => {
        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let h = this.props.currentElement.info().height; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);
        this.props.currentElement.info().width = w;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeTextH = (h) => {
        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let w = this.props.currentElement.info().width; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);    
        this.props.currentElement.info().height = h;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     }

    
     setAlignLeft (){
        this.props.currentElement.info().textAlign = 'left';
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     }

     setAlignCenter(){
        this.props.currentElement.info().textAlign = 'center';
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     }

     setAlignRight(){
        this.props.currentElement.info().textAlign = 'right';
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
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
        let color = value.hex;  
        this.setState({color})
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().color = color;
        this.props.updateScene(this.props.sceneIndex, newScene); 
    }
  

    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };


    onTextSizeChange = (value)=>{
        let textSize = value;   
        this.setState({textSize}); //record
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().textSize = textSize;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    onTextFamilyChange= (value)=>{
        let textFamily = value;   
        this.setState({textFamily}); //record
        const newScene = Object.assign({},this.props.currentScene);
        this.props.currentElement.info().fontfamily = textFamily;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    onTextBoldChange() {    
        const newScene = Object.assign({},this.props.currentScene);
        if(this.state.bold)
        {
            this.setState({bold:false}); //record
            this.props.currentElement.info().fontStyle = "normal";
        }else{
        this.setState({bold:true,italic:false}); //record
        this.props.currentElement.info().fontStyle = "bold";
    }
        this.props.updateScene(this.props.sceneIndex, newScene);
        
    }


    onTextItalicChange() {   
        const newScene = Object.assign({},this.props.currentScene);
        if(this.state.italic){
            this.setState({italic:false}); //record
            this.props.currentElement.info().fontStyle = "normal";
        }else{
        this.setState({italic:true,bold:false}); //record
        this.props.currentElement.info().fontStyle = "italic";
    }
        this.props.updateScene(this.props.sceneIndex, newScene);   
    }

    onTextUnderline() { 
        const newScene = Object.assign({},this.props.currentScene);
        if(this.state.textunderline){
            this.setState({textunderline:false}); //record
            this.props.currentElement.info().textDecorationLine = "normal";
        }else{
        this.setState({textunderline:true,textthroughline:false}); //record
        this.props.currentElement.info().textDecorationLine = "underline";
    }
        this.props.updateScene(this.props.sceneIndex, newScene);
        
    }

    onTextThroughline() {
        const newScene = Object.assign({},this.props.currentScene);
        if (this.state.textthroughline) {
            this.setState({textthroughline:false}); //record
            this.props.currentElement.info().textDecorationLine = "normal";
        } else {
            this.setState({textthroughline:true,extunderline:false}); //record
            this.props.currentElement.info().textDecorationLine = "line-through";
        }
        this.props.updateScene(this.props.sceneIndex, newScene);
        
    }

    onSliderChange = (value)=>{
        const newScene = Object.assign({},this.props.currentScene);
        this.setState({opacity:value}); //record
        this.props.currentElement.info().opacity = value/100;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    render() {
        const {currentElement} = this.props;
        const popover = {
            position: 'relative',
            zIndex: '66',
            float:'right',
            margin:'10px 15px 0px 0px',
            left: '0px',
        }
        const cover = {
            position: 'fixed',
        }

        return (
            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:'500px',overflow: 'auto'}}>
                <Divider>Position</Divider>
                <Row style={{margin: '5px 15px 0px 15px', fontSize: '14px'}}>
                <ButtonGroup style={{ width: '100%' , align :'center' }}>
                    <Button type="Default" icon="align-left"   style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} onClick = {this.setAlignLeft} ></Button>
                    <Button type="Default" icon="align-center" style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} onClick = {this.setAlignCenter} ></Button>
                    <Button type="Default" icon="align-right"  style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} onClick = {this.setAlignRight} ></Button>
                </ButtonGroup>
                </Row>

                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                   <Col span={6}><InputNumber min={0} max={700} value = {this.props.dragPos ? this.props.dragPos.x : currentElement.info().x } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                   onChange = {value => this.changeTextX(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                   <Col span={6}><InputNumber min={0} max={700} value = {this.props.dragPos ? this.props.dragPos.y : currentElement.info().y } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextY(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                   <Col span={6}><InputNumber min={-360} max={360} value={this.props.transformInfo ? this.props.transformInfo.r : currentElement.info().rotation} precision={0.1} formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextR(value)}
                   /></Col>  
                </Row>

                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                   <Col span={6}><InputNumber min={0} max={800} value={this.props.transformInfo ? this.props.transformInfo.w : currentElement.info().width} precision={0.1} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextW(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                   <Col span={6}><InputNumber min={0} max={450} value={this.props.transformInfo ? this.props.transformInfo.h : currentElement.info().height} precision={0.1} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeTextH(value)}
                   /></Col>
                   {/* <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col> */}
                </Row>

                <Divider>Character</Divider>
                <Row style={{margin: '0px 15px 0px 15px', fontSize: '14px'}}> 
                    <Select defaultValue={this.props.currentElement.info().fontfamily}
                    style={{ width: '100%' , align :'center' }}
                    onChange={value => this.onTextFamilyChange(value)}
                    >
                    <OptGroup label="中文">
                        <Option value="SimSun">宋体</Option>
                        <Option value="SimHei">黑体</Option>
                        <Option value="STHeiti Light">华文细黑</Option>
                        <Option value="FangSong">仿宋</Option>
                        <Option value="KaiTi">楷体</Option>
                        <Option value="LiSu">隶书</Option>
                    </OptGroup>
                    <OptGroup label="English">
                        <Option value="Helvetica">Helvetica</Option>
                        <Option value="Pingfang">Pingfang SC</Option>
                        </OptGroup>
                    </Select>
                </Row>

                <Row style={{margin: '10px 15px 0px 15px', fontSize: '14px'}}>
                <Col span={17} style={{margin: '0px 0px 0px 0px'}}>
                <Slider 
                   max={99}
                   min={0}
                   defaultValue={(this.props.currentElement.info().opacity)*100} 
                   tipFormatter={formatter} 
                   onChange={this.onSliderChange} 
                   onAfterChange={onAfterSliderChange} /> 
                </Col>
                <Col span={6} style={{margin: '5px 0px 0px 0px',float:'right'}}>
                        <InputNumber min={1} max={250} 
                        defaultValue={this.props.currentElement.info().textSize} 
                        onChange={value => this.onTextSizeChange(value)}
                        style={{width: '100%',float:'right'}}/>
                </Col>
                </Row>

                <Row style={{margin: '15px 15px 0px 15px', fontSize: '14px'}}>
                <Col span={18} style={{margin: '0px 0px 0px 0px'}}>
                <ButtonGroup style={{ width: '96%' , align :'center' }}>
                    <Button type="Default" icon="bold"  style={{width: '25%',margin: '0px 0px 0px 0px'}}  onClick = {this.onTextBoldChange}></Button>
                    <Button type="Default" icon="italic"  style={{width: '25%',margin: '0px 0px 0px 0px'}}  onClick = {this.onTextItalicChange}></Button>
                    <Button type="Default" icon="underline"  style={{width: '25%',margin: '0px 0px 0px 0px'}}  onClick = {this.onTextUnderline}></Button>
                    <Button type="Default" icon="strikethrough"   style={{width: '25%',margin: '0px 0px 0px 0px'}} onClick = {this.onTextThroughline}></Button>
                </ButtonGroup>
                </Col>

                <Col span={6} style={{margin: '0px 0px 0px 0px',float:'right'}}>
                <Button type="danger" block  style={{width: '100%',margin: '0px 0px 0px 0px',
                    backgroundColor:this.props.currentElement.info().color}} onClick={ this.handleColorClick } ></Button>
                    { this.state.displayColorPicker ? <div style={ popover }>
                    <div style={ cover } onClick={ this.handleColorClose }/>
                    <SketchPicker 
                     //color={this.state.color}  
                    onChange={this.handleColorChange} />
                    </div> : null }
                    </Col>
                </Row>
            </div>
        
        )
    }
}


