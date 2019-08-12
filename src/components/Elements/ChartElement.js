import React, { Component } from 'react';
import { Group } from 'react-konva';
import ChartType from '../../constants/ChartType';
import BarChart from '../../charts/BarChart';
import LineChart from '../../charts/LineChart';
import Scatterplot from '../../charts/Scatterplot';
import AreaChart from '../../charts/AreaChart';
import Histogram from '../../charts/Histogram';

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

    chooseChart() {
        switch (this.props.element.info.type) {
            case ChartType.AREACHART:
                return <AreaChart name={this.props.name}/>
            case ChartType.BARCHART:
                return <BarChart name={this.props.name}/>
            case ChartType.LINECHART:
                return <LineChart name={this.props.name}/>
            case ChartType.SCATTERPLOT:
                return <Scatterplot name={this.props.name}/>
            case ChartType.HISTOGRAM:
                return <Histogram name={this.props.name}/>
        
            default:
                return <Histogram name={this.props.name}/>
        }
    }

    render() {
        return (
            <Group name={this.props.name}
                draggable = {this.props.draggable}
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
                    // console.log("begin")
                }}
                onDragEnd={e => {
                    // this.setState({
                    //     isDragging: false,
                    // });
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={this.onTransform}
                onTransformEnd={this.onTransformEnd}
            >
                {this.chooseChart()}
            </Group>
        )
    }
}
