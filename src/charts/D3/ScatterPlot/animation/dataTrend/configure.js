import React, { Component } from 'react';
import { Row, Col, Select, Radio, Slider } from 'antd';
import { getSeries } from '../../helper';
import _ from 'lodash';

const { Option } = Select;

export default class configure extends Component {

    handleSeriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.series = value;
        animation.description = "Show data trend of "+ animation.spec.series +" series";
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

    handleRangeChange = e => {
        const {index, animation} = this.props;
        animation.spec.range = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    customizeRange = (range) => {
        const { index, animation } = this.props;
        animation.spec.rangeScope = range;
        animation.description = "Show data trend of all data from "+animation.spec.rangeScope[0]+" to "+animation.spec.rangeScope[1];
        this.props.modifyChartAnimation(index, animation);
    }

    handleGapChange = e => {
        const {index, animation} = this.props;
        animation.spec.gap = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation, currentData, displaySpec} = this.props;
        let data = currentData.data;
        let encoding = displaySpec.encoding;
        let series = getSeries(data, encoding); 
        let selectSeries = animation.spec.series? animation.spec.series: "all";

        if(!('time' in encoding) || _.isEmpty(encoding.time) || !('id' in encoding) || _.isEmpty(encoding.id)){
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
                                <Radio.Button value="appear">Appear</Radio.Button>
                                <Radio.Button value="fadeIn">Fade in</Radio.Button>
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
        } else {
            //TODO: parse date
            let time = [...new Set(data.map(d => parseInt(d[encoding.time.field], 10)))];
            let maxTime = Math.max(...time);
            let minTime = Math.min(...time);
            if (animation.spec.rangeScope.length === 0) {
                animation.spec.rangeScope = [minTime, maxTime];
            }
            let customizedRange = (
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Customize:</h3></Col>
                    <Col span={18}>
                        <Slider
                            range
                            min={minTime}
                            max={maxTime}
                            defaultValue={[animation.spec.rangeScope[0], animation.spec.rangeScope[1]]}
                            // onChange={onChange}
                            onAfterChange={this.customizeRange}
                        />
                    </Col>
                </Row>
            )
            return (
                <div>
                     <Row style={{ height: 50 }}> 
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Range:</h3></Col>
                        <Col span={18}>
                            <Radio.Group value={animation.spec.range} onChange={this.handleRangeChange}>
                                <Radio.Button value="full">Full</Radio.Button>
                                <Radio.Button value="customize">Customize</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    {animation.spec.range === "customize" ? customizedRange : null}
                    <Row style={{ height: 50 }}> 
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Gap:</h3></Col>
                        <Col span={18}>
                            <Radio.Group value={animation.spec.gap} onChange={this.handleGapChange}>
                                <Radio.Button value={1}>Yes</Radio.Button>
                                <Radio.Button value={0}>No</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row style={{ height: 50 }}> 
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Duration:</h3></Col>
                        <Col span={18}>
                            <Radio.Group value={animation.duration} onChange={this.handleDurationChange}>
                                <Radio.Button value={5000}>Short</Radio.Button>
                                <Radio.Button value={10000}>Medium</Radio.Button>
                                <Radio.Button value={20000}>Long</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}
