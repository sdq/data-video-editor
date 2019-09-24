import React, { Component } from 'react'
import {Button} from 'antd';
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
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.addText = this.addText.bind(this);
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
                   
                    {/* <Button icon="pic-center" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming}/> */}
                    <Button icon="table" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming} onClick={this.showGrid}/>
                 </ButtonGroup>

                 <Button icon="font-size" style = { {width:'80px',margin: '10px 20px 0px 0px', float:'right'} } disabled={isPerforming}  onClick={this.addText}/>
            </div>
        )
    }
}