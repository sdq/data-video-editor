import React, { Component } from 'react';
import { Image } from 'react-konva';

export default class ImageElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            image: null,
        };
    }
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.src;
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
    render() {
        return (
            <Image 
                image={this.state.image} 
                x={this.state.x}
                y={this.state.y}
                draggable
            />
        )
    }
}
