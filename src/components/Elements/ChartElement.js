import React, { Component } from 'react';
import { Group } from 'react-konva';
import _ from 'lodash';
import ChartType from '@/constants/ChartType';
import VegaLite from '@/charts/VegaLite';

let lastScale = '';

export default class ChartElement extends Component {
    constructor(props) {
        super(props);
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }

    dragstart() {
        this.props.editStart();
    };


    dragmove(x,y){
        let dragpos = {x,y};
        this.props.dragElement(dragpos);
    }
    dragend(x,y) {
        var newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
        if (Math.abs(x - 400) < 40) {
            x = 400;
            //console.log("吸附x")
        }
        if (Math.abs(y - 225) < 40) {
            y = 225;
            //console.log("吸附y")
        }
        //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
    };

    onTransformStart() {
        this.props.editStart();
    }

    
    onTransform(e) {
        let currentWidth = this.props.currentElement.info().width;
        let currentHeight = this.props.currentElement.info().height;
        let w,h,r = '';
        if(lastScale!==e.currentTarget.scaleX()){
             w = currentWidth*e.currentTarget.scaleX();
             h = currentHeight*e.currentTarget.scaleY();
        }else{
             w = currentWidth;
             h = currentHeight;
        }
             r = e.currentTarget.rotation();  
        let transforminfo = {w,h,r};
        this.props.transformElement(transforminfo);
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
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y())
                }}
                onDragEnd={e => {
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={e => {
                    this.onTransform(e);
                }}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                {this.chooseChart()}
            </Group>
        )
    }
}
