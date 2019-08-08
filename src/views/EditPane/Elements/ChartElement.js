import React, { Component } from 'react';
import { Group } from 'react-konva';
import BarChart from '../../../charts/BarChart';

export default class ChartElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
        this.dragend = this.dragend.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
    }
    dragend(x,y) {
        var newEle = this.props.element;
        newEle.info.x = x;
        newEle.info.y = y;
        this.props.edit(newEle);
    };

    onTransformStart() {
        // console.log("onTransformStart");
    }
    onTransform() {
        // console.log("onTransform");
    }
    onTransformEnd(e) {
        // console.log("end transform");
        var newEle = this.props.element;
        newEle.info.x = e.target.x();
        newEle.info.y = e.target.y();
        newEle.info.width = e.target.width()*e.target.scaleX();
        newEle.info.height = e.target.height()*e.target.scaleY();
        newEle.info.rotation = e.target.rotation();
        this.props.edit(newEle);
    }

    render() {
        return (
            <Group name={this.props.name} draggable
                x={this.props.element.info.x}
                y={this.props.element.info.y}
                width={this.props.element.info.width}
                height={this.props.element.info.height}
                rotation={this.props.element.info.rotation}
                //draggable
                onDragStart={() => {
                    // this.setState({
                    //     isDragging: true
                    // });
                    console.log("begin")
                }}
                onDragEnd={e => {
                    // this.setState({
                    //     isDragging: false,
                    //     x: e.target.x(),
                    //     y: e.target.y()
                    // });
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={this.onTransform}
                onTransformEnd={this.onTransformEnd}
            >
                <BarChart name={this.props.name}/>
            </Group>
        )
    }
}
