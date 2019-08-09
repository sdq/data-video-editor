import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider, Input } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;
const { TextArea } = Input;

export default class SceneTool extends Component {

    state = {
        displayColorPicker: false,
        inputValue: 1,
    };

    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px'}}>
                <Divider>Script</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <TextArea style={{ padding: '5px 5px 0 5px'}} rows={3} />
                </Row>
                {/* <Divider>Background</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>color</Col>
                    <Col span={8}>
                        <Button onClick={ this.handleClick }>Pick Color</Button>
                            { this.state.displayColorPicker ? <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                            <SketchPicker />
                            </div> : null }
                    </Col>
                </Row> */}
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

