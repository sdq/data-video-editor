import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select, Slider, Input } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;
const { TextArea } = Input;

export default class TextTool extends Component {

    state = {
        displayColorPicker: false,
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
                <Divider>Content</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <TextArea style={{ padding: '5px 5px 0 5px'}} rows={3} />
                </Row>
                <Divider>Font</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>color</Col>
                    <Col span={8}>
                        <Button onClick={ this.handleClick }>Pick Color</Button>
                            { this.state.displayColorPicker ? <div style={ popover }>
                            <div style={ cover } onClick={ this.handleClose }/>
                            <SketchPicker />
                            </div> : null }
                    </Col>
                </Row>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>font</Col>
                    <Col span={11}>
                        <Select defaultValue="Helvetica" style={{ width: 120 }}>
                            <Option value="Helvetica">Helvetica</Option>
                            <Option value="Pingfang">Pingfang SC</Option>
                        </Select>
                    </Col>
                    <Col span={8}><InputNumber min={0} max={50} defaultValue={16} /></Col>
                </Row>
                <Divider>Time</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>Time</Col>
                    <Col span={20}>
                        <Slider range defaultValue={[0, 100]} />
                    </Col>
                </Row>
            </div>
        )
    }
}

