import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import { Element, VideoInfo } from '@/models/Element';
import WebApi from '@/axios/api';
// import Scene from '@/models/Scene';
import './videocard.css';
import { Player, ControlBar } from 'video-react';
import _ from 'lodash';


//drag end pos
let x = 240;
let y = 100;

const videoSource = {

	beginDrag(props) {
        props.cleanInterationLayer(true);
        props.displayResourceTargetArea(true);
        //console.log("beginDrag",props.info)
          //本地内存中的url,解决视频渲染MediaElementVideoSource outputs zeroes due to CORS access restrictions问题
          WebApi.GetGIFAsset(props.info.id).then((fileURL) => {
            //console.log("newSrc",fileURL)
            props.info.src = fileURL;
        })
        return props.info;
    },

	endDrag(props, monitor) {
        props.displayResourceTargetArea(false);
		const item = monitor.getItem();
        const dropResult = monitor.getDropResult();


		if (dropResult) {
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = _.cloneDeep( dropResult.currentScene);
                let videoElement = props.info.videoElement;
                if(!videoElement) return;
                //console.log("videoElement.duration...",videoElement.duration)
                 ////获取鼠标结束拖拽的位置，基于canvas基点计算位置
                 let e = window.event;       //Firefox下是没有event这个对象的！！
                 let canvas=document.getElementsByTagName("canvas")[0];
                 let pos = canvas.getBoundingClientRect();//获取canvas基于父页面的位差
                 let scale = pos.height/450;
                 if((Number(e.clientX)-Number(pos.left))>0){
                 x = Number(e.clientX)-Number(pos.left)-videoElement.clientWidth/2; //根据鼠标位置计算画布上元素位置,强制类型转换
                 y = Number(e.clientY)-Number(pos.top)-videoElement.clientHeight/2;
                 }
                const newVideo = new VideoInfo(item.id, item.name, item.src, videoElement.duration, x/scale, y/scale, videoElement.clientWidth, videoElement.clientHeight, 0);
                const newElement = new Element(ElementType.VIDEO, newVideo);
                //解析视频时长
                newElement.duration(videoElement.duration)
                newScene.addElement(newElement);
                //add videoResource to videoList
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


    constructor(props) {
        super(props);
        this.videoPlayer = {};
    }

    componentDidMount() {
        //console.log("videoPlayer",this.videoPlayer);
        this.props.info.videoElement = this.videoPlayer && this.videoPlayer.video && this.videoPlayer.video.video;
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="videocard" align="center">
                <p style={{
                    textOverflow:"ellipsis",
                    width:"80%",
                    overflow:'hidden'
                }}>{this.props.info.name}</p>
                <Player ref={(player) => { this.videoPlayer = player }}
                preload={'auto'}>
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