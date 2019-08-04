import React, { Component } from 'react'
import { InputNumber, Row } from 'antd';

export default class ToolPane extends Component {
    render() {
        return (
            <div>
                ToolPane
                <Row><InputNumber min={1} max={10} defaultValue={3} /></Row>
                <Row><InputNumber min={1} max={10} defaultValue={3} /></Row>
                <Row><InputNumber min={1} max={10} defaultValue={3} /></Row>
                <Row><InputNumber min={1} max={10} defaultValue={3} /></Row>
            </div>
        )
    }
}
