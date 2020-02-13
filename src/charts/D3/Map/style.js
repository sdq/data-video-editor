import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

export default class Style extends Component {

    onChangeLayout = e => {
        let { spec } = this.props;
        spec.style.layout = e.target.value;
        this.props.handleConfigureOk(spec);
    };

    render() {
        let { spec } = this.props;
        return (
            <div>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Layout:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={spec.style.layout} onChange={this.onChangeLayout}>
                            <Radio.Button value="stacked">Stacked</Radio.Button>
                            <Radio.Button value="percent">Percent</Radio.Button>
                            <Radio.Button value="grouped">Grouped</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}
