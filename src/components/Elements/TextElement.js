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

        //基础吸附功能
        let w = this.props.currentElement.info().width;
        let h = this.props.currentElement.info().height;        
        let margin = 10;

        let marginLeftL = Math.abs(x - 0); //素材左-画布左
        let marginTopT = Math.abs(y - 0);  //素材上-画布上
        let marginRightR = Math.abs(x+w - 800);  //素材右-画布右
        let marginBottomB = Math.abs(y+h - 450);  //素材下-画布下

        let marginCenterXC = Math.abs(x+w/2 - 400);  //素材中-画布中
        let marginCenterYC = Math.abs(y+h/2 - 225);  //素材中-画布中
        let marginLeftC = Math.abs(x - 400); //素材左-画布中
        let marginTopC = Math.abs(y - 225);  //素材上-画布中
        let marginRightC = Math.abs(x+w - 400);  //素材右-画布中
        let marginBottomC = Math.abs(y+h - 225);  //素材下-画布中

        if( marginLeftL < margin){x=0;}//素材左-画布左
        if( marginTopT < margin){y=0;}//素材上-画布上
        if( marginRightR < margin){x=800-w;}//素材右-画布右
        if( marginBottomB < margin){y=450-h;}//素材下-画布下

        if( marginCenterXC < margin){x=400-w/2;}//素材中-画布中
        if( marginCenterYC < margin){y=225-h/2;}//素材中-画布中
        if( marginLeftC < margin){x=400;}//素材左-画布中
        if( marginTopC < margin){y=225;}//素材上-画布中
        if( marginRightC < margin){x=400-w;}//素材右-画布中
        if( marginBottomC < margin){y=225-h;}//素材下-画布中

        //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
        const newEle = _.cloneDeep(this.props.element);
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
        //Determine whether scale is equal to last time(Rotation only)
        //So scale calculation is not performed at this time
        if(lastScale!==e.currentTarget.scaleX()){
             w = currentWidth*e.currentTarget.scaleX();
             //h = currentHeight*e.currentTarget.scaleY();
             //计算新的文字高度
             h = Math.ceil((this.props.currentElement.info().text.length * this.props.currentElement.info().textSize)/w)*(this.props.currentElement.info().textSize+5);
             //实时更改素材的真实w,h，以便显示正确边框和辅助线
             this.props.currentElement.info().width = w;
             this.props.currentElement.info().height = h;
             
        }else{
             w = currentWidth;
             h = currentHeight;
        }
             r = e.currentTarget.rotation();
        //实时更改素材的真实r，以便显示正确边框和辅助线
        this.props.currentElement.info().rotation = r;
        let transforminfo = {w,currentHeight,r};
        this.props.transformElement(transforminfo);
     }

    onTransformEnd(e) {  
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        if(lastScale!==e.target.scaleX()){
            newEle.info().width = newEle.info().width*e.target.scaleX(); 
            //newEle.info().height = newEle.info().height*e.target.scaleY(); 
            newEle.info().height = Math.ceil((this.props.currentElement.info().text.length * this.props.currentElement.info().textSize)/this.props.currentElement.info().width)*(this.props.currentElement.info().textSize+5)
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
                    width = {this.props.element.info().width}
                    height = {this.props.element.info().height} 
                />
            </Group>
        )
    }
}
