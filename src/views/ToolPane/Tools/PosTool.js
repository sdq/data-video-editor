import React, { Component } from 'react'
import { InputNumber, Row, Col,Icon } from 'antd';
import _ from 'lodash';

export default class PosTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticEdit: false,
        };

    }

    changeX (x)  { 
        let y = this.props.currentElement.info().y;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);       
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.currentElement.info().x = x;
    }

    changeY = (y) => {
        let x = this.props.currentElement.info().x;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);       
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.currentElement.info().y = y;
     }

     changeR = (r) => {
        let w = this.props.currentElement.info().width;  // need a real size to effect
        let h = this.props.currentElement.info().height; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.currentElement.info().rotation = r;
     }

     changeW = (w) => {
         //此时要先显示一个假的宽度，让他坚持300
         //拖拽时的数字对于300的突变太大，应该再拖动结束还未点击pos之间更新origin并且不能够使用 
         //再点击postool的时候就应该更新origin
        this.props.currentElement.info().isPosTool = true;   //mark: Transform from toolpane

        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let h = this.props.currentElement.info().height; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.currentElement.info().width = w;


        // //图表 比例固定
        // if(this.props.currentElement.type() == ElementType.CHART){
        //     this.changeH(w);
        // }

        
     };
     changeH = (h) => {
        this.props.currentElement.info().isPosTool = true;   //mark: Transform from toolpane

        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let w = this.props.currentElement.info().width; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);    
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.currentElement.info().height = h;
     }

    render() {
        const {currentElement,dragPos} = this.props;
        const currentElementType = currentElement.type();

        return (
            <div style={{padding: '0px 10px 5px 10px', fontSize: '14px', backgroundColor: 'white',height:'90px',overflow: 'auto'}}>

                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                   <Col span={6}><InputNumber min={0} max={800} value = {dragPos ? dragPos.x : currentElement.info().x } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                   onChange = {value => this.changeX(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                   <Col span={6}><InputNumber min={0} max={450} value = {dragPos ? dragPos.y : currentElement.info().y } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeY(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                   <Col span={6}><InputNumber min={-360} max={360} value={this.props.transformInfo ? this.props.transformInfo.r : currentElement.info().rotation} precision={0.1} formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeR(value)}
                   /></Col>  
                </Row>

                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                   <Col span={6}><InputNumber min={0} max={800}  disabled = {currentElementType==="text_element"?true:false}
                   value={this.props.transformInfo ? this.props.transformInfo.w : currentElement.info().width} precision={0.1} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeW(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                   <Col span={6}><InputNumber min={0} max={450} 
                   disabled={(currentElement.type()==="shape_element"?(currentElement.info().shapeType==="line"||currentElement.info().shapeType==="arrow"?true:false):false)||(currentElementType==="text_element"?true:false)}
                   value={this.props.transformInfo ? this.props.transformInfo.h : currentElement.info().height} precision={0.1} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeH(value)}
                   /></Col>
                   {/* <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col> */}
                </Row>


            </div>
        
        )
    }
}


