import React, { Component } from 'react';
import { Upload, Button, Icon, Select } from 'antd';
import DataProcessor from '@/components/DataPreview/processor';

const { Dragger } = Upload;
const { Option } = Select;
const dataProcessor = new DataProcessor();

export default class DataPanel extends Component {

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

    render() {
        const {dataNameList, currentData} = this.props;
        return (
            <div>
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
            </div>
        )
    }
}
