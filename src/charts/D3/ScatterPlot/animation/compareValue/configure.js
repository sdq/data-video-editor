import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import { getSeries } from '../../helper';
import _ from 'lodash';
const { Option } = Select;

function setDescription(animation){
    let des = "Compare the " + animation.spec.value1 + " value";
    des += " in the " + animation.spec.channel + " channel";
    des += " in the " + animation.spec.series1 + " series";
    des += " with the " + animation.spec.value2 + " value";
    des += " in the " + animation.spec.channel + " channel";
    des += " in the " + animation.spec.series2 + " series";
    animation.description = des;
}

export default class configure extends Component {

    constructor(props){
        super(props);
        const {animation, currentData, displaySpec} = this.props;

        let data = currentData.data;
        let encoding = displaySpec.encoding;
        let series = getSeries(data, encoding); 
        animation.spec.series1 = animation.spec.series1?animation.spec.series1:series[0];
        animation.spec.series2 = animation.spec.series2?animation.spec.series2:series[1];
        setDescription(animation);
    }

    handleSeries1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series1 = value;
        setDescription(animation);
        this.props.modifyChartAnimation(index, animation);
    }

    handleSeries2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series2 = value;
        setDescription(animation);
        this.props.modifyChartAnimation(index, animation);
    }

    handleChannelChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.channel = value;
        setDescription(animation);
        this.props.modifyChartAnimation(index, animation);
    }

    handleValue1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.value1 = value;
        if(animation.spec.channel1 === "None"){
            animation.spec.channel1 = "x";
        }
        setDescription(animation);
        this.props.modifyChartAnimation(index, animation);
    }

    handleValue2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.value2 = value;
        if(animation.spec.channel2 === "None"){
            animation.spec.channel2 = "x";
        }
        setDescription(animation);
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

        let channel = ["X", "Y"];
        if("size" in encoding && !_.isEmpty(encoding.size)){
            channel.push("Size");
        }
        let value = ["Max", "Min"];
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series 1:</h3></Col>
                    <Col span={9}>
                        <Select value={animation.spec.series1} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeries1Change}>
                            {series.map((key) => <Option key={key} value={key}>{key}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Value 1:</h3></Col>
                    <Col span={9}>
                        <Select value={animation.spec.value1} style={{ width: 120, marginTop: 4 }} onChange={this.handleValue1Change}>
                            {value.map((key) => <Option key={key} value={key.toLowerCase()}>{key}</Option>)}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key: 'value1'})}>Select</Button>
                    </Col>
                </Row>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series 2:</h3></Col>
                    <Col span={9}>
                        <Select value={animation.spec.series2} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeries2Change}>
                            {series.map((key) => <Option key={key} value={key}>{key}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Value 2:</h3></Col>
                    <Col span={9}>
                        <Select value={animation.spec.value2} style={{ width: 120, marginTop: 4 }} onChange={this.handleValue2Change}>
                            {value.map((key) => <Option key={key} value={key.toLowerCase()}>{key}</Option>)}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key: 'value2'})}>Select</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Channel:</h3></Col>
                    <Col span={18}>
                        <Select value={animation.spec.channel} style={{ width: 120, marginTop: 4 }} onChange={this.handleChannelChange}>
                            {channel.map((key) => <Option key={key} value={key.toLowerCase()}>{key}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectsChange}>
                            <Radio.Button value="superposition">Superposition</Radio.Button>
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
                            <Radio.Button value={5000}>Long</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}
