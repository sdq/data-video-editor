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
        this.dragend = this.dragend.bind(this);
    }
    dragend(x,y) {
        var newEle = this.props.element;
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };
    onTransformStart() {
        console.log("onTransformStart");
    }
    onTransform() {
        console.log("onTransform");
    }
    onTransformEnd(e) {
        console.log("end transform");
        console.log(e.target);
        // const node = shapeRef.current;
        // const scaleX = node.scaleX();
        // const scaleY = node.scaleY();

        // // we will reset it back
        // node.scaleX(1);
        // node.scaleY(1);
        // onChange({
        //   ...shapeProps,
        //   x: node.x(),
        //   y: node.y(),
        //   width: node.width() * scaleX,
        //   height: node.height() * scaleY
        // });
    }
    render() {
        return (
            <Group name={this.props.name}
                draggable = {this.props.draggable}
                x={this.state.x}
                y={this.state.y}
                onDragStart={() => {
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
