import React, { Component } from 'react'
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class EditToolBar extends Component {

    constructor(props) {
        super(props);
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
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

    render() {
        const { isElementSelected, copiedElement, isPerforming } = this.props;
        return (
            <div> 
                <ButtonGroup style = { {margin: '10px 0px 0px 20px', float:'left'} }>
                    <Button icon="copy" style = { {padding: '0 20px 0 20px'} } onClick={this.copyElement} disabled={!isElementSelected || isPerforming}/>
                    <Button icon="scissor" style = { {padding: '0 20px 0 20px'} } onClick={this.cutElement} disabled={!isElementSelected || isPerforming}/>
                    <Button icon="snippets" style = { {padding: '0 20px 0 20px'} } onClick={this.pasteElement} disabled={copiedElement === null || isPerforming}/>
                    <Button icon="delete" style = { {padding: '0 20px 0 20px'} } onClick={this.deleteElement} disabled={!isElementSelected || isPerforming}/>
                 </ButtonGroup>
                
                <ButtonGroup style = { {margin: '10px 20px 0 0', float:'right'} } >
                    <Button icon="undo" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming}/>
                    <Button icon="redo" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming}/>
                </ButtonGroup>

                <ButtonGroup style = { {margin: '10px 20px 0px 0px', float:'right'} }>
                   
                    <Button icon="pic-center" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming}/>
                    <Button icon="table" style = { {padding: '0 20px 0 20px'} } disabled={isPerforming}/>
                 </ButtonGroup>

                 <Button icon="font-size" style = { {width:'80px',margin: '10px 20px 0px 0px', float:'right'} } disabled={isPerforming}/>
            </div>
        )
    }
}