import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, ImageInfo} from '@/models/Element';
// import Scene from '@/models/Scene';
import _ from 'lodash';
import './imagecard.css';

//img size
let w = 100;
let h = 100;
//drag end pos
let x = 240;
let y = 100;


const imageSource = {

	beginDrag(props) {
        props.cleanInterationLayer(true);
        props.displayResourceTargetArea(true);
		return props.info;
	},

	endDrag(props, monitor) {
        props.displayResourceTargetArea(false);
		const item = monitor.getItem();
        const dropResult = monitor.getDropResult();


        ////获取鼠标结束拖拽的位置，基于canvas基点计算位置
        let e = window.event;       //Firefox下是没有event这个对象的！！
        let canvas=document.getElementsByTagName("canvas")[0];
        let pos = canvas.getBoundingClientRect();//获取canvas基于父页面的位差
        let scale = pos.height/450;
        if((Number(e.clientX)-Number(pos.left))>0){
            x = Number(e.clientX)-Number(pos.left)-w/2; //根据鼠标位置计算画布上元素位置,强制类型转换
            y = Number(e.clientY)-Number(pos.top)-h/2;
       }
       
		if (dropResult) {
            // console.log(item);
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = _.cloneDeep(dropResult.currentScene);
                const newImage = new ImageInfo(item.name,item.src, x/scale, y/scale, w, h, 0);
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
        if(h>300){
            //如果img尺寸太大，按比例拉伸到较小的比例
            w = 300*(w/h);
            h = 300;
        }
        };
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="imagecard" align="center" style={{zIndex:5}}>
                <img  src={this.props.info.src} alt={this.props.info.name} style={{ align:"center",verticalAlign: 'center' }}/>
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_IMAGE,
    imageSource,
    
	(connect, monitor,) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(ImageCard)