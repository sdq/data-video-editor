import React, { Component } from 'react';
import { Upload, Icon, Modal, Input } from 'antd';

const { TextArea } = Input;
const { Dragger } = Upload;

export default class AddSceneModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            script: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleChange(e) {
        this.setState({script: e.target.value});
    }

    handleOk() {
        this.props.handleOk(this.state.script);
    }

    render() {
        return (
            <Modal
                title="Add Scene"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.props.handleCancel}
            >
                <p>Write script (optional)</p>
                <TextArea rows={5} onChange={this.handleChange}/>
                <p style={{marginTop: 8}}>Add dataset (optional)</p>
                <Dragger>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for csv file.
                    </p>
                </Dragger>
            </Modal>
        )
    }
}
