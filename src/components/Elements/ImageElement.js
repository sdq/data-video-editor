import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';

export default class ImageElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
        this.originWidth = props.element.info().width;
        this.originHeight = props.element.info().height;
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }
    componentDidMount() {
        this.loadImage();
        const animations = this.props.element.animations(); 
        if (this.props.showAnimation && animations.length !== 0) {
            let animationCreator = new AnimationCreator(this.imageref);
            let current = this.props.scenePosition;
            if (this.props.isVideoPerforming) {
                current = 0;
            }
            for (let index = 0; index < animations.length; index++) {
                const animation = animations[index];
                animationCreator.fromModel(animation).play(current);
            }
        }
    }
    componentDidUpdate(oldProps) {
        if (oldProps.element.info().src !== this.props.element.info().src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        // adding a rand to avoid a Chrome caching issue
        // once you already had made a request to this image without requesting for the CORS headers
        // the following request would fail
        // var rand = '?'+Math.random();
        this.image.src = this.props.element.info().src //+ rand;
        // this.image.crossOrigin='anonymous'
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

    // Edit
    dragstart() {
        this.props.editStart();
    };

    dragmove(x,y,e){
        this.props.dragMoving(x,y,e);
    }


    dragend(x,y) {
        let index = this.props.elementIndex;
        this.props.dragEnding(x,y,index);
    };


    onTransformStart(e) {
        this.props.editStart();
    }

    onTransform(e) {
        let originWidth = this.originWidth;
        let originHeight = this.originHeight;
        this.props.transforming(e,originWidth,originHeight);
     }

    onTransformEnd(e) {
        let index = this.props.elementIndex;
        let originWidth = this.originWidth;
        let originHeight = this.originHeight;
        this.props.transformEnding(e,index,originWidth,originHeight);
    }

    render() {
        const isPosTool = this.props.element?this.props.element.info().isPosTool:null;
        console.log("image",isPosTool,this.props.element.info().width)
        return (
            <Group name={this.props.name} 
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y} 
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y(),e)
                }}
                onDragEnd={e => {
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={e => {
                    this.onTransform(e);
                }}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                <Image 
                    ref={node=>this.imageref=node}
                    width={isPosTool?this.props.element.info().width:(this.props.draggable?this.originWidth:this.props.element.info().width)}
                    height={isPosTool?this.props.element.info().height:(this.props.draggable?this.originHeight:this.props.element.info().height)}
                    name={this.props.name}
                    image={this.state.image} 
                    opacity = {this.props.element.info().opacity}
                />
            </Group>
        )
    }
}
