import React, { Component } from 'react';
import { Group } from 'react-konva';
import _ from 'lodash';
import ChartType from '@/constants/ChartType';
import VegaLite from '@/charts/VegaLite';

export default class ChartElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
        this.dragstart = this.dragstart.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
    }

    dragstart() {
        this.props.editStart();
    };

    dragend(x,y) {
        var newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };

    onTransformStart() {
        this.props.editStart();
    }
    onTransform() {
        // console.log("onTransform");
    }
    onTransformEnd(e) {
        // console.log("end transform");
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        newEle.info().width = e.target.width()*e.target.scaleX();
        newEle.info().height = e.target.height()*e.target.scaleY();
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
    }

    chooseChart() {
        var data = {};
        if (!_.isEmpty(this.props.dataList)) {
            data = this.props.dataList[this.props.element.info().dataIndex];
        }
        switch (this.props.element.info().type) {
            case ChartType.AREACHART:
                return <VegaLite.AreaChart name={this.props.name} data={data} spec={this.props.element.info().spec} width={this.props.width} height={this.props.height} onCanvas={true} showAnimation={this.props.showAnimation} animations={this.props.element.animations()} current={this.props.scenePosition}/>
            case ChartType.BARCHART:
                return <VegaLite.BarChart name={this.props.name} data={data} spec={this.props.element.info().spec} width={this.props.width} height={this.props.height} onCanvas={true} showAnimation={this.props.showAnimation} animations={this.props.element.animations()} current={this.props.scenePosition}/>
            case ChartType.LINECHART:
                return <VegaLite.LineChart name={this.props.name} data={data} spec={this.props.element.info().spec} width={this.props.width} height={this.props.height} onCanvas={true} showAnimation={this.props.showAnimation} animations={this.props.element.animations()} current={this.props.scenePosition}/>
            case ChartType.SCATTERPLOT:
                return <VegaLite.Scatterplot name={this.props.name} data={data} spec={this.props.element.info().spec} width={this.props.width} height={this.props.height} onCanvas={true} showAnimation={this.props.showAnimation} animations={this.props.element.animations()} current={this.props.scenePosition}/>
            case ChartType.HISTOGRAM:
                return <VegaLite.Histogram name={this.props.name} data={data} spec={this.props.element.info().spec} width={this.props.width} height={this.props.height} onCanvas={true} showAnimation={this.props.showAnimation} animations={this.props.element.animations()} current={this.props.scenePosition}/>
        
            default:
                return <VegaLite.BarChart name={this.props.name} data={data} spec={this.props.element.info().spec} onCanvas={true} showAnimation={this.props.showAnimation} animations={this.props.element.animations()} current={this.props.scenePosition}/>
        }
    }

    render() {
        return (
            <Group name={this.props.name}
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                width={this.props.element.info().width}
                height={this.props.element.info().height}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragEnd={e => {
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={this.onTransform}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                {this.chooseChart()}
            </Group>
        )
    }
}
