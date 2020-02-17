import React, { Component } from 'react';
import { Row, Col, Select, Radio} from 'antd';
import {getCategories} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleSeriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.series = value;
        animation.description = "Emphasize the value of "+animation.spec.category;
        this.props.modifyChartAnimation(index, animation);
    }

    handleCategoryChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.category = value;
        animation.description = "Emphasize the value of "+animation.spec.category;
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
        // let dataSeries = getSeries(data, encoding);
        // let series = Object.keys(dataSeries);
        if( !('color' in encoding)) {
            return (
                <div>
                    <Row  style={{ height: 50 }}>
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Categories:</h3></Col>
                        <Col span={9}>
                            {/* <Select defaultValue={0} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategoryChange}>
                                {categories.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select> */}
                        </Col>
                        <Col span={9}>
                            {/* <p style={{ marginTop: 8 }}>{encoding.color.field}</p> */}
                        </Col>
                    </Row>
                    <Row style={{ height: 50 }}> 
                        <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                        <Col span={18}>
                            <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                                <Radio.Button value="filter">Filter</Radio.Button>
                                <Radio.Button value="flicker">Flicker</Radio.Button>
                                <Radio.Button value="popUp">Pop up</Radio.Button>
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
        } else {
        let dataCategories = getCategories(data, encoding);
        let categories = Object.keys(dataCategories);
        let selectedCategory = animation.spec.category?animation.spec.category:categories[0];
        // let selectedSeries = animation.spec.series?animation.spec.series:series[0];
        return (
            <div>
                {/* <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Series:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={selectedSeries} style={{ width: 120, marginTop: 4 }} onChange={this.handleSeriesChange}>
                            {series.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key1:'series', key2: 'category'})}>Select</Button>
                    </Col>
                </Row> */}
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Categories:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={selectedCategory} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategoryChange}>
                            {categories.map((s) => <Option key={s} value={s}>{s}</Option>)}
                        </Select>
                    </Col>
                    <Col span={9}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="filter">Filter</Radio.Button>
                            <Radio.Button value="flicker">Flicker</Radio.Button>
                            <Radio.Button value="popUp">Pop up</Radio.Button>
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
