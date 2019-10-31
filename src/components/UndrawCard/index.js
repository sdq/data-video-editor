import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, ImageInfo} from '@/models/Element';
// import Scene from '@/models/Scene';
import './undrawcard.css';
import Undraw from 'react-undraw';
import html2canvas from 'html2canvas';



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
            console.log("no image");
            return false;
        }


        //TODO: 如何避免拖拽非素材而报错
        //TODO: 拖拽时的缩略图怎么不在了?是异步生成png的问题
        //转换svghtml为png 
        let  svghtml = document.querySelectorAll("svg[data-name='Layer 1']")[dragSVG]; 
        html2canvas( svghtml , {
        allowTaint: false,   //允许污染
        taintTest: true,    //在渲染前测试图片(没整明白有啥用)
        useCORS: true,      //使用跨域(当allowTaint为true时，无需设置跨域)
        backgroundColor:'transparent',
        scale:3.0,
        //width:130,
        //height:80,
        windowWidth:svghtml.viewBox.animVal.width,//svg的内置宽高
        windowHeight:svghtml.viewBox.animVal.width,
        }).then(function(canvas) {
        //回调
        newimage=new window.Image();
        newimage.name = props.name;
    
        //TODO:获取拖拽的svg真实大小，按比例转成合理的尺寸赋值给w，h，但好像无论多大都是按1:1比例呈现图像，
        newimage.width = w;
        newimage.height = h;
        newimage.src =  canvas.toDataURL('image/png',1);
    })

          return true;
    },

	beginDrag(props) {
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
        if((Number(e.clientX)-Number(pos.left))>0){
        x = Number(e.clientX)-Number(pos.left)-w/2; //根据鼠标位置计算画布上元素位置,强制类型转换
        y = Number(e.clientY)-Number(pos.top)-h/2;
       }


		if (dropResult) {
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                const newImage = new ImageInfo(newimage.name,newimage.src, x, y, w, h, 0);
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
            <div className="undrawcard" id = "undrawcard" align="center">
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