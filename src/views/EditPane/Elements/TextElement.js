import React, { Component } from 'react';
import { Text } from 'react-konva';

export default class TextElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            text: props.element.info.text,
            x: props.element.info.x,
            y: props.element.info.y,
        };
        this.dragend = this.dragend.bind(this);
    }
    dragend(x,y) {
        var newEle = this.props.element;
        newEle.info.x = x;
        newEle.info.y = y;
        this.props.edit(newEle);
    };
    render() {
        return (
            <Text
                text={this.state.text}
                x={this.state.x}
                y={this.state.y}
                fontSize={18}
                draggable
                fill={this.state.isDragging ? 'green' : 'black'}
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
            />
        )
    }
}
