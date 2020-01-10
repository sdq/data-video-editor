import React, { Component } from 'react';
import { Row, Col, Slider, Radio } from 'antd';

export default class configure extends Component {

    handleRangeChange = e => {
        const {index, animation} = this.props;
        animation.spec.range = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    customizeRange = (range) => {
        const { index, animation } = this.props;
        animation.spec.rangeScope = range;
        animation.description = "Show data trend of all series from "+animation.spec.rangeScope[0]+" to "+animation.spec.rangeScope[1];
        this.props.modifyChartAnimation(index, animation);
    }

    handleGapChange = e => {
        const {index, animation} = this.props;
        animation.spec.gap = e.target.value;
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
