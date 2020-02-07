import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider } from 'antd';
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
        //this.handleColorClose();
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
        this.props.currentElement.info().fontFamily = textFamily;
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
        //TODO:目前让颜色选择器居中后，就无法点击其他区域消失，冲突需要解决
        const popover = {
            //position: 'absolute',
            position: 'relative',
            zIndex: '2',
            //float:'right',
            left: '-165px',
        }
        const cover = {
           // position: 'fixed',
            position:'relative',
            // top: '0px',
            // right: '0px',
            // bottom: '0px',
            // left: '0px',
        }

        return (
            <div style={{padding: '0px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:this.props.contentHeight-140+'px',overflow: 'auto'}}>

                <Divider>Properties</Divider>
                <Row style={{margin: '0px 15px 0px 15px', fontSize: '14px'}}> 
                    <Select defaultValue={this.props.currentElement.info().fontFamily ? this.props.currentElement.info().fontFamily : "Font"}
                    style={{ width: '100%' , align :'center' }}
                    onChange={value => this.onTextFamilyChange(value)}
                    >
                    <OptGroup label="中文">
                        <Option value="STSong">华文宋体</Option>
                        <Option value="STHeiti">华文黑体</Option>
                        <Option value="STHeiti Light">华文细黑</Option>
                        <Option value="STFangsong">华文仿宋</Option>
                        <Option value="STKaiti">华文楷体</Option>
                        <Option value="PingFang SC">苹方</Option>
                        <Option value="Songti SC">宋体-简</Option>
                        <Option value="Heiti SC">黑体-简</Option>
                        <Option value="Xingkai SC">行楷-简</Option>
                        <Option value="Yuanti SC">圆体-简</Option>
                    </OptGroup>
                    <OptGroup label="English">
                        <Option value="Helvetica">Helvetica</Option>
                        <Option value="San Francisco">San Francisco</Option>
                        <Option value="Arial">Arial</Option>
                        <Option value="Times New Roman">Times NewRoman</Option>
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
                    <Button  onClick={ this.handleColorClick} style={{width: '100%',margin: '0px 0px 0px 0px',background:this.props.currentElement.info().color,border:"#ffffff",verticalAlign: "middle"}}></Button> 
                     {this.state.displayColorPicker ? <div style={ popover }>
                     <div style={ cover } onClick={ this.handleColorClose } />
                     <SketchPicker color={this.props.currentElement.info().color}  onChange={this.handleColorChange}  />
                     </div>:null }
                    </Col>
                </Row>

                <Divider>Paragraph</Divider>
                <Row style={{margin: '10px 15px 0px 15px', fontSize: '14px'}}>
                <ButtonGroup style={{ width: '100%' , align :'center' }}>
                    <Button type="Default" icon="align-left"   style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} onClick = {this.setAlignLeft} ></Button>
                    <Button type="Default" icon="align-center" style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} onClick = {this.setAlignCenter} ></Button>
                    <Button type="Default" icon="align-right"  style={{width: '33.3%',Align:'center',margin: '0px 0px 0px 0px'}} onClick = {this.setAlignRight} ></Button>
                </ButtonGroup>
                </Row>

            </div>
        
        )
    }
}


