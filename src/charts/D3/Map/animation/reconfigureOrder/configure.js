import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import {getSeries} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleSeriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.series = value;
        animation.description = "Reconfigure the order to "+ animation.spec.series +" series";
        this.props.modifyChartAnimation(index, animation);
    }

    handleOrderChange = e => {
        const { index, animation } = this.props;
        animation.spec.order = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    };

    handleEffectChange = e => {
        const { index, animation } = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    };

    handleDurationChange = e => {
        const { index, animation } = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation, currentData, displaySpec} = this.props;
        let data = currentData.data;
        let encoding = displaySpec.encoding;
        let dataSeries = getSeries(data, encoding);
        let series = Object.keys(dataSeries);
        let selectedSeries = animation.spec.series?animation.spec.series:"";
        let hasSeries = ('color' in encoding) && ('field' in encoding.color);
        let selectSeriesRow = (
            <Row style={{ height: 50 }}>
                <Col span={6}><h3 style={{ marginTop: 6 }}>Series:</h3></Col>
                <Col span={9}>
                    <Select defaultValue={selectedSeries} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeriesChange}>
                        <Option key={""} value={""}>All</Option>
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
        )
        return (
            <div>
                {hasSeries?selectSeriesRow:null}
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
