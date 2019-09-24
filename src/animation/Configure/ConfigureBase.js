import React, { Component } from 'react';
import { Modal } from 'antd';

export default class ConfigureBase extends Component {
    render() {
        return (
            <Modal
                title="Animation"
                // visible={this.props.visible}
                // onOk={this.handleOk}
                // confirmLoading={this.props.confirmLoading}
                // onCancel={this.props.handleCancel}
            >
                <p>Configure</p>
            </Modal>
        )
    }
}
