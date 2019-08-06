import React, { Component } from 'react';
import { Text, Group } from 'react-konva';
import Color from '../../../constants/Color';

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
            <Group name={this.props.name} draggable
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
