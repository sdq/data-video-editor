import React, { Component } from 'react'
import { Upload, Row, Col, Divider, Button, Slider, Icon } from 'antd';
import { SketchPicker } from 'react-color';

const { Dragger } = Upload;

export default class ChartTool extends Component {

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
                <Divider>Data</Divider>
                <Dragger>
                    <p className="ant-upload-drag-icon">
                    <Icon type="database" />
                    </p>
                    <p className="ant-upload-text">Click or drag data to this area</p>
                    <p className="ant-upload-hint">
                    Support for CSV file
                    </p>
                </Dragger>
                <Divider>Encoding</Divider>
                
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

