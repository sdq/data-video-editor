import React, { Component } from 'react';
import { Layer } from 'react-konva';
import TransformerComponent from '@/components/Elements/TransformerComponent';
import ImageElement from '@/components/Elements/ImageElement';
import GifElement from '@/components/Elements/GifElement'
import TextElement from '@/components/Elements/TextElement';
import ShapeElement from '@/components/Elements/ShapeElement';
import ChartElement from '@/components/Elements/ChartElement';
import VideoElement from '@/components/Elements/VideoElement';
import ElementType from '@/constants/ElementType';
import _ from 'lodash';


//let lastScale = '';
let xPosArray= [];
let yPosArray = [];


export default class EditableLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAssistLines: false,
            canvasPosition: {
                left: 0,
                top: 0
            },
            isDrag : false,
        };
        this.elementNodes = new Array(props.currentElements.length).fill({});
        this.editStart = this.editStart.bind(this);
        this.editElement = this.editElement.bind(this);
        this.dragMoving = this.dragMoving.bind(this);
        this.dragEnding = this.dragEnding.bind(this);
        this.transforming = this.transforming.bind(this);    
        this.transformEnding = this.transformEnding.bind(this);
    }

    componentDidMount() {
        this.editableLayer.canvas._canvas.id = 'editable-layer';
    }

    editStart() {


        this.props.displayAssistLines(true);
        //动态辅助线    
        //拖拽开始，生成当前画布素材坐标数组
        xPosArray= [];
        yPosArray = [];
        let arraylength = this.props.currentElements.length;
        for(let i = 0;i<arraylength;i++){
            if(this.props.currentElements[i].id === this.props.currentElement.id){continue;}
            xPosArray.push(this.props.currentElements[i].info().x,this.props.currentElements[i].info().x+this.props.currentElements[i].info().width);
            yPosArray.push(this.props.currentElements[i].info().y,this.props.currentElements[i].info().y+this.props.currentElements[i].info().height);
        }      
    }

    editElement(eleIndex, element) {
        this.props.displayAssistLines(false);
        const newScene = _.cloneDeep(this.props.currentScene);
        const newElement = _.cloneDeep(element);
        newScene.updateElement(element, eleIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + eleIndex;
        this.props.updateElement(newElement, eleIndex, elementName);
    }

    isElementDisplay(element) {
        let isElementDisplay = false;
        if (this.props.scenePosition >= element.start() && this.props.scenePosition <= element.start()+element.duration()) {
            element.fragments().forEach(fragment => {
                if (this.props.scenePosition >= fragment.start() && this.props.scenePosition <= fragment.end()) {
                    isElementDisplay = true;
                }
            });
        }
        return isElementDisplay;
    }

    dragMoving(x,y,e) {
        this.setState({isDrag : true});
        

        const canvasH = this.props.contentHeight-100;
        let w = this.props.currentElement.info().width;
        let h = this.props.currentElement.info().height;        
        let margin = 5;//判定辅助线吸附的margin（略小于显示margin）

        //基础辅助线
        let marginLeftL = Math.abs(x - 0); //素材左-画布左
        let marginTopT = Math.abs(y - 0);  //素材上-画布上
        let marginRightR = Math.abs(x+w - 800);  //素材右-画布右
        let marginBottomB = Math.abs(y+h - 450);  //素材下-画布下

        let marginCenterXC = Math.abs(x+w/2 - 800/2);  //素材中-画布中
        let marginCenterYC = Math.abs(y+h/2 - 450/2);  //素材中-画布中
        let marginLeftC = Math.abs(x - 800/2); //素材左-画布中
        let marginTopC = Math.abs(y - 450/2);  //素材上-画布中
        let marginRightC = Math.abs(x+w - 800/2);  //素材右-画布中
        let marginBottomC = Math.abs(y+h - 450/2);  //素材下-画布中

        // 逻辑：在靠近辅助线的时候，直接改动系统级当前抓取的元素，实现主动吸附

        if( marginLeftL < margin){x = e.target.attrs.x = 0;}//素材左-画布左
        if( marginTopT < margin){y = e.target.attrs.y = 0;}//素材上-画布上
        if( marginRightR < margin){x = e.target.attrs.x = 800-w;}//素材右-画布右
        if( marginBottomB < margin){y = e.target.attrs.y = 450-h;}//素材下-画布下
        if( marginCenterXC < margin){x = e.target.attrs.x = 800/2-w/2;}//素材中-画布中
        if( marginCenterYC < margin){y = e.target.attrs.y = 450/2-h/2;}//素材中-画布中
        if( marginLeftC < margin){x = e.target.attrs.x = 800/2;}//素材左-画布中
        if( marginTopC < margin){y = e.target.attrs.y = 450/2;}//素材上-画布中
        if( marginRightC < margin){x = e.target.attrs.x = 800/2-w;}//素材右-画布中
        if( marginBottomC < margin){y = e.target.attrs.y = 450/2-h;}//素材下-画布中

        //动态辅助线    
        //拖拽时生成附近xy点数组，遍历匹配去重得到结果,对结果做缩放变换
        let x1 = x+w;
        let y1 = y+h;
        let dynamicArray = [];
        for(let i =0,xArray = [],yArray = [];i<xPosArray.length;i++){
        if( Math.abs(x - xPosArray[i]) < margin){
            x = e.target.attrs.x = xPosArray[i];
            xArray.push([x,-1]);
            if (xArray.indexOf(x) === -1) {dynamicArray.push([x*(canvasH/450),-1]);}
            continue;
        }    
        if( Math.abs(x1 - xPosArray[i]) < margin){
            x = e.target.attrs.x = xPosArray[i]-w;
            xArray.push([x+w,-1]);
            if (xArray.indexOf(x+w) === -1) {dynamicArray.push([(x+w)*(canvasH/450),-1]);}
            continue;
        }      
        if( Math.abs(y - yPosArray[i]) < margin){
            y = e.target.attrs.y = yPosArray[i];
            yArray.push([-1,y]);
            if (yArray.indexOf(y) === -1) {dynamicArray.push([-1,y*(canvasH/450)]);}
            continue;
        }
        if( Math.abs(y1 - yPosArray[i]) < margin){
            y = e.target.attrs.y = yPosArray[i]-h;
            yArray.push([-1,y+h]);
            if (yArray.indexOf(y+h) === -1) {dynamicArray.push([-1,(y+h)*(canvasH/450)]);}
            continue;
        }
        
    }
        this.props.setDynamicAssistLines(dynamicArray); //for  循环结束后统一设置辅助线，保证画布元素和transformer及时一致
        let dragpos = {x,y};
        this.props.dragElement(dragpos);
    }

    dragEnding(x,y,index) {
        this.props.currentElement.info().isPosTool = false;

         //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
        const newEle = _.cloneDeep(this.props.currentElement);
        newEle.info().x = x;
        newEle.info().y = y;
        //this.props.edit(newEle); // 去掉edit功能
        this.editElement(index, newEle);
    }

    transforming(e,originWidth,originHeight) {
        this.setState({isDrag:false});
        //different element
        //let currentWidth = this.props.currentElement.info().width;
        //let currentHeight = this.props.currentElement.info().height;
        let w,h,r = '';
        let transforminfo = '';
       switch (this.props.currentElement.type()) {
            case ElementType.TEXT:

                    //Determine whether scale is equal to last time(Rotation only)
                    //So scale calculation is not performed at this time
                    // if(lastScale!==e.currentTarget.scaleX()){
                    //      w = currentWidth*e.currentTarget.scaleX();
                    //      //h = currentHeight*e.currentTarget.scaleY();
                    //      //计算新的文字高度
                    //      h = Math.ceil((this.props.currentElement.info().text.length * this.props.currentElement.info().textSize)/w)*this.props.currentElement.info().textSize;
                    //      //实时更改素材的真实w,h，以便显示正确边框和辅助线
                    //      this.props.currentElement.info().width = w;
                    //      this.props.currentElement.info().height = h;
                         
                    // }else{
                    //      w = currentWidth;
                    //      h = currentHeight;
                    // }
                         w = e.currentTarget.attrs.width;
                         h = e.currentTarget.attrs.height;    
                         r = e.currentTarget.rotation();
                    //实时更改素材的真实r，以便显示正确边框和辅助线
                    this.props.currentElement.info().rotation = r;
                    transforminfo = {w,h,r};
                    this.props.transformElement(transforminfo);
                return ;
                /*
            case ElementType.CHART:
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
                    transforminfo = {w,h,r};
                    this.props.transformElement(transforminfo);
                return ;
                */
            default: //gif video image
                    let {x, y, scaleX, scaleY} = e.currentTarget.attrs;
                    r = e.currentTarget.rotation();
                    this.props.dragElement({x, y});
                    w = scaleX * originWidth;
                    h = scaleY * originHeight;
                    transforminfo = {w,h,r};
                    this.props.transformElement(transforminfo);
                return;
        }   

        
    }

    transformEnding(e,index,originWidth,originHeight) {
         //different element
         const newEle = _.cloneDeep(this.props.currentElement);
         newEle.info().x = e.target.x();
         newEle.info().y = e.target.y();
         switch (this.props.currentElement.type()) {
              case ElementType.TEXT:
                    // if(lastScale!==e.target.scaleX()){
                    //     newEle.info().width = newEle.info().width*e.target.scaleX(); 
                    //     //newEle.info().height = newEle.info().height*e.target.scaleY(); 
                    //     //拉伸后的高度计算要包含中英文的宽度
                    //     newEle.info().height = Math.ceil((this.props.currentElement.info().text.length * this.props.currentElement.info().textSize)/this.props.currentElement.info().width)*this.props.currentElement.info().textSize
                    // }
                    newEle.info().width = e.currentTarget.attrs.width;
                    newEle.info().rotation = e.target.rotation();
                    this.editElement(index, newEle);
                  return ;
              default: //gif video image chart
                     newEle.info().width = originWidth*e.target.scaleX(); 
                     newEle.info().height = originHeight*e.target.scaleY(); 
                     newEle.info().rotation = e.target.rotation();
                     this.editElement(index, newEle);
                  return;
          }   
    }


    render() {
        const { isPerforming } = this.props;
        const editable = !isPerforming;
        
        return (
            <Layer 
                ref={node => (this.editableLayer = node)}
            >
                {this.props.currentScene.elements().map(function(element, index) {
                    if (index === this.props.dbClickedElementIndex) {
                        if (element.type() !== ElementType.IMAGE && element.type() !== ElementType.CHART) {
                            return null; // dbclick element for preview
                        } 
                    } 
                    switch (element.type()) {
                        case ElementType.TEXT:
                            if (this.isElementDisplay(element)) {
                                return <TextElement
                                    key={this.props.sceneIndex+"-"+index} 
                                    // edit={ele => this.editElement(index, ele)} 
                                    editStart={this.editStart} 
                                    dragMoving={this.dragMoving} 
                                    dragEnding={this.dragEnding} 
                                    transforming={this.transforming} 
                                    transformEnding={this.transformEnding} 
                                    element={element} 
                                    name={this.props.sceneIndex+"-"+index} 
                                    draggable={editable} 
                                    visible={true}
                                    showAnimation={false}
                                    {...this.props}
                                />
                            } else {
                                return null;
                            }
                            
                        case ElementType.IMAGE:
                            if (this.isElementDisplay(element)) {
                                return <ImageElement 
                                    ref={node => (this.elementNodes[index] = node)}
                                    key={this.props.sceneIndex+"-"+index} 
                                    // edit={ele => this.editElement(index, ele)} 
                                    editStart={this.editStart} 
                                    dragMoving={this.dragMoving} 
                                    dragEnding={this.dragEnding} 
                                    transforming={this.transforming} 
                                    transformEnding={this.transformEnding} 
                                    element={element} 
                                    name={this.props.sceneIndex+"-"+index} 
                                    draggable={editable} 
                                    isDrag={this.state.isDrag}
                                    visible={true}
                                    showAnimation={false}
                                    {...this.props}
                                />
                            } else {
                                return null;
                            }
                            
                        case ElementType.GIF:
                            if (this.isElementDisplay(element)) {
                                return <GifElement
                                    ref={node => (this.elementNodes[index] = node)}
                                    key={this.props.sceneIndex + "-" + index}
                                    // edit={ele => this.editElement(index, ele)}
                                    editStart={this.editStart}
                                    dragMoving={this.dragMoving} 
                                    dragEnding={this.dragEnding} 
                                    transforming={this.transforming} 
                                    transformEnding={this.transformEnding} 
                                    element={element}
                                    name={this.props.sceneIndex + "-" + index}
                                    draggable={editable}
                                    isDrag={this.state.isDrag}
                                    visible={true}
                                    showAnimation={false}
                                    isAnimateGifBydbClicked={element.isAnimateGif}
                                    {...this.props}
                                />
                            } else {
                                return null;
                            }
                        
                            case ElementType.SHAPE:
                                if (this.isElementDisplay(element)) {
                                    return <ShapeElement 
                                        ref={node => (this.elementNodes[index] = node)}
                                        key={this.props.sceneIndex+"-"+index} 
                                        // edit={ele => this.editElement(index, ele)} 
                                        editStart={this.editStart} 
                                        dragMoving={this.dragMoving} 
                                        dragEnding={this.dragEnding} 
                                        transforming={this.transforming} 
                                        transformEnding={this.transformEnding} 
                                        element={element} 
                                        name={this.props.sceneIndex+"-"+index} 
                                        draggable={editable} 
                                        isDrag={this.state.isDrag}
                                        visible={true}
                                        showAnimation={false}
                                        {...this.props}
                                    />
                                } else {
                                    return null;
                                }

                        case ElementType.CHART:
                            if (this.isElementDisplay(element)) {
                                return <ChartElement 
                                    key={this.props.sceneIndex+"-"+index} 
                                    // edit={ele => this.editElement(index, ele)} 
                                    editStart={this.editStart} 
                                    dragMoving={this.dragMoving} 
                                    dragEnding={this.dragEnding} 
                                    transforming={this.transforming} 
                                    transformEnding={this.transformEnding} 
                                    element={element} 
                                    name={this.props.sceneIndex+"-"+index} 
                                    draggable={editable} 
                                    isDrag={this.state.isDrag}
                                    visible={true}
                                    showAnimation={false}
                                    {...this.props}
                                />
                            } else {
                                return null;
                            }

                        case ElementType.VIDEO:
                            if (this.isElementDisplay(element)) {
                                let elementTag;
                                if(!this.props.currentScene.videoTags()) return;
                                //find video by id in scene
                                this.props.currentScene.videoTags().map(item => {
                                    if (item.id === element.id()) {
                                        elementTag = item.element;
                                    }
                                    return item;
                                })
                                
                                return <VideoElement 
                                    key={this.props.sceneIndex+"-"+index} 
                                    // edit={ele => this.editElement(index, ele)} 
                                    editStart={this.editStart} 
                                    dragMoving={this.dragMoving} 
                                    dragEnding={this.dragEnding} 
                                    transforming={this.transforming} 
                                    transformEnding={this.transformEnding} 
                                    element={element}
                                    tag={elementTag}
                                    name={this.props.sceneIndex+"-"+index}
                                    width={200} 
                                    height={200} 
                                    draggable={editable} 
                                    isDrag={this.state.isDrag}
                                    visible={true}
                                    showAnimation={false}
                                    {...this.props}
                                />
                            } else {
                                return null;
                            }
                            
                        case ElementType.AUDIO:
                            return null;
                        default:
                            //TODO: remove
                            console.log("wrong!!!!!!!");
                            console.log(element);
                            return null;
                    }
                }.bind(this))}
                <TransformerComponent
                    selectedElementName={this.props.elementName}
                    selectedElementType = {this.props.currentElement? this.props.currentElement.type() : null  }
                    selectedElementShapeType = {this.props.currentElement&&this.props.currentElement.type()==="shape_element"? this.props.currentElement.info().shapeType : null  }
                />
            </Layer>
        )
    }
}

