import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

export default class configure extends Component {

    handleOrderChange = e => {
        const {index, animation} = this.props;
        animation.spec.order = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    };

    handleEffectChange = e => {
        const {index, animation} = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    };

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
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Order:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.order} onChange={this.handleOrderChange}>
                            <Radio.Button value="ascending">Ascending</Radio.Button>
                            <Radio.Button value="descending">Descending</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="switch">Switch</Radio.Button>
                            <Radio.Button value="stagger">Stagger</Radio.Button>
                            <Radio.Button value="pull">Pull</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Duration:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.duration} onChange={this.handleDurationChange}>
                            <Radio.Button value={1000}>Short</Radio.Button>
                            <Radio.Button value={2000}>Medium</Radio.Button>
                            <Radio.Button value={3000}>Long</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}
