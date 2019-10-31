import React, { Component } from 'react';
import { Group } from 'react-konva';
import _ from 'lodash';
import ChartContainer from '@/charts/ChartContainer';
//import ReactDOM from 'react-dom';
//import {UIManager,findNodeHandle} from 'react-native';


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
        
        let normal = true;  //正常
        //主动吸附功能
        let w = this.props.currentElement.info().width;
        let h = this.props.currentElement.info().height;        
        let margin = 10;

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


         // 逻辑：在靠近辅助线的时候，位置直接更改，可以再次拖动, 直接改动系统级当前抓取的元素

         if( marginLeftL < margin){   
            x = 0;    
            e.target.attrs.x = 0;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            //素材左-画布左
            normal = false;
        }
        if( marginTopT < margin){
            y = 0;
            e.target.attrs.y = 0;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            //素材上-画布上
            normal = false;
        }
        if( marginRightR < margin){
            x = 800 -w;
            e.target.attrs.x = 800-w;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材右-画布右
        if( marginBottomB < margin){
            y = 450-h;
            e.target.attrs.y = 450-h;
            let dragpos = {x,y};
            this.props.dragElement(dragpos); 
            normal = false;
        }//素材下-画布下
        if( marginCenterXC < margin){
            x = 400-w/2;
            e.target.attrs.x = 400-w/2;
            let dragpos = {x,y};
            this.props.dragElement(dragpos); 
            normal = false;
        }//素材中-画布中
        if( marginCenterYC < margin){
            y = 225-h/2;
            e.target.attrs.y = 225-h/2;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材中-画布中
        if( marginLeftC < margin){
            x = 400;
            e.target.attrs.x = 400;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材左-画布中
        if( marginTopC < margin){
            y=225;
            e.target.attrs.y = 225;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材上-画布中
        if( marginRightC < margin){
            x=400-w;
            e.target.attrs.x = 400-w;
            let dragpos = {x,y};
            
            this.props.dragElement(dragpos); 
            normal = false;
        }//素材右-画布中
        if( marginBottomC < margin){
            y=225-h;
            e.target.attrs.y = 225-h;
            let dragpos = {x,y};
            this.props.dragElement(dragpos);
            normal = false;
        }//素材下-画布中
        if(normal){
        let dragpos = {x,y};
        this.props.dragElement(dragpos);
        normal = true;
        }
    }


    dragend(x,y) {
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
                width={this.props.element.info().width}
                height={this.props.element.info().height}
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
