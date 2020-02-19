import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import {getCategories} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleSeries1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series1 = value;
        animation.description = "Compare between the values of category in "+animation.spec.series1+" and "+animation.spec.series2;
        this.props.modifyChartAnimation(index, animation);
    }

    handleCategory1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.category1 = value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleSeries2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.series2 = value;
        animation.description = "Compare between the values of category in "+animation.spec.series1+" and "+animation.spec.series2;
        this.props.modifyChartAnimation(index, animation);
    }

    handleCategory2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.category2 = value;
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
        if( !('color' in encoding)) {
            return (
                <div>
                    <Row  style={{ height: 50 }}>
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Category 1:</h3></Col>
                        <Col span={9}>
                            {/* <Select value={selectedCategory1} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategory1Change}>
                                {categories.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select> */}
                        </Col>
                        <Col span={5}>
                            <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1: 'series1', key2: 'category1'})}>Select</Button>
                        </Col>
                    </Row>
                    <Row  style={{ height: 50 }}>
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Category 2:</h3></Col>
                        <Col span={9}>
                            {/* <Select value={selectedCategory2} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategory2Change}>
                                {categories.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select> */}
                        </Col>
                        <Col span={5}>
                            <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1: 'series2', key2: 'category2'})}>Select</Button>
                        </Col>
                    </Row>
                    <Row style={{ height: 50 }}> 
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                        <Col span={18}>
                            <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                                <Radio.Button value="juxtaposition">Juxtaposition</Radio.Button>
                                {/* <Radio.Button value="superposition">Superposition</Radio.Button>
                                <Radio.Button value="difference">Difference</Radio.Button> */}
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
        } else{
            // let dataSeries = getSeries(data, encoding);
        // let series = Object.keys(dataSeries);
        let dataCategories = getCategories(data, encoding);
        let categories = Object.keys(dataCategories);
        let selectedCategory1 = animation.spec.category1?animation.spec.category1:categories[0];
        // let selectedSeries1 = animation.spec.series1?animation.spec.series1:series[0];
        let selectedCategory2 = animation.spec.category2?animation.spec.category2:categories[1];
        // let selectedSeries2 = animation.spec.series1?animation.spec.series1:series[0];
        return (
            <div>
                {/* <Row  style={{ height: 50 }}>
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
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1: 'series1', key2: 'category1'})}>Select</Button>
                    </Col>
                </Row> */}
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Category 1:</h3></Col>
                    <Col span={9}>
                        <Select value={selectedCategory1} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategory1Change}>
                            {categories.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    {/* <Col span={9}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col> */}
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1: 'series1', key2: 'category1'})}>Select</Button>
                    </Col>
                </Row>
                {/* <Row  style={{ height: 50 }}>
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
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1: 'series2', key2: 'category2'})}>Select</Button>
                    </Col>
                </Row> */}
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Category 2:</h3></Col>
                    <Col span={9}>
                        <Select value={selectedCategory2} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategory2Change}>
                            {categories.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    {/* <Col span={9}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col> */}
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1: 'series2', key2: 'category2'})}>Select</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="juxtaposition">Juxtaposition</Radio.Button>
                            {/* <Radio.Button value="superposition">Superposition</Radio.Button>
                            <Radio.Button value="difference">Difference</Radio.Button> */}
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
}
