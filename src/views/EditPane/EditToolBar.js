import React, { Component } from 'react'
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class EditToolBar extends Component {
    render() {
        return (
            <div>
                <ButtonGroup style = { {margin: '10px 10px 0 0', float:'right'} }>
                    <Button icon="undo" style = { {padding: '0 20px 0 20px'} }/>
                    <Button icon="redo" style = { {padding: '0 20px 0 20px'} }/>
                </ButtonGroup>
            </div>
        )
    }
}
