import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, VideoInfo} from '@/models/Element';
// import Scene from '@/models/Scene';
import './videocard.css';

const videoSource = {

	beginDrag(props) {
        props.displayResourceTargetArea(true);
		return props.info;
	},

	endDrag(props, monitor) {
        props.displayResourceTargetArea(false);
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                const newVideo = new VideoInfo(item.name, item.src, 240, 100, 100, 100, 0);
                const newElement = new Element(ElementType.VIDEO, newVideo);
                newScene.addElement(newElement);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
            }
		}
    },
}

class VideoCard extends Component {
    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="videocard" align="center">
                video
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