import React, { Component } from 'react';
import { Modal, Layout, Tabs, Upload, Button, Icon, Select, Alert, Popconfirm, message } from 'antd';
import FieldType from '@/constants/FieldType';
import EditableFormTable from '@/components/DataPreview/EditableFormTable';
import DataProcessor from '@/components/DataPreview/processor';
import ChartPanel from './ChartPanel';
import MappingPanel from './MappingPanel';
import { ChartStyleConfigure } from '@/charts/Info';
import carsSchema from '@/datasets/carsSchema';
import './charteditor.css';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Dragger } = Upload;
const { Option } = Select;
const dataProcessor = new DataProcessor();

export default class ChartEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChart: true
        }
    }

    changeTab = (key) => {
        if (key==='Data') {
            this.setState({
                showChart: false
            })
        } else {
            this.setState({
                showChart: true
            })
        }
    }

    beforeUpload = (file) => { // Data Upload
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

    handleDataUpdate = (data) => {
        this.props.updateData(this.props.currentData.dataIndex, data, this.props.fieldsList[this.props.currentData.dataIndex])
    }

    handleConfigureOk = (spec) => {
        this.props.visConfigure(spec.configure);
        // Update chart on canvas
        const newScene = Object.assign({}, this.props.currentScene);
        let newEle = Object.assign({}, this.props.currentElement);
        newEle.info().spec = spec;
        newScene.updateElement(newEle, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newEle, this.props.elementIndex, elementName);
    }

    render() {
        const {showChart} = this.state;
        const {currentElement, dataNameList, currentData} = this.props;
        if (!currentData.data) return null;
        const fields = currentData.fields;
        const customizedColumns = fields.map((column, i) => {
            column.title = column.name;
            column.dataIndex = column.name;
            if (column.type === FieldType.QUANTITATIVE) {
                column.sorter = (a, b) => a[column.name] - b[column.name]
            }
            column.key = i;
            column.editable = true
            return column;
        });
        const chartInfo = currentElement.info();
        const datapreview = <EditableFormTable columns={customizedColumns} dataSource={currentData.data} handleDataUpdate={this.handleDataUpdate}/>
        const chart = <ChartPanel data={this.props.currentData.data} spec={this.props.displaySpec} {...this.props}/>;
        return (
            <Modal
                title="Chart Editor"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                width={1200}
                bodyStyle={{height: 600, padding: 0}}
                onCancel={this.props.handleCancel}
            >
                <Layout style={{ height: '600px'}}>
                    <Sider width={420} className="pane">
                        <Tabs defaultActiveKey='Mapping' onChange={this.changeTab}>
                            <TabPane tab="Data" key="Data" style={{padding: 8}}>
                                <div  style={{height:'300px'}} >
                                <Dragger
                                    accept=".csv"
                                    showUploadList={false}
                                    beforeUpload={this.beforeUpload}
                                    >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
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
                                    style={{ marginTop: '8px', width: 400 }}
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
                            </TabPane>
                            <TabPane tab="Mapping" key="Mapping" style={{padding: 8}}>
                                <MappingPanel currentFields={carsSchema} channels={this.props.channels}  {...this.props}/>
                            </TabPane>
                            <TabPane tab="Style" key="Style" style={{padding: 8}}>
                                <ChartStyleConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
                            </TabPane>
                            <TabPane tab="Animation" key="Animation" style={{padding: 8}}>
                                Animation Setting
                            </TabPane>
                        </Tabs>
                    </Sider>
                    <Layout>
                    <Content className="pane">
                        {showChart?chart:datapreview}
                    </Content>
                    </Layout>
                </Layout>
            </Modal>
        )
    }
}