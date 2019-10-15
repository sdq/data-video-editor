import React, { Component } from 'react';
import { Text, Group } from 'react-konva';
import Color from '@/constants/Color';
import { AnimationCreator } from '@/animation';
import _ from 'lodash';


let lastScale = '';  

export default class TextElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            text: props.element.info().text,
        };
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }

    componentDidMount() {
        const animations = this.props.element.animations(); 
        if (this.props.showAnimation && animations.length !== 0) {
            let animationCreator = new AnimationCreator(this.textref);
            let current = this.props.scenePosition;
            for (let index = 0; index < animations.length; index++) {
                const animation = animations[index];
                animationCreator.fromModel(animation).play(current);
            }
        }
    }

    dragstart() {
        this.props.editStart();
    };

    dragmove(x,y){
        //实时更改素材的真实X,Y，以便吸附
        this.props.currentElement.info().x = x;
        this.props.currentElement.info().y = y;
        //更改toolbar实时位置显示
        let dragpos = {x,y};
        this.props.dragElement(dragpos);
    }

    dragend(x,y) {
        const newEle = _.cloneDeep(this.props.element);
        if (Math.abs(x - 400) < 40) {
            x = 400;
           // console.log("吸附x")
        }
        if (Math.abs(y - 225) < 40) {
            y = 225;
           // console.log("吸附y")
        }
        //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };

    onTransformStart() {
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

    onTransformEnd(e) {  //text with no real size
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
                onDragStart={() => {
                    this.dragstart();
                    this.setState({
                        isDragging: true
                    });
                }}
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y())
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
                    fontFamily = {this.props.element.info().fontFamily} // nouse  fontFamily
                    fontStyle = {this.props.element.info().fontStyle}  //can be normal, bold, or italic. Default is normal
                    textDecoration = {this.props.element.info().textDecorationLine}//can be line-through, underline or empty string. Default is empty string. 
                    opacity = {this.props.element.info().opacity}
                    align = {this.props.element.info().textAlign}
                    //width = {this.props.element.info().width}//the number of text*scale
                    width = {(this.props.element.info().text.length*this.props.element.info().textSize)}
                    height = {this.props.element.info().height} //fake  the number or rows and scale
                    //height = {((this.props.element.info().text.length*this.props.element.info().textSize)/this.props.element.info().width)*this.props.element.info().textSize}
                />
            </Group>
        )
    }
}
