import React, { Component } from 'react';
import { Text, Group } from 'react-konva';
import Color from '@/constants/Color';
import { AnimationCreator } from '@/animation';

let textRealHeight;
export default class TextElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            text: props.element.info().text
        };
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }

    componentDidMount() {
        //页面加载后动态根据宽度更新高度
        textRealHeight = this.textref.getHeight(); 
        this.props.element.info().height = textRealHeight;

        const animations = this.props.element.animations(); 
        if (this.props.showAnimation && animations.length !== 0) {
            let animationCreator = new AnimationCreator(this.textref);
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
    

    onTransformStart() {
        this.props.editStart();
    }

    onTransform(e) {
        textRealHeight = this.textref.getHeight();
        let scaleX = this.textNode.attrs.scaleX;
        let width = this.textNode.attrs.width;
        // reset scale, so only with is changing by transformer
        this.textNode.setAttrs({
            width: scaleX * width,
            height: textRealHeight,
            scaleX: 1
        });
        this.textref.setAttrs({
            width: scaleX * width,
            scaleX: 1
        }); 
        this.props.transforming(e);
     }

    onTransformEnd(e) {
        textRealHeight = this.textref.getHeight();
        let scaleX = this.textNode.attrs.scaleX;
        let width = this.textNode.attrs.width;
        // reset scale, so only with is changing by transformer
        this.textNode.setAttrs({
            width: scaleX * width,
            height: textRealHeight,
            scaleX: 1
        });
        this.textref.setAttrs({
            width: scaleX * width,
            scaleX: 1
        }); 
        this.props.transformEnding(e);
    }
    render() {

        return (
            <Group name={this.props.name}
                ref={node => this.textNode = node}
                width={this.props.element.info().width}         
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                rotation={this.props.element.info().rotation}
                onDragStart={() => {
                    this.dragstart();
                    this.setState({
                        isDragging: true
                    });
                }}
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y(),e)
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
                onTransform={e => {
                    this.onTransform(e);
                }}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                <Text
                    ref = {node=>this.textref=node}
                    name = {this.props.name}
                    text = {this.props.element.info().text}
                    fill = {this.state.isDragging ? Color.DEEP_ORANGE : this.props.element.info().color}
                    fontSize = {this.props.element.info().textSize}  //init  fontSize
                    fontFamily = {this.props.element.info().fontFamily} // no use  fontFamily
                    fontStyle = {this.props.element.info().fontStyle}  //can be normal, bold, or italic. Default is normal
                    textDecoration = {this.props.element.info().textDecorationLine}//can be line-through, underline or empty string. Default is empty string. 
                    opacity = {this.props.element.info().opacity}
                    align = {this.props.element.info().textAlign}
                    width={this.props.element.info().width}
                />
            </Group>
            
        )
    }
}
