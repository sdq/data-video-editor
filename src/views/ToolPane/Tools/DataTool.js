import React, { Component } from 'react'
import { Upload, Button, Icon, Select } from 'antd';
import DataPreview from '@/components/DataPreview';
import ChartEditor from '@/components/ChartEditor';
import SimpleDataPreview from '@/components/DataPreview/SimpleDataPreview';
import * as d3 from 'd3';

const { Dragger } = Upload;
const { Option } = Select;

export default class DataTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datavisible: false,
            chartvisible: false,
        };
        this.handleDataPreview = this.handleDataPreview.bind(this);
        this.handleDataOk = this.handleDataOk.bind(this);
        this.handleChartOk = this.handleChartOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    handleDataPreview = () => {
        this.setState({
            datavisible: true,
        });
    }

    handleDataOk = () => {
        // TODO: Update Data

        // Disable editor
        this.setState({
            datavisible: false,
        });
    }

    handleChartEditor = () => {
        this.props.openEditor(this.props.currentVis.dataIndex, this.props.currentVis.spec);
        this.setState({
            chartvisible: true,
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
            datavisible: false,
        });
    };

    render() {
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white'}}>
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

                <SimpleDataPreview />
                
                <Button block style={{marginTop: '8px'}} onClick={this.handleDataPreview} type="primary">Preview & Edit Data</Button>

                <Button block style={{marginTop: '8px'}} onClick={this.handleChartEditor} type="primary">Data Mapping</Button>

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

