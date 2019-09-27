import React, { Component } from 'react'
import {Button,Modal,Col,Row} from 'antd';
import { Element, TextInfo} from '@/models/Element';
import ElementType from '@/constants/ElementType';
import Color from '@/constants/Color';
import './editpane.css';

const ButtonGroup = Button.Group;

const defaultText = new TextInfo(
    "please input your text",
    300,
    250,
    0,
    'black',
    20,
    'Kavivanar',
    'normal',
    '',
)



export default class EditToolBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.addText = this.addText.bind(this);
        //this.setElementPos = this.setElementPos.bind(this);
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
        const newTextElement = new Element(ElementType.TEXT, defaultText);
        const newScene = Object.assign({},this.props.currentScene);
        newScene.addElement(newTextElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

      setElementPos = pos =>{  
        //console.log(pos);
        // 画布大小到底是多少？为什么和图表尺度不一样？
        switch (pos) {
            case 'TL' :
                this.props.currentElement.info().x = 0;
                this.props.currentElement.info().y = 0;
                break;
            case 'Top' :
                console.log(this.props.currentElement.info().width);
                this.props.currentElement.info().x = 400-this.props.currentElement.info().width/2;
                this.props.currentElement.info().y =0;
                    break;
            case 'TR' :
                this.props.currentElement.info().x = 800-this.props.currentElement.info().width/2;
                this.props.currentElement.info().y = 0;
                    break;
            case 'Left' :
                this.props.currentElement.info().x = 0;
                this.props.currentElement.info().y = 200-this.props.currentElement.info().height/2;
                    break;
            case 'Center' :
                this.props.currentElement.info().x = 400-this.props.currentElement.info().width/2;
                this.props.currentElement.info().y =225-this.props.currentElement.info().height/2;
                    break;
            case 'Right' :
                this.props.currentElement.info().x = 800;
                this.props.currentElement.info().y =225-this.props.currentElement.info().height/2;
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
                    return '如果以上都不是，那么必须使用default返回，哪怕是 null'

        
        }
        
        const newScene = Object.assign({},this.props.currentScene);
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
    }

    redoCanvas = () => {        
        this.props.redoCanvas(this.props.sceneIndex);
    }

    render() {
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

                <ButtonGroup style = { {margin: '10px 20px 0px 0px', float:'right'} }>
                <Button icon="pic-center" style = { {padding: '0 20px 0 20px'} } disabled={!isElementSelected || isPerforming} onClick={this.showModal}/> 
                 <Modal
                    //title="Basic Modal"
                     visible={this.state.visible}
                     closable = {false}
                     footer={null}
                     mask = {false}
                     maskClosable = {true}
                     onOk={this.handleOk}
                     onCancel={this.handleCancel}
                     width = {100}
                     placement="bottomRight"
                     //style={{ top: 20 }} //position of click
                    >



                    <Row>
                     <Col span={8}> <button type="button" id = 'TL'  onClick = {(value)=> this.setElementPos('TL')} > </button></Col>
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

                {/* <Popconfirm
                 placement="bottomRight"
                 icon={null}
                 //title={text}
                 //onConfirm={confirm}
                 okText="Yes"
                 cancelText="No"                                 
                  >
                    <Button icon="pic-center" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming} onClick={this.showModal}/> 
                </Popconfirm> */}


                <Button icon="table" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming} onClick={this.showGrid}/>
                </ButtonGroup>

                 <Button icon="font-size" style = { {width:'80px',margin: '10px 20px 0px 0px', float:'right'} } disabled={isPerforming}  onClick={this.addText}/>
            </div>
        )
    }
}