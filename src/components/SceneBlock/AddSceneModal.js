import React, { Component } from 'react';
import { Upload, Icon, Modal, Input } from 'antd';

const { TextArea } = Input;
const { Dragger } = Upload;

export default class AddSceneModal extends Component {

    render() {
        return (
            <Modal
                title="Add Scene"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.props.handleCancel}
            >
                <p>Write script (optional)</p>
                <TextArea rows={5} />
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
