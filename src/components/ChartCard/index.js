import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
//import ChartType from '@/constants/ChartType';
import {Element, ChartInfo} from '@/models/Element';
import {getDefaultSpec} from '@/charts/Info';
// import Scene from '@/models/Scene';
import _ from 'lodash';
import './chartcard.css';


//img size
let w = 400;
let h = 400;
//drag end pos
let x = 240;
let y = 100;

const chartSource = {

	beginDrag(props) {
        props.cleanInterationLayer(true);
        props.displayResourceTargetArea(true);
		return {
            category: props.chartcategory,
            type: props.charttype
        };
	},

	endDrag(props, monitor) {
        props.displayResourceTargetArea(false);
		const item = monitor.getItem();
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
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = _.cloneDeep(dropResult.currentScene);
                const newChart = new ChartInfo(
                    0,
                    item.category, // category
                    item.type, //type
                    getDefaultSpec(item.category, item.type), //spec
                    x,
                    y,
                    w,
                    h,
                    0,
                )
                const newElement = new Element(ElementType.CHART, newChart);
                newScene.addElement(newElement);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
                // props.displayTrackEditor();
            } 
            // else if (dropResult.target === "track") {
            //     //add new scene
            //     const newChart = new ChartInfo(
            //         '',
            //         item.type, //type
            //         '', //spec
            //         260,
            //         100,
            //         100,
            //         100,
            //         0,
            //     )
            //     const newElement = new Element(ElementType.CHART, newChart);
            //     const newScene = new Scene([newElement], 2);
            //     props.addScene(newScene);
            // }
		}
    },
}

class ChartCard extends Component {

    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
            <div className="chartcard" align="center">
                <img src={this.props.chartsrc} alt={this.props.charttype} />
                <p style={{ fontSize: '10px',marginTop:'5px'}}>{this.props.chartname}</p>
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_CHART,
    chartSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(ChartCard)
