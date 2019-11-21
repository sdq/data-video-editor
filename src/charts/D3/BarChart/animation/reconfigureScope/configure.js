import React, { Component } from 'react';
import { Row, Col, Radio, Slider } from 'antd';

export default class configure extends Component {

    handleEffectChange = e => {
        const { index, animation } = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeYChange = (range) => {
        const { index, animation } = this.props;
        animation.spec.rangeY = range;
        console.log(animation.spec);
        this.props.modifyChartAnimation(index, animation);
    }

    handleDurationChange = e => {
        const { index, animation } = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const { animation } = this.props;
        let rangeSetting = (
            <Row style={{ height: 50 }}>
                <Col span={6}><h3 style={{ marginTop: 6 }}>Range Y:</h3></Col>
                <Col span={18}>
                    <Slider
                        range
                        min={0}
                        max={450}
                        tooltipVisible={true}
                        defaultValue={[0, 450]}
                        onAfterChange={this.handleRangeYChange}
                    />
                </Col>
            </Row>
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
                {animation.spec.effect === "zoom in" ? rangeSetting : null}
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
