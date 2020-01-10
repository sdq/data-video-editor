import React, { Component } from 'react';
import { Row, Col, Select, Radio, Button } from 'antd';
import {getCategories} from '../../helper';
const { Option } = Select;

export default class configure extends Component {

    handleCategoriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.category = value;
        animation.description = "Emphasize the value of " + animation.spec.category;
        this.props.modifyChartAnimation(index, animation);
    }

    handleExtremeChange = e => {
        const {index, animation} = this.props;
        animation.spec.extreme = e.target.value;
        animation.description = "Emphasize the " + animation.spec.extreme + " in the " + animation.spec.category + " category";
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
        let selectedCategory = animation.spec.category?animation.spec.category:categories[0];
        animation.spec.category = animation.spec.category?animation.spec.category:categories[0];
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Category:</h3></Col>
                    <Col span={9}>
                        <Select value={selectedCategory} style={{ width: 120, marginTop: 4 }} onChange={this.handleCategoriesChange}>
                            {categories.map((category) => <Option key={category} value={category}>{category}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <p style={{ marginTop: 8 }}>{encoding.color.field}</p>
                    </Col>
                    <Col span={5}>
                        <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'value', key: 'category'})}>Select</Button>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="filter">Filter</Radio.Button>
                            <Radio.Button value="flicker">Flicker</Radio.Button>
                            <Radio.Button value="popup">Pop up</Radio.Button>
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
