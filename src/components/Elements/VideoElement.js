import React, { Component } from 'react';
import { Rect, Image, Group } from 'react-konva';
import Color from '@/constants/Color';
import _ from 'lodash';

export default class VideoElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
            isPlaying: false
        };
        this.dragstart = this.dragstart.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
    }

    componentDidMount() {
        this.loadVideo();
        // const animations = this.props.element.animations(); 
        // if (this.props.showAnimation && animations.length !== 0) {
        //     let animationCreator = new AnimationCreator(this.imageref);
        //     let current = this.props.scenePosition;
        //     for (let index = 0; index < animations.length; index++) {
        //         const animation = animations[index];
        //         animationCreator.fromModel(animation).play(current);
        //     }
        // }
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
        this.video.src = this.props.element.info().src;
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
        // TODO: set specific time in video to play
        // if (scenePosition < (element.start() + element.duration()) && scenePosition > element.start()) {
        //     this.video.currentTime = element.start() + element.duration() - scenePosition;
        // }
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
        let {video, isPlaying} = this.state;
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

    dragend(x,y) {
        var newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };

    onTransformStart() {
        this.props.editStart();
    }
   
    onTransformEnd(e) {
        // console.log("end transform");
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        newEle.info().width = e.target.width()*e.target.scaleX();
        newEle.info().height = e.target.height()*e.target.scaleY();
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
    }

    render() {
        let {video} = this.state;
        let {showAnimation} = this.props;
        return (
            <Group name={this.props.name} 
                draggable = {this.props.draggable}
                x={0}
                y={0}
                width={800}
                height={450}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragEnd={e => {
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                <Image 
                    ref={node=>this.imageref=node}
                    name={this.props.name}
                    image={video} 
                    x={0}
                    y={0}
                    width={800}
                    height={450}
                    opacity = {this.props.element.info().opacity}
                    visible = {showAnimation}
                />
                <Rect
                    x={0}
                    y={0}
                    width={800}
                    height={450}
                    fill={Color.VIDEO_BAR}
                    visible = {!showAnimation}
                />
            </Group>
        )
    }
}
