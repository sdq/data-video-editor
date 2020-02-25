import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';

export default class VideoElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            isDragging: false,
            isPlaying: false
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
        if (typeof this.props.showAnimation === 'undefined') {
            return;
        }
        if (this.props.showAnimation) {
            //console.log("元素...", this.props.element.id(),this.props.scenes[this.props.sceneIndex].videos())
            const { scenePosition, element } = this.props;
            this.props.scenes[this.props.sceneIndex].videos().map(video => {
                //查找要播放的元素
                if ('video-' + this.props.element.id() === video.id) {
                    this.setState({
                        video: video
                    })
                    video.currentTime = 0;
                    //设置播放位置
                    if (scenePosition < (element.start() + element.duration()) && scenePosition > element.start()) {
                        let playpos = scenePosition - element.start();
                        //console.log("playpos...",playpos)
                        video.currentTime = playpos;
                    }
                    //console.log("播放...", video)
                    video.play();
                }
                return video;
            })
        } else {
            //EditableLayer中传来的tag，用来显示第一帧
            if (this.props.tag) {
                this.setState({
                    video: this.props.tag
                });
                let currentVideoList = this.props.scenes[this.props.sceneIndex] && this.props.scenes[this.props.sceneIndex].videos();
                //console.log("currentVideoList",currentVideoList)
                let isInList = false;
                if (currentVideoList.length !== 0) {
                    currentVideoList.map(video => {
                        if (video.id === "video-" + this.props.element.id()) {
                            isInList = true;
                        }
                        return video;
                    })
                }
               
                if (!isInList) {
                    //准备可以播放的资源,并且添加到播放列表中
                    this.loadVideo();
                }
            }
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
        if (!this.props.showAnimation && nextProps.tag && nextProps.tag !== this.state.video) {
            //console.log("componentWillReceiveProps 更新", nextProps.tag)
            this.setState({
                video: nextProps.tag
            });
            let currentVideoList = this.props.scenes[this.props.sceneIndex] && this.props.scenes[this.props.sceneIndex].videos();
            //console.log("currentVideoList",currentVideoList)
            let isInList = false;
            if (currentVideoList.length !== 0) {
                currentVideoList.map(video => {
                    if (video.id === "video-" + this.props.element.id()) {
                        isInList = true;
                    }
                    return video;
                })
            }
            if (!isInList) {
                //准备可以播放的资源,并且添加到播放列表中
                this.loadVideo();
            }
        }
    }
    componentWillUnmount() {
       // console.log("componentWillUnmount....",this.state.video)
        if (this.state.video && !this.state.video.paused) {
            this.state.video.pause();
            //console.log("pause....")
        }
    }

    loadVideo() {
        this.video = document.createElement('video');
        this.video.setAttribute("id", "video-" + this.props.element.id());
        this.video.src = this.props.element.info().src;
        this.video.addEventListener('loadedmetadata', this.handleLoad);
    }
    handleLoad = () => {
        //通过addVideo存放在场景里的，供视频录制获取播放video的id
        this.props.scenes[this.props.sceneIndex].addVideo(this.video);
    }

    // edit
    dragstart() {
        this.props.editStart();
    };

    dragmove(x, y, e) {
        this.props.dragMoving(x, y, e);
    }

    dragend(x, y) {
        let index = this.props.elementIndex;
        this.props.dragEnding(x, y, index);
    };

    onTransformStart(e) {
        this.props.editStart();
    };
    onTransform(e) {
        let originWidth = this.originWidth;
        let originHeight = this.originHeight;
        this.props.transforming(e, originWidth, originHeight);
    }

    onTransformEnd(e) {
        let index = this.props.elementIndex;
        let originWidth = this.originWidth;
        let originHeight = this.originHeight;
        this.props.transformEnding(e, index, originWidth, originHeight);
    }

    render() {
        let { video } = this.state;
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
                draggable={this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                scaleX={isPosTool?1:this.props.element.info().scaleX} //posTool控制了真实的宽高，需要将scaleX重置
                scaleY={isPosTool?1:this.props.element.info().scaleY} //posTool控制了真实的宽高，需要将scaleY重置
                width={this.props.element.info().width}
                height={this.props.element.info().height}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragMove={e => {
                    this.dragmove(e.target.x(), e.target.y(), e)
                }}
                onDragEnd={e => {
                    this.dragend(e.target.x(), e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={e => {
                    this.onTransform(e);
                }}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                <Image
                    ref={node => this.imageref = node}
                    name={this.props.name}
                    image={video}
                    width={isPosTool?this.props.element.info().width:(draggable?this.originWidth:this.props.element.info().width)}
                    height={isPosTool?this.props.element.info().height:(draggable?this.originHeight:this.props.element.info().height)}
                    crossOrigin='anonymous'
                    opacity={this.props.element.info().opacity}
                    visible={true}
                />
            </Group>
        )
    }
}
