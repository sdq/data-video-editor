import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, ImageInfo} from '@/models/Element';
// import Scene from '@/models/Scene';
import './imagecard.css';

//img size
let w = 0;
let h = 0;
//drag end pos
let x = 240;
let y = 100;


const imageSource = {

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
            // console.log(item);
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                const newImage = new ImageInfo(item.name,item.src, x, y, w, h, 0);
                const newElement = new Element(ElementType.IMAGE, newImage);
                newScene.addElement(newElement);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
                // props.displayTrackEditor();
            } 
            // else if (dropResult.target === "track") {
            //     //add new scene
            //     const newImage = new ImageInfo(item.src, 240, 100, 100, 100, 0);
            //     const newElement = new Element(ElementType.IMAGE, newImage);
            //     const newScene = new Scene([newElement], 2);
            //     props.addScene(newScene);
            // }
		}
    },
}

class ImageCard extends Component {

    componentWillUpdate() {
        //get img size after drag , 有一定时间延迟
        let img = new Image();
        img.src = this.props.info.src;
        img.onload = async function(){
            w = img.width;
            h = img.height;
        };
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="imagecard" align="center">
                <img src={this.props.info.src} alt={this.props.info.name} />
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_IMAGE,
    imageSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(ImageCard)