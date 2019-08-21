import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select } from 'antd';
import { SketchPicker } from 'react-color';

const { Option } = Select;

export default class ImageTool extends Component {

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
                <Divider>Position</Divider>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>X</Col>
                    <Col span={8}><InputNumber min={0} max={600} defaultValue={10} /></Col>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>Y</Col>
                    <Col span={8}><InputNumber min={0} max={600} defaultValue={10} /></Col>
                </Row>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>W</Col>
                    <Col span={8}><InputNumber min={0} max={600} defaultValue={100} /></Col>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>H</Col>
                    <Col span={8}><InputNumber min={0} max={600} defaultValue={100} /></Col>
                </Row>
                <Row style={{margin: '10px 0px 0px 0px', fontSize: '14px'}}>
                    <Col span={4} style={{textAlign:'center', padding: '5px 5px 0 5px'}}>R</Col>
                    <Col span={8}><InputNumber min={-180} max={180} defaultValue={0} /></Col>
                </Row>
                <Divider>Style</Divider>
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
            </div>
        )
    }
}

