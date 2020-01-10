import * as d3 from 'd3';
import React, { Component } from 'react';
import { Row, Col, Radio, Slider } from 'antd';

export default class configure extends Component {

    constructor(props){
        super(props);
        const {animation, currentData, displaySpec} = this.props;

        let data = currentData.data;
        let encoding = displaySpec.encoding;
        let maxX = d3.max(data.map(d => parseFloat(d[encoding.x.field]))),
            maxY = d3.max(data.map(d => parseFloat(d[encoding.y.field])));

        animation.spec.rangeX = animation.spec.rangeX?animation.spec.rangeX:[0,maxX];
        animation.spec.rangeY = animation.spec.rangeY?animation.spec.rangeY:[0,maxY];
        animation.description = "Reconfigure the range in x:[" + animation.spec.rangeX + "],y:[" + animation.spec.rangeY+"]";
    }

    handleEffectChange = e => {
        const { index, animation } = this.props;
        animation.spec.effect = e.target.value;
        if(animation.spec.effect === "zoom out"){
            const {animation, currentData, displaySpec} = this.props;
            let data = currentData.data;
            let encoding = displaySpec.encoding;
            let maxX = d3.max(data.map(d => parseFloat(d[encoding.x.field]))),
                maxY = d3.max(data.map(d => parseFloat(d[encoding.y.field])));

            animation.spec.rangeX = [0,maxX];
            animation.spec.rangeY = [0,maxY];
            animation.description = "Reconfigure the range in x:[" + animation.spec.rangeX + "],y:[" + animation.spec.rangeY+"]";
        }
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeYChange = (range) => {
        const { index, animation } = this.props;
        //animation.spec.oldRangeY = animation.spec.rangeY;
        animation.spec.rangeY = range;
        animation.description = "Reconfigure the range in x:[" + animation.spec.rangeX + "],y:[" + animation.spec.rangeY+"]";
        this.props.modifyChartAnimation(index, animation);
    }
    
    handleRangeXChange = (range) => {
        const { index, animation } = this.props;
        //animation.spec.oldRangeX = animation.spec.rangeX;
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
        let encoding = displaySpec.encoding;
        let data = currentData.data;
        let maxX = d3.max(data.map(d => parseFloat(d[encoding.x.field]))),
            maxY = d3.max(data.map(d => parseFloat(d[encoding.y.field])));

        let rangeSetting = (
            <div>
                <Row style={{ height: 50 }}>
                    <Col span={5}><h3 style={{ marginTop: 6 }}>Scope:</h3></Col>
                    <Col span={2}><h3 style={{ marginTop: 6 }}>X:</h3></Col>
                    <Col span={17}>
                        <Slider
                            range
                            min={0}
                            max={maxX}
                            defaultValue={animation.spec.rangeX}
                            onAfterChange={this.handleRangeXChange}
                        />
                    </Col>
                </Row>
                <Row style={{ height: 50 }}>
                    <Col span={5}></Col>
                    <Col span={2}><h3 style={{ marginTop: 6 }}>Y:</h3></Col>
                    <Col span={17}>
                        <Slider
                            range
                            min={0}
                            max={maxY}
                            defaultValue={animation.spec.rangeY}
                            onAfterChange={this.handleRangeYChange}
                        />
                    </Col>
                </Row>
            </div>
        )
        return (
            <div>
                {   
                    animation.spec.effect === "zoom in" && rangeSetting
                }
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="zoom in">Zoom in</Radio.Button>
                            <Radio.Button value="zoom out">Zoom out</Radio.Button>
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
