import React, { Component } from 'react';
import { Text } from 'react-konva';

export default class TextElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            text: props.text,
            x: props.x,
            y: props.y,
            image: null,
        };
    }
    render() {
        return (
            <Text
                text={this.state.text}
                x={this.state.x}
                y={this.state.y}
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
                }}
            />
        )
    }
}
