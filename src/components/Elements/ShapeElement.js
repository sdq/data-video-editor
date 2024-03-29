import React, { Component } from 'react';
import {Group } from 'react-konva';
import {Rect, Circle, Line ,Ellipse,Star,Arrow } from 'react-konva';
import { AnimationCreator } from '@/animation';
import Color from '@/constants/Color';


//  let oringinGapW = '';
//  let oringinGapH = '';

export default class ShapeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            isTransforming:false,
        };
        this.originWidth = props.element.info().width;//切换屏幕才刷新一次
        this.originHeight = props.element.info().height;
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
            let animationCreator = new AnimationCreator(this.shaperef);
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
     
 


    componentWillUpdate(){
        const isPosTool =this.props.element?this.props.element.info().isPosTool:null;
    if(isPosTool){
        //把pos传来的高宽度实时赋给origin
        this.originWidth = this.props.element.info().width;//-gapw 但并没有作用
        this.originHeight = this.props.element.info().height;
         }
    }

    // shouldComponentUpdate(){
    //     const isPosTool =this.props.element?this.props.element.info().isPosTool:null;
    //     if(!isPosTool){
    //     //transform结束时，提前赋值给origin,但并没有作用
    //     this.originWidth = this.props.element.info().width;
    //     this.originHeight = this.props.element.info().height;
    //     return false;
    //     }else{
    //         return true;  
    //     }
    // }


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
        this.setState({
            isTransforming: true
        });
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
        this.setState({
            isTransforming: false
         })
        //  oringinGapW = this.props.element.info().width-this.originWidth;
        //  oringinGapH = this.props.element.info().height-this.originHeight;
        
    }

    render() {
        const isPosTool =this.props.element?this.props.element.info().isPosTool:null;
        let draggable = this.props.draggable;
        
         //测试情况
        //this.props.draggable:拖拽或者拉伸结束后变为false，拖拽中为true
        //this.props.element.info().width：拉伸后会记录当前数值
        //this.originWidth：拉伸后不会变化，保持原始，切换场景后会变化为当前数值
        //当posttool改变后，this.props.draggable 变为true一次，再变为false
        //进行拖动后，所有参数并无变化，但是素材会恢复原始状态，transform框不恢复
        //素材的大小拖拽中显示originWidth，拖拽后确是正确大小
        //与是否同比例缩放无关

           /*TODO:
    bug:当拉伸结束后，通过pos调整位置；或者通过pos调整位置，再拉伸，都会出现图形大小突变的情况。
    (origin 200，拉伸到220，但它依旧保持200不变，此时postool改为221，则图形会从200-221产生突变；若直接改变origin就会产生突变。)
    这是因为拉伸时，使用的是当前不变的originW（pos直接修改了element

    (通过postool判断是否为pos传来的数值-使用elementw进行render，可以解决无法使用pos修改大小的问题，但依然无法解决拉伸后pos操作的bug)
    为了解决该问题尝试：1、每次transform结束后把真实的elementw给originw，无用，依然突变
                       2、计算每次拉伸的尺度，再pos操作时，减去该差距再赋给render，相当于把221改成201赋给原本为200的origin，以实现220-221的变化，依旧无用。
    猜测是图形系统突变，而不是数值问题
    */

           //拉伸时：oringinWidth用来控制素材在拉伸时不超出画布，所以不能变化
        //但拖拽时：oringinWidth如果保持不变，会导致通过postool修改size后，一拖拽就会变回orginwidth的大小
        //所以需要参数来区分拖拽和拉伸，保证draggable在拖拽this.props时为false，在拉伸时为true



         /*可以使得postool更改后，拖拽不再变形，但影响其他功能*/
         //let isDrag = this.props.isDrag;
        // let isDrag = this.props.isDrag;
        // if(isDrag===true||!isDrag){
        //     draggable = false;
        // }else{
        //     draggable = this.props.draggable
        // }
        return (
            <Group 
                name={this.props.name}
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                scaleX={isPosTool?1:this.props.element.info().scaleX} //posTool控制了真实的宽高，需要将scaleX重置
                scaleY={isPosTool?1:this.props.element.info().scaleY} //posTool控制了真实的宽高，需要将scaleY重置
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
                onTransformEnd={e => {
                    this.onTransformEnd(e);
                    }}
                visible={this.props.visible}
            >

            {this.props.element.info().shapeType==="rect"?
                <Rect
                ref={node=>this.shaperef=node}
                fill={this.props.element.info().color}
                opacity={this.props.element.info().opacity}
                name={this.props.name}
                width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                height={isPosTool?this.props.element.info().height:(draggable?this.originHeight:this.props.element.info().height)}
                stroke={this.props.element.info().stroke}
                strokeWidth={this.props.element.info().strokeWidth}
                shadowBlur={this.props.element.info().shadowBlur}
                shadowColor={this.props.element.info().shadowColor}
                cornerRadius={this.props.element.info().cornerRadius}
          />
            :null}

                {this.props.element.info().shapeType==="line"?
                <Line
                ref={node=>this.shaperef=node}
                points={[
                    this.props.element.info().x, 
                    this.props.element.info().y, 
                    this.props.element.info().x+(draggable?this.originWidth:this.props.element.info().width), 
                    this.props.element.info().y]}
                //tension={0}
                //closed
                offsetX={this.props.element.info().x}
                offsetY={this.props.element.info().y}
                width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                height={this.props.element.info().strokeWidth?this.props.element.info().strokeWidth:3}
                opacity={this.props.element.info().opacity}
                name={this.props.name}
                stroke={this.props.element.info().stroke?this.props.element.info().stroke:Color.ORANGE}
                strokeWidth={this.props.element.info().strokeWidth}
                shadowBlur={this.props.element.info().shadowBlur}
                shadowColor={this.props.element.info().shadowColor}
        />
            :null} 

                {this.props.element.info().shapeType==="circle"?
                <Circle
                ref={node=>this.shaperef=node}
                //circle坐标起点不同，以圆心为坐标点,需要设置offset
                offsetX={(this.props.draggable?-this.originWidth/2:-this.props.element.info().width/2)}
                offsetY={(this.props.draggable?-this.originWidth/2:-this.props.element.info().width/2)}
                fill={this.props.element.info().color}
                radius={this.props.draggable?this.originWidth/2:this.props.element.info().width/2}
                width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                height={isPosTool?this.props.element.info().height:(draggable?this.originHeight:this.props.element.info().height)}
                opacity={this.props.element.info().opacity}
                name={this.props.name}
                stroke={this.props.element.info().stroke}
                strokeWidth={this.props.element.info().strokeWidth}
                shadowBlur={this.props.element.info().shadowBlur}
                shadowColor={this.props.element.info().shadowColor}
          />
            :null}     
                            
                {this.props.element.info().shapeType==="ellipse"?
                <Ellipse
                ref={node=>this.shaperef=node}
                //Ellipse坐标起点不同，以圆心为坐标点,需要设置offset
                offsetX={(this.props.draggable?-this.originWidth/2:-this.props.element.info().width/2)}
                offsetY={(this.props.draggable?-this.originHeight/2:-this.props.element.info().height/2)}
                fill={this.props.element.info().color}
                radius={[this.props.draggable?this.originWidth/2:this.props.element.info().width/2,
                this.props.draggable?this.originHeight/2:this.props.element.info().height/2]}
                width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                height={isPosTool?this.props.element.info().height:(draggable?this.originHeight:this.props.element.info().height)}
                opacity={this.props.element.info().opacity}
                name={this.props.name}
                stroke={this.props.element.info().stroke}
                strokeWidth={this.props.element.info().strokeWidth}
                shadowBlur={this.props.element.info().shadowBlur}
                shadowColor={this.props.element.info().shadowColor}
          />
            :null}  

                {this.props.element.info().shapeType==="star"?
                <Star
                ref={node=>this.shaperef=node}
                //Star坐标起点不同，以圆心为坐标点,需要设置offset
                offsetX={(this.props.draggable?-this.originWidth/2:-this.props.element.info().width/2)}
                offsetY={(this.props.draggable?-this.originWidth/2:-this.props.element.info().width/2)}
                fill={this.props.element.info().color}
                numPoints={this.props.element.info().numPoints}
                innerRadius={this.props.draggable?this.originWidth/4:this.props.element.info().width/4}
                outerRadius={this.props.draggable?this.originWidth:this.props.element.info().width}
                width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                height={isPosTool?this.props.element.info().height:(draggable?this.originHeight:this.props.element.info().height)}
                opacity={this.props.element.info().opacity}
                name={this.props.name}
                stroke={this.props.element.info().stroke}
                strokeWidth={this.props.element.info().strokeWidth}
                shadowBlur={this.props.element.info().shadowBlur}
                shadowColor={this.props.element.info().shadowColor}
          />
            :null}       

         {this.props.element.info().shapeType==="arrow"?
          <Arrow
          ref={node=>this.shaperef=node}
          points={[this.props.element.info().x, 
                  this.props.element.info().y, 
                  this.props.element.info().x+(this.props.draggable?this.originWidth:this.props.element.info().width), 
                  this.props.element.info().y]}
          offsetX={this.props.element.info().x}
          offsetY={this.props.element.info().y}
          //tension={0}
          //closed
          width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
          height={this.props.element.info().strokeWidth?this.props.element.info().strokeWidth:3}
          pointerLength={this.props.element.info().pointerLength}
          pointerWidth={this.props.element.info().pointerWidth}
          pointerAtBeginning={false}
          opacity={this.props.element.info().opacity}
          name={this.props.name}
          stroke={this.props.element.info().stroke?this.props.element.info().stroke:Color.ORANGE}
          strokeWidth={this.props.element.info().strokeWidth}
          shadowBlur={this.props.element.info().shadowBlur}
          shadowColor={this.props.element.info().shadowColor}
        />
            :null} 
  
            </Group>
            
        )
    }
}
