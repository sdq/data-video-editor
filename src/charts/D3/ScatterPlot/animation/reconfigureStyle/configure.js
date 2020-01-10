import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

export default class configure extends Component {

    handleEffectChange = e => {
        const {index, animation} = this.props;
        animation.spec.from = animation.spec.to;
        animation.spec.to = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleDurationChange = e => {
        const {index, animation} = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation} = this.props;
        return (
            <div>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effects:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.to} onChange={this.handleEffectChange}>
                            <Radio.Button value="linear">Linear</Radio.Button>
                            <Radio.Button value="log">Log</Radio.Button>
                            <Radio.Button value="power">Power</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Duration:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.duration} onChange={this.handleDurationChange}>
                            <Radio.Button value={1000}>Short</Radio.Button>
                            <Radio.Button value={2000}>Medium</Radio.Button>
                            <Radio.Button value={5000}>Long</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}
