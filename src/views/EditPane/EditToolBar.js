import React, { Component } from 'react'
import {Button,Modal,Col,Row,Menu, Dropdown,Icon} from 'antd';
import {Element,TextInfo,ShapeInfo} from '@/models/Element';
import ElementType from '@/constants/ElementType';
import Color from '@/constants/Color';
import _ from 'lodash';
import './editpane.css';

const ButtonGroup = Button.Group;

//目前仅支持中文长度识别
let defaultText = new TextInfo(
    "输入文字",
    360,
    220, 
    0,
    'black',
    20,
    'Kavivanar',
    'normal',
    'normal',
    1,
    'left',
)

let defaultRect = new ShapeInfo(
    "rect",
    250,
    125, 
    0,
    Color.ORANGE,
    1,
    300,
    200,
    'black',
    2,
)


let defaultLine = new ShapeInfo(
    "line",
    120,
    120, 
    0,
    Color.ORANGE,
    1,
    300,
)

let defaultCircle = new ShapeInfo(
    "circle",
    300,
    125, 
    0,
    Color.ORANGE,
    1,
    200,
    200,
)

let defaultEllipse = new ShapeInfo(
    "ellipse",
    300,
    175, 
    0,
    Color.ORANGE,
    1,
    200,
    100,
)



let defaultStar = new ShapeInfo(
    "star",
    300,
    125, 
    0,
    Color.ORANGE,
    1,
    200,
    200,
)


let defaultArrow = new ShapeInfo(
    "arrow",
    140,
    140, 
    0,
    Color.ORANGE,
    1,
    300,
    20,
)

const EllSvg = () => (
   <svg width="1.5em" height="1.5em" fill="gray" viewBox="0 0 1024 1024" version="1.1" 
   xmlns="http://www.w3.org/2000/svg" p-id="2167" ><path d="M532.5 839.7c220.9 0 409.6-152.6 409.6-327.7S753.4 184.3 532.5 184.3C270.6 184.3 81.9 336.9 81.9 512s188.7 327.7 450.6 327.7z m0 81.9C226.1 921.6 0 734.5 0 512s226.1-409.6 532.5-409.6c265.4 0 491.5 187.1 491.5 409.6S797.9 921.6 532.5 921.6z" p-id="2168"></path></svg>
  );
const EllIcon = props => <Icon component={EllSvg} {...props} />;

const CircleSvg = () => (
    <svg width="1.5em" height="1.5em" fill="gray" viewBox="0 0 1024 1024" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" p-id="2279"><path d="M512 1024c282.7776 0 512-229.2224 512-512S794.7776 0 512 0 0 229.2224 0 512s229.2224 512 512 512z m0-102.4a409.6 409.6 0 1 1 0-819.2 409.6 409.6 0 0 1 0 819.2z" p-id="2280"></path></svg>
    );
const CircleIcon = props => <Icon component={CircleSvg} {...props} />;

const ArrowSvg = () => (
    <svg width="1.5em" height="1.5em" fill="gray" viewBox="0 0 1024 1024" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" p-id="7432" ><path d="M512 174.30895499c8.142447 0 15.950274 3.234671 21.707394 8.99179201l255.82655 255.82655c11.988032 11.989055 11.988032 31.425733 0 43.414789-11.989055 11.990079-31.426757 11.990079-43.415812 1e-8l-234.118132-234.118132-234.11915501 234.11813199c-11.988032 11.990079-31.426757 11.990079-43.41478899 0-11.989055-11.989055-11.989055-31.425733 0-43.414789l255.82655-255.82655C496.049726 177.543625 503.85857601 174.308955 512 174.30895499z" p-id="7433"></path><path d="M512 174.30895499c16.954137 0 30.699186 13.745049 30.699186 30.69918601l0 613.983719c0 16.954137-13.745049 30.699186-30.699186 30.699186s-30.699186-13.745049-30.699186-30.699186l0-613.983719C481.300814 188.054003 495.045863 174.308955 512 174.30895499z" p-id="7434"></path></svg>
    );
const ArrowIcon = props => <Icon component={ArrowSvg} {...props} />;



export default class EditToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            canvasW: 800*(this.props.contentHeight-100)/450,
            canvasH: this.props.contentHeight-100,
            copiedElement: "",
        };
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.addText = this.addText.bind(this);
        this.newRect = this.newRect.bind(this);
        this.newLine = this.newLine.bind(this);
        this.newCircle = this.newCircle.bind(this);
        this.newEllipse = this.newEllipse.bind(this);
        this.newStar = this.newStar.bind(this);
        this.newArrow = this.newArrow.bind(this);
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
        //defaultText.y = defaultText.y+Math.ceil(Math.random()*30);        //随机高度  
        const newTextElement = new Element(ElementType.TEXT, defaultText);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newTextElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    newRect= () => {   
        const newShapeElement = new Element(ElementType.SHAPE, defaultRect);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newShapeElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }
    newLine= () => {   
        const newShapeElement = new Element(ElementType.SHAPE, defaultLine);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newShapeElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }
    newCircle= () => {   
        const newShapeElement = new Element(ElementType.SHAPE, defaultCircle);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newShapeElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }
    newEllipse= () => {   
        const newShapeElement = new Element(ElementType.SHAPE, defaultEllipse);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newShapeElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }
    newStar= () => {   
        const newShapeElement = new Element(ElementType.SHAPE, defaultStar);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newShapeElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }
    newArrow= () => {   
        const newShapeElement = new Element(ElementType.SHAPE, defaultArrow);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.addElement(newShapeElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
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
      

    // showPath= () => {    
    //     if(this.props.showPathAnimator) {
    //         this.props.setIsshowPathAnimator(false)
    //     } else {
    //         this.props.setIsshowPathAnimator(true)
    //     }
    // }

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
              <Menu.Item onClick={this.newRect}>
                <Icon type="border" style={{fontSize: '20px',left:"50px"}}/>Rect
              </Menu.Item>
              <Menu.Item onClick={this.newLine}>
                <Icon type="minus" style={{fontSize: '20px',left:"50px"}} />Line
              </Menu.Item>
              <Menu.Item onClick={this.newCircle}>
              <CircleIcon style={{left:"50px" }} />Circle
              </Menu.Item>
              <Menu.Item onClick={this.newEllipse}>
                <EllIcon style={{left:"50px" }} />Ellipse
              </Menu.Item>
              <Menu.Item onClick={this.newArrow}>
              <ArrowIcon style={{left:"50px" }} />Arrow
              </Menu.Item>
              <Menu.Item onClick={this.newStar}>
                <Icon type="star" style={{fontSize: '20px',left:"50px"}}/>Star
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
