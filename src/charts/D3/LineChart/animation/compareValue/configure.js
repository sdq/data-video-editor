import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import { getSeries } from '../../helper';

const { Option } = Select;

export default class configure extends Component {

    // constructor(props){
    //     super(props);
    //     const {animation, currentData, displaySpec} = this.props;

    //     let data = currentData.data;
    //     let encoding = displaySpec.encoding;
    //     let series = Object.keys(getSeries(data, encoding)); 
    //     animation.spec.series1 = animation.spec.series1 && animation.spec.series1 !== "all" ? animation.spec.series1 : series[0];
    //     // animation.spec.series2 = animation.spec.series2 && animation.spec.series2 !== "all" ? animation.spec.series2 : series[1];
    //     if (animation.spec.series2 && animation.spec.series2 !== "all") {
    //         // animation.spec.series2 = animation.spec.series2;
    //     } else {
    //         for(let i=0; i<series.length; i++) {
    //             if (animation.spec.series1 !== series[i]) {
    //                 animation.spec.series2 = series[i];
    //                 break;
    //             }
    //         }
    //     }
    //     animation.description = "Compare the " + animation.spec.value + " of the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
    // }

    handleSeries1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series1 = value;
        animation.description = "Compare the " + animation.spec.value + " of the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
        this.props.modifyChartAnimation(index, animation);
    }

    handleSeries2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series2 = value;
        animation.description = "Compare the " + animation.spec.value + " of the "+ animation.spec.series1 +" and "+ animation.spec.series2 +" series";
        this.props.modifyChartAnimation(index, animation);
    }

    handleValueChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.value = value;
        animation.description = "Compare the " + animation.spec.value + " of the "+ animation.spec.series1 + " and " + animation.spec.series2 + " series";
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
        let series = Object.keys(getSeries(data, encoding)); 
        let value = ["Max", "Min"]
        // let selectSeries = animation.spec.series? animation.spec.series: series[0];
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series1:</h3></Col>
                    <Col span={9}>
                        <Select value={animation.spec.series1} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeries1Change}>
                            {series.map((key) => <Option key={key} value={key}>{key}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'series', key: 'series1'})}>Select</Button>
                    </Col>
                </Row>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series 2:</h3></Col>
                    <Col span={9}>
                        <Select value={animation.spec.series2} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeries2Change}>
                            {series.map((key) => <Option key={key} value={key}>{key}</Option>)}
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
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Value:</h3></Col>
                    <Col span={13}>
                        <Select value={animation.spec.value} style={{ width: 180, marginTop: 4 }} onChange={this.handleValueChange}>
                            {value.map((key) => <Option key={key} value={key.toLowerCase()}>{key}</Option>)}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key: 'value'})}>Select</Button>
                    </Col>
                </Row>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effects:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectsChange}>
                            <Radio.Button value="superposition">Superposition</Radio.Button>
                            {/* <Radio.Button value="juxtaposition">Juxtaposition</Radio.Button> */}
                            <Radio.Button value="difference">Difference</Radio.Button>
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
