import React, { Component } from 'react';
import { Image, Group } from 'react-konva';

export default class ImageElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
        this.dragend = this.dragend.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
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
                    //     x: e.target.x(),
                    //     y: e.target.y()
                    // });
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={this.onTransform}
                onTransformEnd={this.onTransformEnd}
            >
                <Image 
                    name={this.props.name}
                    image={this.state.image} 
                />
            </Group>
        )
    }
}
