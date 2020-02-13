import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import {getCategories} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleCategory1Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.category1 = value;
        animation.description = "Compare the "+animation.spec.category1+" and "+animation.spec.category2+" categories";
        this.props.modifyChartAnimation(index, animation);
    }

    handleCategory2Change = (value) => {
        const {index, animation} = this.props;
        animation.spec.category2 = value;
        animation.description = "Compare the "+animation.spec.category1+" and "+animation.spec.category2+" categories";
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
        let category1 = animation.spec.category1?animation.spec.category1:categories[0];
        let category2 = animation.spec.category2?animation.spec.category2:categories[1];
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Category1:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={category1} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategory1Change}>
                            {categories.map((category) => <Option key={category} value={category}>{category}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.x.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'category', key: 'category1'})}>Select</Button>
                    </Col>
                </Row>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Category2:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue={category2} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategory2Change}>
                            {categories.map((category) => <Option key={category} value={category}>{category}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.x.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'category', key: 'category2'})}>Select</Button>
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
