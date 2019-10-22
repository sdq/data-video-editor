import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';
import _ from 'lodash';

let lastScale = '';  

export default class VideoElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            isDragging: false,
            isPlaying: false
        };
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }

    componentDidMount() {
        if (this.props.showAnimation) {
            this.loadVideo();
        }else{
            //EditableLayer中传来的tag，用来显示第一帧
            //console.log("tag.....",this.props.tag)
            if(this.props.tag){
                this.setState({
                    video: this.props.tag
                });
            }
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
        if (oldProps.element.info().src !== this.props.element.info().src) {
            this.loadVideo();
        }
    }

    componentWillUnmount() {
        if (this.state.isPlaying) {
            this.pause();
        }
    }

    loadVideo() {
        this.video = document.createElement('video');
        this.video.setAttribute("id", "video-"+this.props.element.id());
        // var rand = '?' + Math.random();
        this.video.src = this.props.element.info().src //+ rand;
        // console.log("src",this.video.src )
        // this.video.crossOrigin='anonymous';
        this.video.addEventListener('loadedmetadata', this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            video: this.video
        });
        if (this.props.showAnimation) {
            this.play();
        } else {
            this.pause();
        }
    }

    play = () => {
        const {video, isPlaying} = this.state;
        const {scenePosition, element} = this.props;
        if (video === null || isPlaying === true || scenePosition > (element.start() + element.duration())) {
            return;
        }
        if (scenePosition < (element.start() + element.duration()) && scenePosition > element.start()) {
            let playpos = scenePosition - element.start();
            //console.log("playpos...",playpos)
            this.video.currentTime = playpos;
        }
        this.setState({
            isPlaying: true
        })
        this._startTimeout = setTimeout(function () {
            this.video.play();
        }.bind(this), (element.start() - scenePosition) * 1000)
        this._stopTimeout = setTimeout(function () {
            this.pause()
        }.bind(this), (element.start() + element.duration() - scenePosition) * 1000)
    }
    pause = () => {
        let { video, isPlaying } = this.state;
        if (video !== null && isPlaying === true) {
            this.video.pause();
            this.setState({
                isPlaying: false
            })
        }
        clearTimeout(this._startTimeout);
        clearTimeout(this._stopTimeout);
    }

    // edit
    dragstart() {
        this.props.editStart();
    };
    dragmove(x, y) {
        //实时更改素材的真实X,Y，以便吸附
        this.props.currentElement.info().x = x;
        this.props.currentElement.info().y = y;
        //更改toolbar实时位置显示
        let dragpos = { x, y };
        this.props.dragElement(dragpos);
    }
    dragend(x, y) {

        //基础吸附功能
        let w = this.props.currentElement.info().width;
        let h = this.props.currentElement.info().height;        
        let margin = 10;

        let marginLeftL = Math.abs(x - 0); //素材左-画布左
        let marginTopT = Math.abs(y - 0);  //素材上-画布上
        let marginRightR = Math.abs(x + w - 800);  //素材右-画布右
        let marginBottomB = Math.abs(y + h - 450);  //素材下-画布下

        let marginCenterXC = Math.abs(x + w / 2 - 400);  //素材中-画布中
        let marginCenterYC = Math.abs(y + h / 2 - 225);  //素材中-画布中
        let marginLeftC = Math.abs(x - 400); //素材左-画布中
        let marginTopC = Math.abs(y - 225);  //素材上-画布中
        let marginRightC = Math.abs(x + w - 400);  //素材右-画布中
        let marginBottomC = Math.abs(y + h - 225);  //素材下-画布中

        if (marginLeftL < margin) { x = 0; }//素材左-画布左
        if (marginTopT < margin) { y = 0; }//素材上-画布上
        if (marginRightR < margin) { x = 800 - w; }//素材右-画布右
        if (marginBottomB < margin) { y = 450 - h; }//素材下-画布下

        if (marginCenterXC < margin) { x = 400 - w / 2; }//素材中-画布中
        if (marginCenterYC < margin) { y = 225 - h / 2; }//素材中-画布中
        if (marginLeftC < margin) { x = 400; }//素材左-画布中
        if (marginTopC < margin) { y = 225; }//素材上-画布中
        if (marginRightC < margin) { x = 400 - w; }//素材右-画布中
        if (marginBottomC < margin) { y = 225 - h; }//素材下-画布中
        //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };

    onTransformStart(e) {
        lastScale = e.currentTarget.scaleX();//initial scaleX
        this.props.editStart();
    };

    onTransform(e) {
        let currentWidth = this.props.currentElement.info().width;
        let currentHeight = this.props.currentElement.info().height;
        let w, h, r = '';
        //Determine whether scale is equal to last time(Rotation only)
        //So scale calculation is not performed at this time
        if (lastScale !== e.currentTarget.scaleX()) {
            w = currentWidth * e.currentTarget.scaleX();
            h = currentHeight * e.currentTarget.scaleY();
            //实时更改素材的真实w,h，以便显示正确边框和辅助线
            this.props.currentElement.info().width = w;
            this.props.currentElement.info().height = h;
        } else {
            w = currentWidth;
            h = currentHeight;
        }
        r = e.currentTarget.rotation();
        //实时更改素材的真实r，以便显示正确边框和辅助线
        this.props.currentElement.info().rotation = r;
        let transforminfo = { w, h, r };
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
        let { video } = this.state;
        //console.log("render",this.props.element.info().x,this.props.element.info().y)
        return (
            <Group name={this.props.name}
                draggable={this.props.draggable}
                width={this.props.element.info().width}
                height={this.props.element.info().height}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragMove={e => {
                    this.dragmove(e.target.x(), e.target.y())
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
                    x={this.props.element.info().x}
                    y={this.props.element.info().y}
                    width={this.props.element.info().width}
                    height={this.props.element.info().height}
                    opacity={this.props.element.info().opacity}
                    visible={true}
                />
                {/* <Rect
                    name={this.props.name}
                    x={this.props.element.info().x}
                    y={this.props.element.info().y}
                    width={this.props.element.info().width}
                    height={this.props.element.info().height}
                    fill={Color.VIDEO_BAR}
                    visible = {!showAnimation}
                /> */}
            </Group>
        )
    }
}
