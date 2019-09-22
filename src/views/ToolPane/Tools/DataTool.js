import React, { Component } from 'react'
import { Upload, Button, Icon, Select } from 'antd';
import DataPreview from '@/components/DataPreview';
import ChartEditor from '@/components/ChartEditor';
import SimpleDataPreview from '@/components/DataPreview/SimpleDataPreview';
import DataProcessor from '@/components/DataPreview/processor';

const { Dragger } = Upload;
const { Option } = Select;
const dataProcessor = new DataProcessor();

export default class DataTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datavisible: false,
            chartvisible: false,
            selectValue: "cars.csv"
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

    handleDataOk = (data) => {
        // TODO: Update Data

        // Disable editor
        console.log(data)
        this.setState({
            datavisible: false,
        });
    }

    handleDataUpdate = (data) => {
        this.props.updateData(this.props.dataIndex, data, this.props.fieldsList[this.props.dataIndex])
    }


    handleChartEditor = () => {
        this.props.openEditor(this.props.currentVis.dataIndex, this.props.currentVis.spec);
        this.setState({
            chartvisible: true,
        });
    }

    handleChartOk = () => {
        // Update chart on canvas
        const newScene = Object.assign({}, this.props.currentScene);
        var newEle = Object.assign({}, this.props.currentElement);
        newEle.info().spec = this.props.displaySpec;
        newScene.updateElement(newEle, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newEle, this.props.elementIndex, elementName);
        // Disable editor
        this.setState({
            chartvisible: false,
        });
    }

    handleCancel = () => {
        this.setState({
            chartvisible: false,
            datavisible: false,
        });
    };

    beforeUpload = (file) => {
        const fileURL = URL.createObjectURL(file);
        dataProcessor.process(fileURL).then((dataItem) => {
            this.props.addData(file.name, dataItem.data, dataItem.schema);
        });
        return false;
    }

    handleDataSelect = (e) => {
        let dataIndex = this.props.dataNameList.indexOf(e)
        if (dataIndex + 1) {
            this.props.switchData(dataIndex)
        }
    }

    deleteData = (index) => {
        this.props.deleteData(index)
    }

    render() {
        let { dataNameList, currentData } = this.props;
        return (
            <div style={{ padding: '10px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white' }}>
                <Dragger
                    accept=".csv"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    {/* <p className="ant-upload-text">Click or drag csv file to this area</p> */}
                    <p className="ant-upload-hint">
                        Click or drag csv file to this area
                    </p>
                </Dragger>
                <Select id="data-selection"
                    value={currentData.name}
                    defaultValue={currentData.name}
                    onChange={(e) => this.handleDataSelect(e)}
                    optionLabelProp="label"
                    style={{ marginTop: '8px', width: 280 }}
                >
                    {dataNameList.map((d, i) => (
                        <Option label={d} key={d}>{d}
                            <span aria-label={d}>
                                <Button shape="circle" icon="close" size='small' style={{ float: 'right', fontSize: 10 }}
                                    onClick={(e) => { this.deleteData(i); e.stopPropagation() }} />
                            </span>
                        </Option>)
                    )}
                </Select>

                <SimpleDataPreview currentData={currentData} />

                <Button block style={{ marginTop: '8px' }} onClick={this.handleDataPreview} type="primary">Preview & Edit Data</Button>

                <Button block style={{ marginTop: '8px' }} onClick={this.handleChartEditor} type="primary">Data Mapping</Button>

                <DataPreview
                    currentData={currentData}
                    visible={this.state.datavisible}
                    handleOk={this.handleDataOk}
                    handleCancel={this.handleCancel}
                    handleDataUpdate={this.handleDataUpdate}
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

