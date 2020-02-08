import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, ImageInfo} from '@/models/Element';
// import Scene from '@/models/Scene';
import './undrawcard.css';
import Undraw from 'react-undraw';
import canvg from 'canvg';
import _ from 'lodash';


//undraw default size

let w = 300;
let h = 300;
//drag end pos
let x = 0;
let y = 0;

let newimage;


const imageSource = {

    canDrag(props){
        let dragSVG = 0;//获取当前拖拽的svg在列表中的序号
        let alldiv = document.querySelectorAll("p[class='card-text mb-0 text-center']");
        for (let i = 0;i<alldiv.length;i++){
            if(alldiv[i].innerText.indexOf(props.name) !== -1){
                dragSVG = i;
                break;
            }
        }

        if(!alldiv){
            //console.log("no image");
            return false;
        }
       
       let  svghtml = document.querySelectorAll("svg[data-name='Layer 1']")[dragSVG].cloneNode(true); 
       svghtml.style.width = 480;
       svghtml.style.height = 274;
       //console.log("svghtml",svghtml)
       var defsNodes = svghtml.getElementsByTagName("defs")[0];
       if(defsNodes){
        svghtml.removeChild(defsNodes);
       }
        var canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 274;
        //转换成字符串
        svghtml = svghtml.outerHTML;
        canvg(canvas, svghtml, {
            renderCallback: function() {
              //console.log("canvas.toDataURL('image/png')",canvas.toDataURL('image/png'),svghtml)
              newimage = new window.Image();
              newimage.name = props.name;
              newimage.src = canvas.toDataURL('image/png');
              w = canvas.width;
              h = canvas.height;
            },
            });
    
          return true;
    },

	beginDrag(props,monitor) {
        props.cleanInterationLayer(true);
        props.displayResourceTargetArea(true);
        return props;
	},

	endDrag(props, monitor) {

        props.displayResourceTargetArea(false);
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
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = _.cloneDeep(dropResult.currentScene);
                //console.log("endDrag",w,h)
                const newImage = new ImageInfo(newimage.name,newimage.src, x/scale, y/scale, w, h, 0);
                const newElement = new Element(ElementType.IMAGE, newImage);
                newScene.addElement(newElement);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
                // props.displayTrackEditor();
            } 

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

    }

    componentWillUpdate() {
        //get img size after drag 
        // let img = new Image();
        // img.src = this.props.info.src;
        // img.onload = async function(){
        //     w = img.width;
        //     h = img.height;
        // };
    }


    

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="undrawcard" id = "undrawcard" align="center" style={{zIndex:5}}>
              <Undraw 
              name={this.props.name} 
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