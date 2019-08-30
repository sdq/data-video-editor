import React, { Component } from 'react'
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class EditToolBar extends Component {
    render() {
        return (
            <div> 
                <ButtonGroup style = { {margin: '10px 0px 0px 20px', float:'left'} }>
                    <Button icon="copy" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="snippets" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="scissor" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="delete" style = { {padding: '0 20px 0 20px'} }/>
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