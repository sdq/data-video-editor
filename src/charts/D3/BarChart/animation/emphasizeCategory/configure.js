import React, { Component } from 'react';
import { Row, Col, Select, Radio } from 'antd';
import {getCategories} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleCategoryChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.category = value;
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
        let dataCategories = getCategories(data, encoding);
        let categories = Object.keys(dataCategories);
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Category:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={categories[0]} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategoryChange}>
                            {categories.map((category) => <Option key={category} value={category}>{category}</Option>)}
                        </Select>
                    </Col>
                    <Col span={9}>
                        <p style={{ marginTop: 8 }}>{encoding.x.field}</p>
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
