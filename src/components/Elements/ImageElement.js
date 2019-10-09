import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';
import _ from 'lodash';


let lastScale = '';  

export default class ImageElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
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
        this.image.src = this.props.element.info().src;
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

    dragmove(x,y){
        let dragpos = {x,y};
        this.props.dragElement(dragpos);
    }

    dragend(x,y) {
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };

    onTransformStart(e) {
        lastScale = e.currentTarget.scaleX();//initial scaleX
        this.props.editStart();
    }

    onTransform(e) {
        let currentWidth = this.props.currentElement.info().width;
        let currentHeight = this.props.currentElement.info().height;
        let w,h,r = '';
        if(lastScale!==e.currentTarget.scaleX()){
             w = currentWidth*e.currentTarget.scaleX();
             h = currentHeight*e.currentTarget.scaleY();
        }else{
             w = currentWidth;
             h = currentHeight;
        }
             r = e.currentTarget.rotation();  
        let transforminfo = {w,h,r};
        this.props.transformElement(transforminfo);
     }

    onTransformEnd(e) {
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        if(lastScale!==e.target.scaleX()){
            newEle.info().width = newEle.info().width*e.target.scaleX(); 
            newEle.info().height = newEle.info().height*e.target.scaleY(); 
        }
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
    }

    render() {
        return (
            <Group name={this.props.name} 
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y())
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
                    // width={this.props.element.info().width}
                    // height={this.props.element.info().height}
                    name={this.props.name}
                    image={this.state.image} 
                    opacity = {this.props.element.info().opacity}
                />
            </Group>
        )
    }
}
