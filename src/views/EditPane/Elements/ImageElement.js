import React, { Component } from 'react';
import { Image } from 'react-konva';

export default class ImageElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.element.info.x,
            y: props.element.info.y,
            image: null,
        };
        this.dragend = this.dragend.bind(this);
    }
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.element.info.src !== this.props.element.info.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.element.info.src;
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    dragend(x,y) {
        var newEle = this.props.element;
        newEle.info.x = x;
        newEle.info.y = y;
        this.props.edit(newEle);
    };
    render() {
        return (
            <Image 
                image={this.state.image} 
                x={this.state.x}
                y={this.state.y}
                draggable
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
            />
        )
    }
}
