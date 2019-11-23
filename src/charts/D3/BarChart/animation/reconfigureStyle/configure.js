import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

export default class configure extends Component {

    handleStartLayoutChange = e => {
        const {index, animation} = this.props;
        animation.spec.startLayout = e.target.value;
        animation.description = "Reconfigure the "+animation.spec.startLayout+" style to the "+animation.spec.endLayout+" style";
        this.props.modifyChartAnimation(index, animation);
    };

    handleEndLayoutChange = e => {
        const {index, animation} = this.props;
        animation.spec.endLayout = e.target.value;
        animation.description = "Reconfigure the "+animation.spec.startLayout+" style to the "+animation.spec.endLayout+" style";
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
                    <Col span={6}><h3 style={{ marginTop: 6 }}>From:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.startLayout} onChange={this.handleStartLayoutChange}>
                            <Radio.Button value="stacked">Stacked</Radio.Button>
                            <Radio.Button value="percent">Percent</Radio.Button>
                            <Radio.Button value="grouped">Grouped</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>To:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.endLayout} onChange={this.handleEndLayoutChange}>
                            <Radio.Button value="stacked">Stacked</Radio.Button>
                            <Radio.Button value="percent">Percent</Radio.Button>
                            <Radio.Button value="grouped">Grouped</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Duration:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.duration} onChange={this.handleDurationChange}>
                            <Radio.Button value={500}>Short</Radio.Button>
                            <Radio.Button value={1000}>Medium</Radio.Button>
                            <Radio.Button value={2000}>Long</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}
