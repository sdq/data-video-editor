import React, { Component } from 'react'
import { Upload, Row, Col, Divider, Button, Slider, Icon, Select } from 'antd';
import DataPreview from '@/components/DataPreview';
import ChartEditor from '@/components/ChartEditor';
import ChartContainer from '@/charts/ChartContainer';
import { SketchPicker } from 'react-color';

const { Dragger } = Upload;
const { Option, OptGroup } = Select;

export default class ChartTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datavisible: false,
            chartvisible: false,
            displayColorPicker: false,
        };
        this.handleDataPreview = this.handleDataPreview.bind(this);
        this.handleDataOk = this.handleDataOk.bind(this);
        this.handleChartOk = this.handleChartOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    handleChartEditor = () => {
        this.props.openEditor(this.props.currentVis.dataIndex, this.props.currentVis.spec);
        this.setState({
            chartvisible: true,
        });
    }

    handleDataOk = () => {
        // Todo: Update Data

        // Disable editor
        this.setState({
            datavisible: false,
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
        newScene.elements[this.props.elementIndex] = newEle;
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.updateElement(newEle, this.props.elementIndex);
        // Disable editor
        this.setState({
            datavisible: false,
            chartvisible: false,
        });
    }

    handleCancel() {
        this.setState({
            datavisible: false,
            chartvisible: false,
        });
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
                <Row style={{ width: 280, fontSize: '14px' }}>
                    {/* <Col span={4} style={{textAlign:'center', marginTop: '12px'}}>Data</Col> */}
                    <Col span={16}><Select defaultValue="cars" style={{ marginTop: '8px', width: 182 }}>
                        {/* <Option value="none">no data</Option> */}
                        <Option value="cars">cars.csv</Option>
                    </Select></Col>
                    <Col span={8}>
                        <Upload
                            accept=".csv"
                            showUploadList={false}
                            beforeUpload={file => {
                                console.log("get file");
                                const reader = new FileReader();
                                reader.onload = e => {
                                    console.log(e.target.result);
                                };
                                reader.readAsText(file);
                                // Prevent upload
                                return false;
                            }}
                            style={{height: 20}}
                        >
                            <Button style={{ marginTop: '8px', width: 93 }}>
                            <Icon type="upload" /> add
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                
                <Button block style={{marginTop: '8px'}} onClick={this.handleDataPreview}>Preview Data</Button>

                <Divider>Chart</Divider>

                <Button block style={{marginTop: '8px'}} onClick={this.handleChartEditor}>Edit Chart</Button>

                <Divider>Animation</Divider>
                <Select defaultValue="None" style={{ width: 280 }}>
                    <OptGroup label="None">
                    <Option value="None">None</Option>
                    </OptGroup>
                    <OptGroup label="Appear">
                        <Option value="Animation1">Animation1</Option>
                        <Option value="Animation2">Animation2</Option>
                    </OptGroup>
                    <OptGroup label="Disappear">
                        <Option value="Animation3">Animation3</Option>
                        <Option value="Animation4">Animation4</Option>
                    </OptGroup>
                </Select>
                
                {/* <Divider>Style</Divider>
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
                <DataPreview 
                    visible={this.state.datavisible}
                    handleOk={this.handleDataOk}
                    handleCancel={this.handleCancel}
                    {...this.props}
                />
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

