import React, { Component } from 'react';
import { Rect,Layer,Line,Circle } from 'react-konva';
import Color from '@/constants/Color';

let pathArray = [];
let [x1,y1,x2,y2] = ["","","",""];

let w = 0;
let h = 0;

//以konva为基础的pathlayer
export default class  PathLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
         //初次编辑初始化
         x2:"",
         y2:"",
        };

    }


    componentWillMount(){ 
        //初始化x1 y1 w h 
        if(this.props.currentElement && this.props.currentElement.info()){

            if (this.props.transformInfo){
                w = this.props.transformInfo.w;
                h = this.props.transformInfo.h;
            }else{
                w = this.props.currentElement.info().width;
                h = this.props.currentElement.info().height;
            }
            if (this.props.dragPos){
                x1 = this.props.dragPos.x;
                y1 = this.props.dragPos.y;
            }else{
                x1 = this.props.currentElement.info().x;
                y1 = this.props.currentElement.info().y;
            }
        }
        this.getPathInfo();
    }


    getPathInfo(){

    //二次编辑初始化x2 y2 
    const aniLength = this.props.currentElement?this.props.currentElement.animations().length:0;
    const aniArray = this.props.currentElement?this.props.currentElement.animations():0;

    for(let i=0;i<aniLength;i++){
      if(aniArray[i].type().indexOf("INTERPRETATION_PATH")!==-1&&this.props.currentElement.animations()[i].pathinfo()!==""){
         const pathinfoX2 = this.props.currentElement.animations()[i].pathinfo()[2];
         const pathinfoY2 = this.props.currentElement.animations()[i].pathinfo()[3];
         x2 = pathinfoX2;
         y2 = pathinfoY2;
         break;
     }
     }        

    //初次初始化x2 y2
    if(x2===""&&this.state.x2===""){
        x2 = (x1+100)>750?750:x1+100;//防止溢出
        y2 = (y1+100)>400?400:y1+100;//防止溢出
    }
    }

    componentWillUpdate(){
        //数据传出
        const aniLength = this.props.currentElement?this.props.currentElement.animations().length:0;
        const aniArray = this.props.currentElement?this.props.currentElement.animations():0;
        for(let i=0;i<aniLength;i++){
            if(aniArray[i].type().indexOf("INTERPRETATION_PATH")!==-1){
                this.props.currentElement.animations()[i].pathinfo(pathArray);
            }
        }
     
    }

    componentWillUnmount(){
        x2 = "";
        y2 = "";
        this.setState({
            x2: "",
            y2: "",
        });
    }

    componentWillReceiveProps(){
        console.log("ReceiveProps")
        //切换element，state状态清空
        this.setState({
            x2: "",
            y2: "",
        });

    }


    render() {
        //动态更新
        console.log(this.props.currentElement)
        if(this.props.currentElement && this.props.currentElement.info()){

            if (this.props.transformInfo){
                w = this.props.transformInfo.w;
                h = this.props.transformInfo.h;
            }else{
                w = this.props.currentElement.info().width;
                h = this.props.currentElement.info().height;
            }
            if (this.props.dragPos){
                x1 = this.props.dragPos.x;
                y1 = this.props.dragPos.y;
            }else{
                x1 = this.props.currentElement.info().x;
                y1 = this.props.currentElement.info().y;
            }
        }
        const canvasW = 800*(this.props.contentHeight-100)/450;
        const canvasH = this.props.contentHeight-100;
        if(this.state.x2){
            //be dragged, set x2 y2 to undefined
            x2="";
            y2="";
            //pathArray动态赋值,锚点基础上得到左上角坐标位
            pathArray = [x1,y1,this.state.x2,this.state.y2];
        }else{
            //init path 
            this.getPathInfo();//切换元素时重新获取初始值
            pathArray = [x1,y1,x2,y2];
        } 
        return (
                 <Layer
                 ref={node => (this.pathLayer = node)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                 style={{width:canvasW+"px",height:canvasH+"px"}}
                 >
                <Rect  
                id={"path-R"}
                x={x1+w/2-7}
                y={y1+h/2-7}
                // draggable
                ref={node=>this.pathref=node}
                fill={Color.ORANGE}
                width={14}
                height={14}

          />
                {/* <Star
                id={"path-S"}
                x={x2?x2+w/2+2:this.state.x2+w/2+2} //初始数值
                y={y2?y2+h/2+2:this.state.y2+h/2+2}
                draggable
                ref={node=>this.pathref=node}
                fill={Color.ORANGE}
                //根据方向旋转箭头
                numPoints={3}
                innerRadius={3}
                outerRadius={5}
                rotation = {x2?10:(180/Math.PI)*Math.atan(Math.abs(this.state.y2-y1)/Math.abs(this.state.x2-x1))-30}
                onDragMove={e => {
                    this.setState({
                        x2: e.target.x()-w/2,
                        y2: e.target.y()-h/2,
                    });
                }}
          /> */}

              <Circle
              id={"path-S"}
              x={x2?x2+w/2:this.state.x2+w/2} //初始数值
              y={y2?y2+h/2:this.state.y2+h/2}
              draggable
              ref={node=>this.pathref=node}
              fill={Color.ORANGE}
              radius={5}
              onDragMove={e => {
                  this.setState({
                      x2: e.target.x()-w/2,
                      y2: e.target.y()-h/2,
                  });
              }}
                
          />

            <Line
                id={"path-L"}
                ref={node=>this.pathref=node}
                points={[x1+w/2, y1+h/2, x2!==""?x2+w/2:this.state.x2+w/2, y2!==""?y2+h/2:this.state.y2+h/2]}
                dash = {[10, 3]}
                dashEnabled={true}
                stroke={Color.ORANGE}
        />                                             
        </Layer>
        )
        
    }
}
