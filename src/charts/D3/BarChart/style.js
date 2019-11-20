import React, { Component } from 'react';
import { Checkbox, Divider, Row, Col, Radio } from 'antd';

export default class Style extends Component {

    onChangeLayout = e => {
        let { spec } = this.props;
        spec.style.layout = e.target.value;
        this.props.handleConfigureOk(spec);
    };

    onChangeX = (e) => {
        let { spec } = this.props;
        spec.style.showAxisX = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    onChangeY = (e) => {
        let { spec } = this.props;
        spec.style.showAxisY = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    render() {
        let { spec } = this.props;
        console.log(spec.style);
        return (
            <div>
                <Divider>Layout</Divider>
                <Row style={{ height: 50 }}>
                    <Radio.Group value={spec.style.layout} onChange={this.onChangeLayout}>
                        <Radio.Button value="stacked">Stacked</Radio.Button>
                        <Radio.Button value="percent">Percent</Radio.Button>
                        <Radio.Button value="grouped">Grouped</Radio.Button>
                    </Radio.Group>
                </Row>
                <Divider>Axis Style</Divider>
                <Row style={{ height: 50 }}>
                    <Col span={12}>
                        <Checkbox defaultChecked={spec.style.showAxisX} onChange={this.onChangeX}>Show Axis X</Checkbox>
                    </Col>
                    <Col span={12}>
                        <Checkbox defaultChecked={spec.style.showAxisY} onChange={this.onChangeY}>Show Axis Y</Checkbox>
                    </Col>
                </Row>
            </div>
        )
    }
}
