import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';
//import _ from 'lodash';

export default class GifElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
        };
        this.originWidth = props.element.info().width;
        this.originHeight = props.element.info().height;
        this.isToAnimate = false;
        this.gifElement = this.props.element;
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
            if (this.props.isVideoPerforming) {
                current = 0;
            }
            for (let index = 0; index < animations.length; index++) {
                const animation = animations[index];
                animationCreator.fromModel(animation).play(current);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.element.info().name !== this.gifElement.info().name) {
        //console.log("更新。。。",nextProps.element.info().name)
        //更新显示第一帧
        this.setState({
            canvas: nextProps.element.info().gifFrames[0] && nextProps.element.info().gifFrames[0].getImage()
        });
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
        let { canvas } = this.state;
        const isPosTool =this.props.element?this.props.element.info().isPosTool:null;
        let draggable = this.props.draggable;
         /*可以使得postool更改后，拖拽不再变形，但影响其他功能*/
        // let isDrag = this.props.isDrag;
        // if(isDrag===true||!isDrag){
        //     draggable = false;
        // }else{
        //     draggable = this.props.draggable
        // }
        return (
            <Group name={this.props.name} 
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                scaleX={isPosTool?1:this.props.element.info().scaleX} //posTool控制了真实的宽高，需要将scaleX重置
                scaleY={isPosTool?1:this.props.element.info().scaleY} //posTool控制了真实的宽高，需要将scaleY重置
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
                    width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                    height={isPosTool?this.props.element.info().height:(draggable?this.originHeight:this.props.element.info().height)}
                    name={this.props.name}
                    crossOrigin='anonymous'
                    image={canvas}
                    opacity={this.props.element.info().opacity}
                />
            </Group>
        )
    }
}
