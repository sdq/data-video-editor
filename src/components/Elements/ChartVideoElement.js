import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';

export default class ChartVideoElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: null,
        };
    }

    componentDidMount() {
        //创建video元素
        this.loadVideo();
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
        //console.log("handleLoad", this.video)
        this.setState({
            video: this.video
        })
        this.video.play();

    }



    render() {
        let { video } = this.state;
        const isPosTool = this.props.element ? this.props.element.info().isPosTool : null;
        return (
            <Group name={this.props.name}
                draggable={this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                width={this.props.element.info().width}
                height={this.props.element.info().height}
                rotation={this.props.element.info().rotation}
                visible={this.props.visible}
            >
                <Image
                    ref={node => this.imageref = node}
                    name={this.props.name}
                    image={video}
                    width={isPosTool ? this.props.element.info().width : (this.props.draggable ? this.originWidth : this.props.element.info().width)}
                    height={isPosTool ? this.props.element.info().height : (this.props.draggable ? this.originHeight : this.props.element.info().height)}
                    crossOrigin='anonymous'
                    opacity={this.props.element.info().opacity}
                    visible={true}
                />
            </Group>
        )
    }
}
