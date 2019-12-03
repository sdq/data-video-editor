import React, { Component } from 'react'
import {Button,Modal,Col,Row,Menu, Dropdown,Icon} from 'antd';
import {Element,TextInfo} from '@/models/Element';
import ElementType from '@/constants/ElementType';
import Color from '@/constants/Color';
import _ from 'lodash';
import './editpane.css';

const ButtonGroup = Button.Group;

//目前仅支持中文长度识别
let defaultText = new TextInfo(
    "输入文字",
    360,
    220, //随机高度，避免重复?
    0,
    'black',
    20,
    'Kavivanar',
    'normal',
    'normal',
    1,
    'left',
)





export default class EditToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            canvasW: 800*(this.props.contentHeight-100)/450,
            canvasH: this.props.contentHeight-100,
        };
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.addText = this.addText.bind(this);
        this.newRect = this.newRect.bind(this);
        this.newLine = this.newLine.bind(this);
        this.newCircle = this.newCircle.bind(this);
        this.newTriangle = this.newTriangle.bind(this);
    }

    copyElement() {
        this.props.copyElement();
    }

    cutElement() {
        this.props.cutElement();
    }

    pasteElement() {
        this.props.pasteElement();
    }

    deleteElement() {
        this.props.deleteElement();
    }

    addText = () => {       
        //defaultText.y = defaultText.y+Math.ceil(Math.random()*30);
        const newTextElement = new Element(ElementType.TEXT, defaultText);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newTextElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    newRect= () => {   
       // console.log("??/");
    }
    newLine= () => {   
      //  console.log("??/");
    }
    newCircle= () => {   
      //  console.log("??/");
    }
    newTriangle= () => {   
      //  console.log("??/");
    }



    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };


      //TODO:快速对齐功能待测试
      
      setElementPos = pos =>{  
      //use the real material‘s  size
        switch (pos) {
            case 'TL' :
                this.props.currentElement.info().x = 0;
                this.props.currentElement.info().y = 0;
                break;
            case 'Top' :
                this.props.currentElement.info().x = 400-this.props.currentElement.info().width/2;
                this.props.currentElement.info().y = 0;
                    break;
            case 'TR' :
                this.props.currentElement.info().x = 800-this.props.currentElement.info().width;
                this.props.currentElement.info().y = 0;
                    break;
            case 'Left' :
                this.props.currentElement.info().x = 0;
                this.props.currentElement.info().y = 225-this.props.currentElement.info().height/2;
                    break;
            case 'Center' :
                this.props.currentElement.info().x = 400-this.props.currentElement.info().width/2;
                this.props.currentElement.info().y = 225-this.props.currentElement.info().height/2;
                    break;
            case 'Right' :
                this.props.currentElement.info().x = 800-this.props.currentElement.info().width;
                this.props.currentElement.info().y = 225-this.props.currentElement.info().height/2;
                    break;
            case 'BL' :
                this.props.currentElement.info().x = 0;
                this.props.currentElement.info().y = 450-this.props.currentElement.info().height;
                    break;
            case 'Bottom' :
                this.props.currentElement.info().x = 400-this.props.currentElement.info().width/2;
                this.props.currentElement.info().y = 450-this.props.currentElement.info().height;
                    break;
            case 'BR' :
                this.props.currentElement.info().x = 800-this.props.currentElement.info().width;
                this.props.currentElement.info().y = 450-this.props.currentElement.info().height;
                   break;
            default :
                    return null     
        }
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
      }
      
  


    showGrid= () => {    
        if(this.props.showGridLines) {
            this.props.setIsShowGridLines(false)
        } else {
            this.props.setIsShowGridLines(true)
        }
    }

    undoCanvas = () => {
        this.props.undoCanvas(this.props.sceneIndex);
        this.props.updateElement()
    }

    redoCanvas = () => {        
        this.props.redoCanvas(this.props.sceneIndex);
    }

    render() {
        const menu = (
            <Menu>
              <Menu.Item onclick={this.newRect()}>
                <Icon type="border" style={{fontSize: '20px',left:"50px"}}/>
              </Menu.Item>
              <Menu.Item onclick={this.newLine()}>
                <Icon type="minus" style={{fontSize: '20px',left:"50px"}} />  
              </Menu.Item>
              <Menu.Item onclick={this.newCircle()}>
                <Icon type="minus-circle" style={{fontSize: '20px',left:"50px"}} />
              </Menu.Item>
              <Menu.Item onclick={this.newTriangle()}>
                <Icon type="caret-up" style={{fontSize: '20px',left:"50px"}}/>
              </Menu.Item>
            </Menu>
          );

        const { isElementSelected, copiedElement, isPerforming, past , future, sceneIndex} = this.props;
        let currentPast = past[sceneIndex];
        let currentFuture = future[sceneIndex];
        return (
            <div id='edittoolbar' style={{ background: Color.LIGHT_ORANGE }}> 
                <ButtonGroup style = { {margin: '10px 0px 0px 20px', float:'left'} }>
                    <Button icon="copy" style = { {padding: '0 20px 0 20px'} } onClick={this.copyElement} disabled={!isElementSelected || isPerforming}/>
                    <Button icon="scissor" style = { {padding: '0 20px 0 20px'} } onClick={this.cutElement} disabled={!isElementSelected || isPerforming}/>
                    <Button icon="snippets" style = { {padding: '0 20px 0 20px'} } onClick={this.pasteElement} disabled={copiedElement === null || isPerforming}/>
                    <Button icon="delete" style = { {padding: '0 20px 0 20px'} } onClick={this.deleteElement} disabled={!isElementSelected || isPerforming}/>
                </ButtonGroup>
                
                <ButtonGroup style = { {margin: '10px 20px 0 0', float:'right'} } >
                    <Button icon="undo" style = { {padding: '0 20px 0 20px'} } onClick={this.undoCanvas} disabled={isPerforming || currentPast.length === 0}/>
                    <Button icon="redo" style = { {padding: '0 20px 0 20px'} } onClick={this.redoCanvas} disabled={isPerforming || currentFuture.length === 0}/>
                </ButtonGroup>

                <ButtonGroup id = "assist-position" style = { {margin: '10px 20px 0px 0px', float:'right'} }>
                <Button id = "quickalign" icon="pic-center" style = { {padding: '0 20px 0 20px'} } disabled={!isElementSelected || isPerforming} onClick={this.showModal}/> 
                <Modal
                     //title="Quick Align"
                     visible={this.state.visible}
                     closable = {false}
                     keyboard = {true}
                     footer={null}
                     mask = {false}
                     maskClosable = {true}
                     onOk={this.handleOk}
                     onCancel={this.handleCancel}
                     width = {100}
                     placement="bottomRight"
                     //modal位置根据拉伸后画布及按钮位置动态计算
                     style={{ top: 115 , left : document.getElementById('quickalign') ? (document.getElementById('assist-position').offsetLeft-450)/2 : 200}} 
                     //getContainer = {document.getElementById('quickalign')}
                    >
                    <Row>
                     <Col span={8}> <button type="button" id = 'TL'  onClick = {()=> this.setElementPos('TL')} > </button></Col>
                     <Col span={8}> <button type="button" id = 'Top' onClick = {()=> this.setElementPos('Top')} > </button></Col>
                     <Col span={8}> <button type="button" id = 'TR'  onClick = {()=> this.setElementPos('TR')} > </button></Col>
                     </Row>
                     <Row>
                     <Col span={8}> <button type="button" id = 'Left'   onClick = {()=> this.setElementPos('Left' )} > </button></Col>
                     <Col span={8}> <button type="button" id = 'Center' onClick = {()=> this.setElementPos('Center')} > </button></Col>
                     <Col span={8}> <button type="button" id = 'Right'  onClick = {()=> this.setElementPos('Right' )} > </button></Col>
                     </Row>
                     <Row>
                     <Col span={8}> <button type="button" id = 'BL'     onClick = {()=> this.setElementPos('BL')} > </button></Col>
                     <Col span={8}> <button type="button" id = 'Bottom' onClick = {()=> this.setElementPos('Bottom')} > </button></Col>
                     <Col span={8}> <button type="button" id = 'BR'     onClick = {()=> this.setElementPos('BR')} > </button></Col>
                    </Row>
                </Modal> 
                <Button icon="table" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming} onClick={this.showGrid}/>
                </ButtonGroup>

                <Button icon="font-size" style = { {width:'80px',margin: '10px 20px 0px 0px', float:'right'} } disabled={isPerforming}  onClick={this.addText}/>
                
                <Dropdown overlay={menu}>
                <Button style = { {width:'80px',margin: '10px 20px 0px 0px', float:'right'} }>
                <Icon style={{ fontSize: '20px' }} type="block" />
                <Icon type="down" />
                </Button>
                </Dropdown>
            </div>
        )
    }
}
