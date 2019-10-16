import React, { Component } from 'react';
import { Group } from 'react-konva';
import _ from 'lodash';
import ChartContainer from '@/charts/ChartContainer';

let lastScale = '';

export default class ChartElement extends Component {
    constructor(props) {
        super(props);
        this.dragstart = this.dragstart.bind(this);
        this.dragmove = this.dragmove.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
        this.onTransform = this.onTransform.bind(this);
    }

    dragstart() {
        this.props.editStart();
    };


    dragmove(x, y) {
        //实时更改素材的真实X,Y，以便吸附
        this.props.currentElement.info().x = x;
        this.props.currentElement.info().y = y;
        //更改toolbar实时位置显示
        let dragpos = { x, y };
        this.props.dragElement(dragpos);
    }
    dragend(x,y) {
        //基础吸附功能
        let w = this.props.currentElement.info().width;
        let h = this.props.currentElement.info().height;        
        let margin = 40;

        let marginLeftL = Math.abs(x - 0); //素材左-画布左
        let marginTopT = Math.abs(y - 0);  //素材上-画布上
        let marginRightR = Math.abs(x+w - 800);  //素材右-画布右
        let marginBottomB = Math.abs(y+h - 450);  //素材下-画布下

        let marginCenterXC = Math.abs(x+w/2 - 400);  //素材中-画布中
        let marginCenterYC = Math.abs(y+h/2 - 225);  //素材中-画布中
        let marginLeftC = Math.abs(x - 400); //素材左-画布中
        let marginTopC = Math.abs(y - 225);  //素材上-画布中
        let marginRightC = Math.abs(x+w - 400);  //素材右-画布中
        let marginBottomC = Math.abs(y+h - 225);  //素材下-画布中

        if( marginLeftL < margin){x=0;}//素材左-画布左
        if( marginTopT < margin){y=0;}//素材上-画布上
        if( marginRightR < margin){x=800-w;}//素材右-画布右
        if( marginBottomB < margin){y=450-h;}//素材下-画布下

        if( marginCenterXC < margin){x=400-w/2;}//素材中-画布中
        if( marginCenterYC < margin){y=225-h/2;}//素材中-画布中
        if( marginLeftC < margin){x=400;}//素材左-画布中
        if( marginTopC < margin){y=225;}//素材上-画布中
        if( marginRightC < margin){x=400-w;}//素材右-画布中
        if( marginBottomC < margin){y=225-h;}//素材下-画布中

        //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
    };

    onTransformStart() {
        this.props.editStart();
    }

    
    onTransform(e) {
        let currentWidth = this.props.currentElement.info().width;
        let currentHeight = this.props.currentElement.info().height;
        let w,h,r = '';
        //Determine whether scale is equal to last time(Rotation only)
        //So scale calculation is not performed at this time
        if(lastScale!==e.currentTarget.scaleX()){
             w = currentWidth*e.currentTarget.scaleX();
             h = currentHeight*e.currentTarget.scaleY();
             //实时更改素材的真实w,h，以便显示正确边框和辅助线
             this.props.currentElement.info().width = w;
             this.props.currentElement.info().height = h;
        }else{
             w = currentWidth;
             h = currentHeight;
        }
             r = e.currentTarget.rotation();
        //实时更改素材的真实r，以便显示正确边框和辅助线
        this.props.currentElement.info().rotation = r;
        let transforminfo = {w,h,r};
        this.props.transformElement(transforminfo);
     }
   
    onTransformEnd(e) {
        // console.log("end transform");
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        newEle.info().width = e.target.width()*e.target.scaleX();
        newEle.info().height = e.target.height()*e.target.scaleY();
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
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
                    width={chartInfo.width} 
                    height={chartInfo.height} 
                    onCanvas={true} 
                    showAnimation={this.props.showAnimation} 
                    animations={this.props.element.animations()} 
                    current={this.props.scenePosition}
                />
    }

    render() {
        return (
            <Group name={this.props.name}
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                width={this.props.element.info().width}
                height={this.props.element.info().height}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}  
                onDragMove= {e => {
                    this.dragmove(e.target.x(),e.target.y())
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
