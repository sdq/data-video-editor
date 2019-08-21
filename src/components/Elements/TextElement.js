import React, { Component } from 'react';
import { Text, Group } from 'react-konva';
import Color from '@/constants/Color';

export default class TextElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            text: props.element.info().text,
            x: props.element.info().x,
            y: props.element.info().y,
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
        var newEle = this.props.element;
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };
    onTransformStart() {
        this.props.editStart();
    }
    onTransform() {
        //console.log("onTransform");
    }
    onTransformEnd(e) {
        var newEle = this.props.element;
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        newEle.info().width = e.target.width()*e.target.scaleX();
        newEle.info().height = e.target.height()*e.target.scaleY();
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
    }
    render() {
        return (
            <Group name={this.props.name}
                draggable = {this.props.draggable}
                x={this.state.x}
                y={this.state.y}
                onDragStart={() => {
                    this.dragstart();
                    this.setState({
                        isDragging: true
                    });
                }}
                onDragEnd={e => {
                    this.setState({
                        isDragging: false,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                    this.dragend(e.target.x(), e.target.y());
                }}
                onTransformStart={this.onTransformStart}
                onTransform={this.onTransform}
                onTransformEnd={this.onTransformEnd}
            >
                <Text
                    name={this.props.name}
                    text={this.state.text}
                    fontSize={18}
                    //draggable
                    fill={this.state.isDragging ? Color.DEEP_ORANGE : 'black'}
                />
            </Group>
        )
    }
}
