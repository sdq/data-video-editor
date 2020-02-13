import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import {getSeries} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleSeriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.series = value;
        animation.description = "Emphasize the " + animation.spec.extreme + " in the " + animation.spec.series + " series";
        this.props.modifyChartAnimation(index, animation);
    }

    handleExtremeChange = e => {
        const {index, animation} = this.props;
        animation.spec.extreme = e.target.value;
        animation.description = "Emphasize the " + animation.spec.extreme + " in the " + animation.spec.series + " series";
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
        // let selectedSeries = animation.spec.series?animation.spec.series:""; // for all series
        let selectedSeries = animation.spec.series?animation.spec.series:series[0];
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={selectedSeries} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeriesChange}>
                            {/* <Option value={""}>All series</Option> */}
                            {series.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'series', key: 'series'})}>Select</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Extreme:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.extreme} onChange={this.handleExtremeChange}>
                            <Radio.Button value="max">Max</Radio.Button>
                            <Radio.Button value="min">Min</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="filter">Filter</Radio.Button>
                            <Radio.Button value="flicker">Flicker</Radio.Button>
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
