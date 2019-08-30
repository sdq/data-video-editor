import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select } from 'antd';
import ChartEditor from '@/components/ChartEditor';
import { SketchPicker } from 'react-color';

const { Option } = Select;

export default class ChartTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartvisible: false,
            displayColorPicker: false,
        };
        this.handleChartOk = this.handleChartOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChartEditor = () => {
        console.log("handleChartEditor");
        console.log(this.props.currentVis);
        this.props.openEditor(this.props.currentVis.dataIndex, this.props.currentVis.spec);
        this.setState({
            chartvisible: true,
        });
    }

    handleDataOk = () => {
        // TODO: Update Data

        // Disable editor
        this.setState({
            chartvisible: false,
        });
    }

    handleChartOk = () => {
        // Update chart on canvas
        const newScene = Object.assign({},this.props.currentScene);
        var newEle = Object.assign({},this.props.currentElement);
        newEle.info().spec = this.props.displaySpec;
        console.log("new element");
        console.log(newEle);
        newScene.updateElement(newEle, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newEle, this.props.elementIndex, elementName);
        // Disable editor
        this.setState({
            chartvisible: false,
        });
    }

    handleCancel() {
        this.setState({
            chartvisible: false,
        });
    };

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '100',
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

                <Divider>Chart</Divider>

                <Button block style={{marginTop: '8px'}} onClick={this.handleChartEditor} type="primary">Open Chart Editor</Button>

                <ChartEditor 
                    visible={this.state.chartvisible}
                    handleOk={this.handleChartOk}
                    handleCancel={this.handleCancel}
                    {...this.props}
                />
            </div>
        )
    }
}

