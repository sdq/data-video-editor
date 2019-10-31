import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';
import _ from 'lodash';

export default class GifElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
        };
        this.originWidth = props.element.info().width;
        this.originHeight = props.element.info().height;
        this.isToAnimate = false;
        this.data = this.props.element.info().gifFrames || [];
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }
    componentDidMount() {
        //默认显示第一帧
        this.setState({
            canvas: this.data[0] && this.data[0].getImage()
        });
        if (this.props.showAnimation) {
            this.isToAnimate = true
        }

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
        //console.log("Update...", this.isToAnimate)
        if (this.isToAnimate) {
            this.play();
        }
    }
    componentWillUnmount() {
        //console.log("Umount...", this.isToAnimate)
        this.pause();
    }


    play = () => {
        //console.log("play...", this._imageDelay)
        this.isToAnimate = false;
        let that = this;
        let defaultDelay = this.props.element.info().gifFrames && this.props.element.info().gifFrames[0].frameInfo.delay;
        //delay 单位是0.01s,this.props.element.info().delay * 10 转化为ms         
        //this.props.element.info().delay 是外部控制的1x,2x,3x,数值是1，2，3...       
        let gifDelay =(10 * defaultDelay)/this.props.element.info().delay;
        //console.log("gifDelay",gifDelay)
        for (let i = 0; i < this.data.length; i++) {
            (function (playFrame) {
                // update canvas that we are using for Konva.Image
                that._startTimeout = setTimeout(() => {
                    that.setState({
                        canvas: that.data[playFrame].getImage(),
                    })
                    //console.log("drawImage", playFrame)
                }, gifDelay * playFrame);

                //最后一帧，递归播放
                if (playFrame === that.data.length - 1) {
                    that._startTimeoutNext = setTimeout(() => {
                        that.play();
                    }, gifDelay * (playFrame + 1));
                }
            })(i);
        };
    };
    pause = () => {
        //console.log("pause...")
        if (this._startTimeout) {
            clearTimeout(this._startTimeout);
        }
        if (this._startTimeoutNext) {
            clearTimeout(this._startTimeoutNext);
        }

    }
        // if (oldProps.element.info().src !== this.props.element.info().src) {
        //     this.loadImage();
        // }

    // Edit
    dragstart() {
        this.props.editStart();
    };

   
    dragmove(x,y,e){
        
        let normal = true;  //正常
        //主动吸附功能
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

 // 逻辑：在靠近辅助线的时候，位置直接更改，可以再次拖动, 直接改动系统级当前抓取的元素

        if( marginLeftL < margin){   
            x = 0;    
            e.target.attrs.x = 0;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            //素材左-画布左
            normal = false;
        }
        if( marginTopT < margin){
            y = 0;
            e.target.attrs.y = 0;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            //素材上-画布上
            normal = false;
        }
        if( marginRightR < margin){
            x = 800 -w;
            e.target.attrs.x = 800-w;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材右-画布右
        if( marginBottomB < margin){
            y = 450-h;
            e.target.attrs.y = 450-h;
            let dragpos = {x,y};
            this.props.dragElement(dragpos); 
            normal = false;
        }//素材下-画布下
        if( marginCenterXC < margin){
            x = 400-w/2;
            e.target.attrs.x = 400-w/2;
            let dragpos = {x,y};
            this.props.dragElement(dragpos); 
            normal = false;
        }//素材中-画布中
        if( marginCenterYC < margin){
            y = 225-h/2;
            e.target.attrs.y = 225-h/2;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材中-画布中
        if( marginLeftC < margin){
            x = 400;
            e.target.attrs.x = 400;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材左-画布中
        if( marginTopC < margin){
            y=225;
            e.target.attrs.y = 225;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材上-画布中
        if( marginRightC < margin){
            x=400-w;
            e.target.attrs.x = 400-w;
            let dragpos = {x,y};
            
            this.props.dragElement(dragpos); 
            normal = false;
        }//素材右-画布中
        if( marginBottomC < margin){
            y=225-h;
            e.target.attrs.y = 225-h;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材下-画布中
        if(normal){
        let dragpos = {x,y};
        this.props.dragElement(dragpos);
        normal = true;
        }
    }


    dragend(x,y) {
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
        let {x, y, scaleX, scaleY} = e.currentTarget.attrs;
        let r = e.currentTarget.rotation();
        this.props.dragElement({x, y});
        let w = scaleX * this.originWidth;
        let h = scaleY * this.originHeight;
        let transforminfo = {w,h,r};
        this.props.transformElement(transforminfo);
     }

    onTransformEnd(e) {
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        newEle.info().width = this.originWidth*e.target.scaleX(); 
        newEle.info().height = this.originHeight*e.target.scaleY(); 
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
    }

    render() {
        let { canvas } = this.state;
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
                    width={this.originWidth}
                    height={this.originHeight}
                    name={this.props.name}
                    crossOrigin='anonymous'
                    image={canvas}
                    opacity={this.props.element.info().opacity}
                />
            </Group>
        )
    }
}
