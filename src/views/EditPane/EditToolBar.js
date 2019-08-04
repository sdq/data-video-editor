import React, { Component } from 'react'
import {Button} from 'antd';

const ButtonGroup = Button.Group;

export default class EditToolBar extends Component {
    render() {
        return (
            <div>
                <Button icon="undo" />
                <Button icon="redo" />
            </div>
        )
    }
}
