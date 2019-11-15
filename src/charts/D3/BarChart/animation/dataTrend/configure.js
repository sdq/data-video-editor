import React, { Component } from 'react';
import { Row, Col, Select, Slider, Radio } from 'antd';
const { Option } = Select;

export default class configure extends Component {

    handleRangeChange = (value) => {

    }

    customizeRange = (value) => {

    }

    handleDurationChange = (value) => {
        
    }

    render() {
        return (
            <div>
                <Row  style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Range:</h3></Col>
                    <Col span={9}>
                        <Select defaultValue="full" style={{ width: 120, marginTop: 4 }} onChange={this.handleRangeChange}>
                            <Option value="full">Full</Option>
                            <Option value="customize">Customize</Option>
                        </Select>
                    </Col>
                    <Col span={9}>
                        <Slider
                            range
                            defaultValue={[0, 100]}
                            // onChange={onChange}
                            onAfterChange={this.customizeRange}
                        />
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Duration:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={"medium"} onChange={this.handleDurationChange}>
                            <Radio.Button value="short">Short</Radio.Button>
                            <Radio.Button value="medium">Medium</Radio.Button>
                            <Radio.Button value="long">Long</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}></Col>
                    <Col span={18}>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}
