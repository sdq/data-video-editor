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
        const { isElementSelected, copiedElement } = this.props;
        return (
            <div> 
                <ButtonGroup style = { {margin: '10px 0px 0px 20px', float:'left'} }>
                    <Button icon="copy" style = { {padding: '0 20px 0 20px'} } onClick={this.copyElement} disabled={!isElementSelected}/>
                    <Button icon="scissor" style = { {padding: '0 20px 0 20px'} } onClick={this.cutElement} disabled={!isElementSelected}/>
                    <Button icon="snippets" style = { {padding: '0 20px 0 20px'} } onClick={this.pasteElement} disabled={copiedElement === null}/>
                    <Button icon="delete" style = { {padding: '0 20px 0 20px'} } onClick={this.deleteElement} disabled={!isElementSelected}/>
                 </ButtonGroup>
                
                <ButtonGroup style = { {margin: '10px 20px 0 0', float:'right'} }>
                    <Button icon="undo" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="redo" style = { {padding: '0 20px 0 20px'} }/>
                </ButtonGroup>

                <ButtonGroup style = { {margin: '10px 20px 0px 0px', float:'right'} }>
                   
                    <Button icon="pic-center" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="table" style = { {padding: '0 20px 0 20px'} }/>
                 </ButtonGroup>

                 <Button icon="font-size" style = { {width:'80px',margin: '10px 20px 0px 0px', float:'right'} }/>
            </div>
        )
    }
}