import React, { Component } from 'react';
import { Input, Button } from 'antd';
import ElementType from '../../constants/ElementType';
import {Element, TextInfo} from '../../models/Element';
//import Scene from '../../models/Scene';
const { TextArea } = Input;

export default class TextTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.addText = this.addText.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    addText() {
        //add text to scene
        if (this.state.value === "") {
            return
        }
        const newScene = Object.assign({},this.props.currentScene);
        const newText = new TextInfo(this.state.value, 200, 360);
        const newElement = new Element(ElementType.TEXT, newText);
        newScene.elements.push(newElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    render() {
        return (
            <div>
                <TextArea rows={4} onChange={this.handleChange}/>
                <Button style={{float: 'right', margin: "10px 0 0 0"}} onClick={this.addText}>Add</Button>
            </div>
        )
    }
}
