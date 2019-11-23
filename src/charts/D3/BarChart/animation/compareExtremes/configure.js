import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import {getSeries} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleSeries1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series1 = value;
        animation.description = "Compare the extreme values between the "+animation.spec.series1+" and "+animation.spec.series2;
        this.props.modifyChartAnimation(index, animation);
    }

    handleExtreme1Change = e => {
        const {index, animation} = this.props;
        animation.spec.extreme1 = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleSeries2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series2 = value;
        animation.description = "Compare the extreme values between the "+animation.spec.series1+" and "+animation.spec.series2;
        this.props.modifyChartAnimation(index, animation);
    }

    handleExtreme2Change = e => {
        const {index, animation} = this.props;
        animation.spec.extreme2 = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleEffectChange = e => {
        const {index, animation} = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleDurationChange = e => {
        const {index, animation} = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation, currentData, displaySpec} = this.props;
        let data = currentData.data;
        let encoding = displaySpec.encoding;
        let dataSeries = getSeries(data, encoding);
        let series = Object.keys(dataSeries);
        let selectedSeries1 = animation.spec.series1?animation.spec.series1:series[0];
        let selectedSeries2 = animation.spec.series2?animation.spec.series2:series[1];
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series 1:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={selectedSeries1} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeries1Change}>
                            {series.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'series', key: 'series1'})}>Select</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Extreme 1:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.extreme1} onChange={this.handleExtreme1Change}>
                            <Radio.Button value="max">Max</Radio.Button>
                            <Radio.Button value="min">Min</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series 2:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={selectedSeries2} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeries2Change}>
                            {series.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'series', key: 'series2'})}>Select</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Extreme 2:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.extreme2} onChange={this.handleExtreme2Change}>
                            <Radio.Button value="max">Max</Radio.Button>
                            <Radio.Button value="min">Min</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="superposition">Superposition</Radio.Button>
                            <Radio.Button value="difference">Difference</Radio.Button>
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
