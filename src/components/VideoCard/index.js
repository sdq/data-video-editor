import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import { Element, VideoInfo } from '@/models/Element';
// import Scene from '@/models/Scene';
import './videocard.css';
import { Player, ControlBar } from 'video-react';

//img size
// let w = 0;
// let h = 0;
// //drag end pos
// let x = 240;
// let y = 100;

const videoSource = {

	beginDrag(props) {
        props.displayResourceTargetArea(true);
        return props.info;
    },

	endDrag(props, monitor) {
        props.displayResourceTargetArea(false);
		const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        //TODO:获取实时拖拽位置，写入x，y
		if (dropResult) {
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({}, dropResult.currentScene);
                let videoElement = props.info.videoElement;
                //console.log("videoElement.duration...",videoElement.duration)
                const newVideo = new VideoInfo(item.name, item.src, videoElement.duration, 240, 100, videoElement.clientWidth, videoElement.clientHeight, 0);
                const newElement = new Element(ElementType.VIDEO, newVideo);
                newScene.addElement(newElement);
                //add videoResource to audioList
                let videoResource = {};
                videoResource.id = newElement.id();
                //console.log("newElement.id",newElement.id())
                videoResource.element = props.info.videoElement
                newScene.addVideoTag(videoResource);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
            }
		}
    },
}

class VideoCard extends Component {

    componentWillUpdate() {
        //get img size after drag , 有一定时间延迟, 对video也按照img读取尺寸
        //TODO:需要验证是否可行
        // let img = new Image();
        // img.src = this.props.info.src;
        // img.onload = async function () {
        //     w = img.width;
        //     h = img.height;
        // };
    }

    constructor(props) {
        super(props);
        this.videoPlayer = {};
    }

    componentDidMount() {
        //console.log("videoPlayer",this.videoPlayer);
        this.props.info.videoTag = this.videoPlayer && this.videoPlayer.video;
        this.props.info.videoElement = this.videoPlayer && this.videoPlayer.video && this.videoPlayer.video.video;
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="videocard" align="center">
                <p>{this.props.info.name}</p>
                <Player ref={(player) => { this.videoPlayer = player }}>
                    <source src={this.props.info.src} />
                    <ControlBar disableCompletely={true}></ControlBar>
                </Player>
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_VIDEO,
    videoSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(VideoCard)