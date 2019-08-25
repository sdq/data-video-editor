import React, { Component } from 'react'
import { Upload, Button, Icon, Select } from 'antd';
import DataPreview from '@/components/DataPreview';
import SimpleDataPreview from '@/components/DataPreview/SimpleDataPreview';
import * as d3 from 'd3';

const { Dragger } = Upload;
const { Option } = Select;

export default class DataTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datavisible: false,
        };
        this.handleDataPreview = this.handleDataPreview.bind(this);
        this.handleDataOk = this.handleDataOk.bind(this);
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

    handleCancel() {
        this.setState({
            datavisible: false,
        });
    };

    render() {
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px'}}>
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

                <DataPreview 
                    visible={this.state.datavisible}
                    handleOk={this.handleDataOk}
                    handleCancel={this.handleCancel}
                    {...this.props}
                />
            </div>
        )
    }
}

