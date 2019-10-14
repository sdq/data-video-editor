import React, { Component } from 'react';
import { Group } from 'react-konva';
import _ from 'lodash';
import ChartContainer from '@/charts/ChartContainer';

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
        return  <ChartContainer 
                    type={this.props.element.info().type}
                    name={this.props.name} 
                    data={data} 
                    spec={this.props.element.info().spec} 
                    width={this.props.width} 
                    height={this.props.height} 
                    onCanvas={true} 
                    showAnimation={this.props.showAnimation} 
                    animations={this.props.element.animations()} 
                    current={this.props.scenePosition}
                />
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
