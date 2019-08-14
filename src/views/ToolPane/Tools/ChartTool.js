import React, { Component } from 'react'
import { Upload, Row, Col, Divider, Button, Slider, Icon } from 'antd';
import DataPreview from '../../../components/DataPreview';
import { SketchPicker } from 'react-color';

const { Dragger } = Upload;

export default class ChartTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datavisible: false,
            displayColorPicker: false,
        };
        this.handleDataPreview = this.handleDataPreview.bind(this);
        this.handleDataOk = this.handleDataOk.bind(this);
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleDataPreview = () => {
        this.setState({
            datavisible: true,
        });
    }

    handleDataOk = () => {
        this.setState({
            datavisible: false,
        });
    }

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
                <Button block style={{marginTop: '8px'}} onClick={this.handleDataPreview}>Preview Data</Button>

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
                <DataPreview 
                    visible={this.state.datavisible}
                    handleOk={this.handleDataOk}
                />
            </div>
        )
    }
}

