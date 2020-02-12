import React, { Component } from 'react';
import { Row, Col, Radio, Slider } from 'antd';
import { getAggregatedRows, getStackedData } from '../../helper'

export default class configure extends Component {

    handleEffectChange = e => {
        const { index, animation } = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeYChange = (range) => {
        const { index, animation } = this.props;
        animation.spec.lastRangeY = Object.assign([], animation.spec.rangeY);
        animation.spec.rangeY = range;
        animation.description = "Reconfigure the range in x:[" + animation.spec.rangeX + "],y:[" + animation.spec.rangeY+"]";
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeXChange = (range) => {
        const { index, animation } = this.props;
        animation.spec.lastRangeX = Object.assign([], animation.spec.rangeX);
        animation.spec.rangeX = range;
        animation.description = "Reconfigure the range in x:[" + animation.spec.rangeX + "],y:[" + animation.spec.rangeY+"]";
        this.props.modifyChartAnimation(index, animation);
    }

    handleDurationChange = e => {
        const { index, animation } = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const { animation, currentData, displaySpec } = this.props;
        let encoding = displaySpec.encoding
        let hasSeries = ('color' in encoding) && ('field' in encoding.color);
        let maxY;
        if (hasSeries) {
            let stackedData = getStackedData(currentData.data, encoding)
            let maxArr = stackedData.map(d => {
                let arr = []
                d.forEach(ds => {
                    arr.push(ds[1])
                })
                return Math.max(...arr)
            })
            maxY = Math.max(...maxArr)
        } else {
            let maxData = getAggregatedRows(currentData.data, encoding)
            let maxArr = maxData.map(d => {
                return d[encoding.y.field]
            })
            maxY = Math.max(...maxArr)
        }
        if (!animation.spec.rangeY) animation.spec.rangeY = [0, maxY]
        if (!animation.spec.rangeX) animation.spec.rangeX = [0, 100]

       
        let rangeSetting = (
            <div>
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Range Y:</h3></Col>
                    <Col span={18}>
                        <Slider
                            range
                            min={0}
                            max={maxY}
                            defaultValue={animation.spec.rangeY}
                            onAfterChange={this.handleRangeYChange}
                        />
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Range X:</h3></Col>
                    <Col span={18}>
                        <Slider
                            range
                            min={0}
                            max={100}
                            tooltipVisible={false}
                            defaultValue={animation.spec.rangeX}
                            onAfterChange={this.handleRangeXChange}
                        />
                    </Col>
                </Row>
            </div>
        )
        return (
            <div>
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="zoom in">Zoom in</Radio.Button>
                            <Radio.Button value="zoome out">Zoom out</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                {rangeSetting}
                {/* {animation.spec.effect === "zoom in" ? rangeSetting : null} */}
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
