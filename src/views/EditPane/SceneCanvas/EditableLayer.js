import React, { Component } from 'react';
import { Layer } from 'react-konva';
import TransformerComponent from '@/components/Elements/TransformerComponent';
import ImageElement from '@/components/Elements/ImageElement';
import GifElement from '@/components/Elements/GifElement'
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import VideoElement from '@/components/Elements/VideoElement';
import ElementType from '@/constants/ElementType';
import _ from 'lodash';


let lastScale = '';

export default class EditableLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAssistLines: false,
            canvasPosition: {
                left: 0,
                top: 0
            }
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
        let normal = true;  //正常情况
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

    dragEnding(x,y,index) {
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
        //different element
        let currentWidth = this.props.currentElement.info().width;
        let currentHeight = this.props.currentElement.info().height;
        let w,h,r = '';
        let transforminfo = '';
       switch (this.props.currentElement.type()) {
            case ElementType.TEXT:

                    //Determine whether scale is equal to last time(Rotation only)
                    //So scale calculation is not performed at this time
                    if(lastScale!==e.currentTarget.scaleX()){
                         w = currentWidth*e.currentTarget.scaleX();
                         //h = currentHeight*e.currentTarget.scaleY();
                         //计算新的文字高度
                         h = Math.ceil((this.props.currentElement.info().text.length * this.props.currentElement.info().textSize)/w)*this.props.currentElement.info().textSize;
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
                    if(lastScale!==e.target.scaleX()){
                        newEle.info().width = newEle.info().width*e.target.scaleX(); 
                        //newEle.info().height = newEle.info().height*e.target.scaleY(); 
                        newEle.info().height = Math.ceil((this.props.currentElement.info().text.length * this.props.currentElement.info().textSize)/this.props.currentElement.info().width)*this.props.currentElement.info().textSize
                    }
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
                                    visible={true}
                                    showAnimation={false}
                                    isAnimateGifBydbClicked={element.isAnimateGif}
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
                />
            </Layer>
        )
    }
}
