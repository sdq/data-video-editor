import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import { Element, GifInfo } from '@/models/Element';
// import Scene from '@/models/Scene';
import { message } from 'antd';
import _ from 'lodash';
import './gifcard.css';
var gifFrames = require('gif-frames');

//gif size
let w = 100;
let h = 100;
//drag end pos
let x = 240;
let y = 100;
let gifDataFrames;

const imageSource = {
    canDrag(props) {
        //console.log("canDrag", props.info.src)
        let gifUrl = props.info.src;
        if(!gifUrl) {
            message.info("please try again!")
            return
        }
        //gif-frame 解析
        (async () => {
            await gifFrames(
                { url: gifUrl, frames: 'all', outputType: 'canvas', cumulative: true },
                function (err, frameData) {
                    if (err) {
                        throw err;
                    }
                    gifDataFrames = frameData;
                    //console.log("gifDataFrames", frameData)
                }
            );
        })();
        return true;
    },

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
        let canvas = document.getElementsByTagName("canvas")[0];
        let pos = canvas.getBoundingClientRect();//获取canvas基于父页面的位差
        let scale = pos.height / 450;
        if ((Number(e.clientX) - Number(pos.left)) > 0) {
            x = Number(e.clientX) - Number(pos.left) - w; //为什么gif不能减去二分之一宽高度？
            y = Number(e.clientY) - Number(pos.top);
        }

        if (dropResult) {
            // console.log(item);
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = _.cloneDeep(dropResult.currentScene);

                //console.log("gifData", item.gifData);
                let delay = 1;
                //console.log("gifDataFrames",gifDataFrames)
                if (!gifDataFrames) return;
                //console.log("endDrag",w,h)
                //console.log("item.id",item.id)
                const newImage = new GifInfo(item.id, item.name, item.src, delay, gifDataFrames, x / scale, y / scale, w, h, 0);
                const newElement = new Element(ElementType.GIF, newImage);
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


class GifCard extends Component {

    componentWillUpdate() {
        //get img size after drag , 有一定时间延迟, 对gif也按照img读取尺寸
        let img = new Image();
        img.src = this.props.info.src;
        img.onload = async function () {
            w = img.width;
            h = img.height;
            if (h > 100) {
                //gif尺寸太大，按比例拉伸到较小的比例
                w = 100 * (w / h);
                h = 100;
            }
        };
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="gifcard" align="center">
                <img src={this.props.info.src} alt={this.props.info.name} />
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_GIF,
    imageSource,
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }),
)(GifCard)