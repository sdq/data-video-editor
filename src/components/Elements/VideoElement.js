import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';
import _ from 'lodash';

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
        if(typeof this.props.showAnimation === 'undefined'){
         return;
        }
        if (this.props.showAnimation) {
            //console.log("元素...", this.props.element.id())
            const { scenePosition, element } = this.props;
            this.props.scenes[this.props.sceneIndex].videos().map(video => {
                //查找要播放的元素
                if ('video-' + this.props.element.id() === video.id) {
                    this.setState({
                        video: video
                    })
                    video.currentTime=0;
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
                if(currentVideoList.length !== 0){
                    currentVideoList.map(video => {
                        if(video.id==="video-"+this.props.element.id()){
                            isInList=true;
                        }
                        return video;
                    })    
                }
                
                if(!isInList){
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

    componentWillUnmount() {
        if (this.state.video) {
            this.state.video.pause();
            //console.log("pause....")
        }
    }

    loadVideo() {
        this.video = document.createElement('video');
        this.video.setAttribute("id", "video-"+this.props.element.id());
        var rand = '?' + Math.random();
        this.video.src = this.props.element.info().src + rand;
        // console.log("src",this.video.src )
        this.video.crossOrigin='anonymous';
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

    onTransformStart(e) {
        this.props.editStart();
    };

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
        let { video } = this.state;
        return (
            <Group name={this.props.name}
                draggable={this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                width={this.props.element.info().width}
                height={this.props.element.info().height}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragMove={e => {
                    this.dragmove(e.target.x(), e.target.y(),e)
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
                    width={this.props.draggable?this.originWidth:this.props.element.info().width}
                    height={this.props.draggable?this.originHeight:this.props.element.info().height}
                    crossOrigin='anonymous'
                    opacity={this.props.element.info().opacity}
                    visible={true}
                />
            </Group>
        )
    }
}
