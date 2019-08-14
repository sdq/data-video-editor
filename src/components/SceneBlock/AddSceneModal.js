import React, { Component } from 'react';
import { Modal, Input } from 'antd';

const { TextArea } = Input;

const defaultTitle = "New Scene";

export default class AddSceneModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: defaultTitle,
            script: "",
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeScript = this.handleChangeScript.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleChangeScript(e) {
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
                <p>Scene Title (optional)</p>
                <TextArea rows={1} defaultValue={defaultTitle} onChange={this.handleChangeTitle}/>
                <p style={{marginTop: 8}}>Write script (optional)</p>
                <TextArea rows={5} onChange={this.handleChangeScript}/>
            </Modal>
        )
    }
}
