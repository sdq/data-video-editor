import React, { Component } from 'react';
import { Group } from 'react-konva';
import _ from 'lodash';
import ChartContainer from '@/charts/ChartContainer';
//import ReactDOM from 'react-dom';
//import {UIManager,findNodeHandle} from 'react-native';


export default class ChartElement extends Component {
    constructor(props) {
        super(props);
        this.originWidth = props.element.info().width;
        this.originHeight = props.element.info().height;
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
        this.clickSize = this.clickSize.bind(this);
        this.saveRef = ref => {this.refDom = ref};
    }

    clickSize(e){   
        // //TODO:在点击时重新测算group大小，并赋给chartinfo

        // //ref dom 方法
        // console.log(ReactDOM.findDOMNode(this));
        // console.log(this.refDom);
        // const {clientWidth, clientHeight} = this.refDom;
        // console.log('====================================');
        // console.log(clientWidth, clientHeight, this.refDom);
        // console.log('====================================');

        //uimannager方法
        // UIManager.measure(findNodeHandle(this.myComponent),(x,y,width,height,pageX,pageY)=>{
        //     //todo
        //     console.log(width);  
        // })
        //console.log(this.);  

    }


    dragstart() {
        this.props.editStart();
    };


    dragmove(x,y,e){
        this.props.dragMoving(x,y,e);
    }


    dragend(x,y) {
        let index = this.props.elementIndex;
        this.props.dragEnding(x,y,index);
    };
    

    onTransformStart() {
        this.props.editStart();
    }

    onTransform(e) {
        let originWidth = this.originWidth;
        let originHeight = this.originHeight;
        this.props.transforming(e,originWidth,originHeight);
     }

    onTransformEnd(e) {
        let index = this.props.elementIndex;
        let originWidth = this.originWidth;
        let originHeight = this.originHeight;
        this.props.transformEnding(e,index,originWidth,originHeight);
    }

    chooseChart() {
        var data = {};
        const chartInfo = this.props.element.info();
        if (!_.isEmpty(this.props.dataList)) {
            data = this.props.dataList[chartInfo.dataIndex];
        }
        return  <ChartContainer  
                    category={chartInfo.category}
                    type={chartInfo.type}
                    name={this.props.name} 
                    data={data} 
                    spec={chartInfo.spec}
                    width={this.props.draggable?this.originWidth:this.props.element.info().width}
                    height={this.props.draggable?this.originHeight:this.props.element.info().height}
                    onCanvas={true} 
                    showAnimation={this.props.showAnimation} 
                    animations={this.props.element.animations()} 
                    current={this.props.scenePosition}
                    isVideoPerforming={this.props.isVideoPerforming}
                />
    }


    // //监听窗口大小变化的方法
    // handleResize = e => {
    //     console.log('浏览器窗口大小改变事件', e.target.innerWidth)
    //   }
    // componentDidMount() {
    //     window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    //   }
    //   componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
    //     window.removeEventListener('resize', this.handleResize.bind(this))
    //   }



    render() {
        return (
            <Group 
                ref={this.saveRef}
                //ref={(ref)=>this.myComponent=ref}
                name={this.props.name}
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                width={this.originWidth}
                height={this.originHeight}
                rotation={this.props.element.info().rotation}
                //click
                onClick= {e => {
                    this.clickSize(e)
                }}
                //draggable
                onDragStart={this.dragstart}  
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y(),e)
                }}
                onDragEnd={e => {
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransform={e => {
                    this.onTransform(e);
                }}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                {this.chooseChart()}
            </Group>
        )
    }
}
