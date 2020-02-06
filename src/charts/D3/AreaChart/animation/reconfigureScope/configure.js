import * as d3 from 'd3';
import React, { Component } from 'react';
import { Row, Col, Radio, Slider } from 'antd';
import { getSeries, getCategories, getAggregatedRows, getStackedData } from '../../helper';

export default class configure extends Component {

    constructor(props) {
        super(props);
        const { animation, currentData, displaySpec } = this.props;
        let encoding = displaySpec.encoding
        let hasSeries = ('color' in encoding) && ('field' in encoding.color);
        let data = currentData.data
        let yrange, xrange;

        let dataCategories = getCategories(data, encoding);
        let categories = Object.keys(dataCategories);
        let dataSeries = {};
        let dataSeriesCategories = {};
        const offset = 20;
        const margin = { top: 10, right: 10, bottom: 40, left: 40 };
        // const width = props.width - margin.left - margin.right - offset;
        const height = props.height - margin.top - margin.bottom - offset - 40;;


        if (hasSeries) {
            dataSeries = getSeries(data, encoding);
            // series = Object.keys(dataSeries);
            for (const s in dataSeries) {
                dataSeriesCategories[s] = {};
                dataSeries[s] = getAggregatedRows(dataSeries[s], encoding)
                for (let index = 0; index < dataSeries[s].length; index++) {
                    const rowData = dataSeries[s][index];
                    dataSeriesCategories[s][rowData[encoding.x.field]] = rowData[encoding.y.field]
                }
            }
            let stackedData = getStackedData(data, encoding);
            var y = d3.scaleLinear()
            y.domain([0, d3.max(stackedData[stackedData.length - 1], d => d[1])]).nice().range([height, 0]);
            xrange = d3.extent(data, function (d) { return d[encoding.x.field]; })
            yrange = y.domain()
        } else {
            data = getAggregatedRows(data, encoding);
            xrange = d3.extent(data, function (d) { return d[encoding.x.field]; });
            y = d3.scaleLinear()
            y.domain([0, d3.max(data, function (d) { return d[encoding.y.field]; })]).nice().range([height, 0]);
            yrange = y.domain()
        }
        this.state = { xrange: xrange, yrange: yrange, categories: categories };
        animation.spec.rangeX = animation.spec.rangeX ? animation.spec.rangeX : [0, 100];
        animation.spec.rangeY = animation.spec.rangeY ? animation.spec.rangeY : yrange;
        animation.description = "Reconfigure the range in x:[" + this.handleRangeXText(animation.spec.rangeX) + "],y:[" + animation.spec.rangeY + "]";

    }

    handleEffectChange = e => {
        const { index, animation } = this.props;
        animation.spec.effect = e.target.value;
        if (animation.spec.effect === 'zoom out') {
            animation.spec.rangeX = [0, 100];
            animation.spec.rangeY = [0, Math.ceil(this.state.yrange[1])];
            animation.description = "Reconfigure the range in x:[" + this.handleRangeXText(animation.spec.rangeX) + "],y:[" + animation.spec.rangeY + "]";
        }
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeYChange = (range) => {
        const { index, animation } = this.props;
        animation.spec.lastRangeY = Object.assign([], animation.spec.rangeY);
        animation.spec.rangeY = range;
        animation.description = "Reconfigure the range in x:[" + this.handleRangeXText(animation.spec.rangeX) + "],y:[" + animation.spec.rangeY + "]";
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeXChange = (range) => {
        const { index, animation } = this.props;
        animation.spec.lastRangeX = Object.assign([], animation.spec.rangeX);
        animation.spec.rangeX = range;
        animation.description = "Reconfigure the range in x:[" + this.handleRangeXText(range) + "],y:[" + animation.spec.rangeY + "]";
        this.props.modifyChartAnimation(index, animation);
    }

    handleRangeXText = (range) => {
        range = range ? range : [0, 100];
        let x0 = range[0];
        let x1 = range[1];
        let n_categories = this.state.categories.length; 
        let n_categories_ = 100 / n_categories; 
        x0 = this.state.categories[Math.floor(x0 / n_categories_)];
        x1 = x1 === 100 ? this.state.categories.slice(-1)[0] : this.state.categories[Math.floor(x1 / n_categories_)];
        return x0 + "," + x1;
    }

    handleDurationChange = e => {
        const { index, animation } = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        let { animation } = this.props;
        let rangeSetting = (
            <div>
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Range Y:</h3></Col>
                    <Col span={18}>
                        <Slider
                            range
                            min={0}
                            max={Math.ceil(this.state.yrange[1])}
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
                {animation.spec.effect === 'zoom in' && rangeSetting}
                <Row style={{ height: 50 }}>
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="zoom in">Zoom in</Radio.Button>
                            <Radio.Button value="zoom out">Zoom out</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>

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
