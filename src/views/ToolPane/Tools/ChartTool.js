import React, { Component } from 'react'
import { Upload, Divider, Button, Icon, Select } from 'antd';
import DataPreview from '@/components/DataPreview';
import ChartEditor from '@/components/ChartEditor';
// import ChartContainer from '@/charts/ChartContainer';
// import { SketchPicker } from 'react-color';
import * as d3 from 'd3';

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
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px'}}>
                <Divider>Data</Divider>
                <Dragger
                    accept=".csv"
                    showUploadList={false}
                    beforeUpload={file => {
                        console.log(file.name);
                        const fileURL = URL.createObjectURL(file);
                        console.log(fileURL);
                        d3.csv(fileURL, function(data) {
                            console.log(data);
                            //TODO: deal with data
                        })
                        return false;
                    }}
                >
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    {/* <p className="ant-upload-text">Click or drag csv file to this area</p> */}
                    <p className="ant-upload-hint">
                    Click or drag csv file to this area
                    </p>
                </Dragger>

                <Select defaultValue="cars" style={{ marginTop: '8px', width: 280 }}>
                    <Option value="cars">cars.csv</Option>
                </Select>
                
                <Button block style={{marginTop: '8px'}} onClick={this.handleDataPreview}>Preview & Edit Data</Button>

                <Divider>Chart</Divider>

                <Button block style={{marginTop: '8px'}} onClick={this.handleChartEditor} type="primary">Open Chart Editor</Button>

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

