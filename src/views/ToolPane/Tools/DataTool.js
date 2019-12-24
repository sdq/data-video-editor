import React, { Component } from 'react'
import { Upload, Button, Icon, Select, Alert, Popconfirm, message } from 'antd';
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
            alertvisible: false,
            confirmVisible: false
        };
        this.handleDataPreview = this.handleDataPreview.bind(this);
        this.handleDataOk = this.handleDataOk.bind(this);
        this.handleChartOk = this.handleChartOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    componentWillMount() {
        let { currentVis } = this.props;
        let encoding = currentVis.spec.encoding;
        let hasEncoding = encoding && (JSON.stringify(encoding.x) !== "{}" || JSON.stringify(encoding.y) !== "{}")
        if (hasEncoding) {
            this.props.switchData(currentVis.dataIndex)
        }
    }

    componentDidUpdate(preProps) {
        if (preProps.currentElement.id !== this.props.currentElement.id) {
            let { currentVis } = this.props;
            let encoding = currentVis.spec.encoding;
            let hasEncoding = encoding && (JSON.stringify(encoding.x) !== "{}" || JSON.stringify(encoding.y) !== "{}")
            if (hasEncoding) {
                this.props.switchData(currentVis.dataIndex)
            }
        }

    }

    handleDataPreview = () => {
        this.setState({
            datavisible: true,
        });
    }

    handleDataOk = (data) => {
        // TODO: Update Data

        this.setState({
            datavisible: false,
        });
    }

    handleDataUpdate = (data) => {
        this.props.updateData(this.props.currentData.dataIndex, data, this.props.fieldsList[this.props.currentData.dataIndex])
    }


    handleChartEditor = () => {
        let encoding = this.props.currentVis.spec.encoding;
        let hasEncoding = encoding && (JSON.stringify(encoding.x) !== "{}" || JSON.stringify(encoding.y) !== "{}")
        let index = hasEncoding ? this.props.currentVis.dataIndex : this.props.currentData.dataIndex;
        if (index !== this.props.currentData.dataIndex && hasEncoding) {
            this.setState({ confirmVisible: true })
        } else {
            this.setState({ confirmVisible: false })
            this.props.openEditor(index, this.props.currentVis.spec);
            this.setState({
                chartvisible: true,
            });
        }
    }

    changeDataConfirm = () => {
        message.info('You have changed the chart data.');
        this.setState({ confirmVisible: false })
        let spec = {}
        this.props.openEditor(this.props.currentData.dataIndex, spec);
        this.setState({
            chartvisible: true,
        });
    }

    changeDataCancel = () => {
        let encoding = this.props.currentVis.spec.encoding;
        let hasEncoding = encoding && (JSON.stringify(encoding.x) !== "{}" || JSON.stringify(encoding.y) !== "{}")
        let index = hasEncoding ? this.props.currentVis.dataIndex : this.props.currentData.dataIndex;
        this.setState({ confirmVisible: false })
        this.props.openEditor(index, this.props.currentVis.spec);
        this.setState({
            chartvisible: true,
        });
    }

    handleChartOk = () => {
        // Update chart on canvas
        const newScene = Object.assign({}, this.props.currentScene);
        let newEle = Object.assign({}, this.props.currentElement);
        // update info dataIndex
        newEle.info().dataIndex = this.props.currentData.dataIndex;
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
        dataProcessor.process(fileURL)
            .then((dataItem) => {
                this.props.addData(file.name, dataItem.data, dataItem.schema);
                this.props.switchData(this.props.dataNameList.length - 1)
            }).catch((reason) => {
                this.setState({
                    alertvisible: true,
                });
                console.log(reason);
            });
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
        let { dataNameList, currentData} = this.props;
        const text = 'Are you sure to change chart data?（All the encodings will be emptied.）';
        return (
            <div style={{ padding: '0px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:this.props.contentHeight-140+'px',overflow: 'auto' }}>
                <div  style={{height:'120px'}} >
                <Dragger
                    accept=".csv"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    {/* <p className="ant-upload-text">Click or drag csv file to this area</p> */}
                    <p className="ant-upload-hint">
                        Click or drag csv file to this area
                    </p>
                </Dragger>
                </div>
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

                {/* <Button block style={{ marginTop: '8px' }} onClick={this.handleDataPreview} type="primary">Preview & Edit Data</Button> */}

                <Popconfirm placement="top" title={text} visible={this.state.confirmVisible} onConfirm={this.changeDataConfirm} onCancel={this.changeDataCancel} okText="Yes" cancelText="No">
                    <Button block style={{ marginTop: '8px' }} onClick={this.handleChartEditor} type="primary">Data Mapping</Button>
                </Popconfirm>

                <DataPreview
                    currentData={currentData}
                    visible={this.state.datavisible}
                    handleOk={this.handleDataOk}
                    handleCancel={this.handleCancel}
                    handleDataUpdate={this.handleDataUpdate}
                    {...this.props}
                />

                <ChartEditor
                    currentData={currentData}
                    visible={this.state.chartvisible}
                    handleOk={this.handleChartOk}
                    handleCancel={this.handleCancel}
                    {...this.props}
                />
                <Alert style={{ display: this.state.alertvisible === false ? 'none' : 'block', position: 'fixed', top: 110, width: 280 }} message="Error: Failed to load data." type="error" showIcon closable />
                {/* <Alert style={{position:'fixed', top: 10}} type="error" message="Error text" banner /> */}
            </div>
        )
    }
}

