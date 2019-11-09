import React, { Component } from 'react';
import { Modal } from 'antd';

export default class ConfigureBase extends Component {
    render() {
        let {animation} = this.props;
        return (
            <Modal
                title={animation.name()}
                visible={this.props.visible}
                width={400}
                bodyStyle={{height: 400, padding: 10}}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
            >
                <p>Animation Setting</p>
                <p>Coming soon...</p>
            </Modal>
        )
    }
}
