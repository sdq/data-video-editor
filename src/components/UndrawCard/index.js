import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, ImageInfo} from '@/models/Element';
import canvg from 'canvg';
// import Scene from '@/models/Scene';
import './undrawcard.css';
// import draw from './vis';
import Undraw from 'react-undraw';


//img size
let w = 0;
let h = 0;
//drag end pos
let x = 240;
let y = 100;


const imageSource = {

	beginDrag(props,monitor) {
        // 拖拽开始，转换undraw为png
        // const visSource = draw(this.props);
        //const item = monitor.getItem();
        //console.log(item);
        //如何拽到undraw的src源头进行转换？
         //this.undrawImage = new window.Image();
         //this.undrawImage.src = this.getImageUrl(item);
        console.log("begin");
        props.displayResourceTargetArea(true);
		return props;
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
                //svg-png  无法获取undraw素材的源
                //this.undrawImage = new window.Image();
                //console.log(item);
                //this.undrawImage.src = this.getImageUrl(item);
                //
                const newImage = new ImageInfo(item.name,item.src, x, y, w, h, 0);
                //const newImage = new ImageInfo(this.undrawImage.name,this.undrawImage.src, x, y, w, h, 0);
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

class UndrawCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            undrawImage: null,
        };
    }



    componentDidMount() {
        //

    }

    componentWillUpdate() {
        //get img size after drag , 有一定时间延迟
        // let img = new Image();
        // img.src = this.props.info.src;
        // img.onload = async function(){
        //     w = img.width;
        //     h = img.height;
        // };
    }

    getImageUrl = (source) => {
        var canvas = document.createElement('canvas');
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        canvg(canvas, source);
        return canvas.toDataURL('image/png');
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="undrawcard" align="center">
                {/* <img src={this.props.info.src} 
                 alt={this.props.info.name} /> */}
              {/* <Undraw name={item} primaryColor={primaryColor} height={"120"}/> */}
              <Undraw name={this.props.name} 
              primaryColor={this.props.primaryColor} 
              height = {'80'}/>
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
)(UndrawCard)