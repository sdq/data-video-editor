import React, { Component } from 'react';
import { Row, Col, Select, Radio } from 'antd';
import { getSeries } from '../../helper';

const { Option } = Select;

export default class configure extends Component {

    handleSeriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.series = value;
        animation.description = "Show regression of "+ animation.spec.series +" series";
        this.props.modifyChartAnimation(index, animation);
    }

    handleEffectsChange = (e) => {
        const {index, animation} = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleDurationChange = (e) => {
        const {index, animation} = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation, currentData, displaySpec} = this.props;
        let data = currentData.data;
        let encoding = displaySpec.encoding;
        let series = getSeries(data, encoding); 
        let selectSeries = animation.spec.series? animation.spec.series: "all";
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series:</h3></Col>
                    <Col span={9}>
                        <Select value={selectSeries} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeriesChange}>
                            <Option value="all">All</Option>
                            {series.map((key) => <Option key={key} value={key}>{key}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effects:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectsChange}>
                            <Radio.Button value="grow">Grow</Radio.Button>
                            <Radio.Button value="fadeIn">Fade in</Radio.Button>
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
