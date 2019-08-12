import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Slider, Input } from 'antd';
import ElementType from '../../../constants/ElementType';
import {Element, TextInfo} from '../../../models/Element';

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
        this.setState({value: e.target.value});
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
        newScene.elements.push(newElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };

    render() {
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px'}}>
                <Divider>Script</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <TextArea style={{ padding: '5px 5px 0 5px'}} rows={5} onChange={this.handleChange}/>
                    <Button style={{float: 'right', margin: "10px 0 0 0"}} onClick={this.addText}>Add</Button>
                </Row>
                <Divider>Duration</Divider>
                <Row style={{margin: '10px 0px 0px 10px', fontSize: '14px'}}>
                    <Col span={14}>
                        <Slider
                            min={1}
                            max={20}
                            onChange={this.onChange}
                            value={typeof this.state.inputValue === 'number' ? this.state.inputValue : 0}
                        />
                    </Col>
                    <Col span={10}>
                        <InputNumber
                            min={1}
                            max={20}
                            style={{ marginLeft: 8 }}
                            value={this.state.inputValue}
                            onChange={this.onChange}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

