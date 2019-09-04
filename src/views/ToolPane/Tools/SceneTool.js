import React, { Component } from 'react'
import { Row, Divider, Button, Input } from 'antd';
import ElementType from '@/constants/ElementType';
import {Element, TextInfo} from '@/models/Element';

const { TextArea } = Input;

export default class SceneTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            value: "",
            inputValue: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.addText = this.addText.bind(this);
    }

    handleChange(e) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.script(e.target.value);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    addText() {
        //add text to scene
        if (this.state.value === "") {
            console.log("nothings")
            return
        }
        const newScene = Object.assign({},this.props.currentScene);
        const newText = new TextInfo(this.state.value, 200, 360);
        const newElement = new Element(ElementType.TEXT, newText);
        newScene.addElement(newElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    onChange = value => {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.duration(value);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };

    render() {
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white'}}>
                <Divider>Script</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <TextArea style={{ padding: '5px 5px 0 5px'}} rows={5} value={this.props.currentScene.script()} onChange={this.handleChange}/>
                    <Button style={{float: 'right', margin: "10px 0 0 0"}} onClick={this.addText}>Add</Button>
                </Row>
            </div>
        )
    }
}

