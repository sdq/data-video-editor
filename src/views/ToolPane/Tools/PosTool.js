import React, { Component } from 'react'
import { InputNumber, Row, Col,Icon } from 'antd';

export default class PosTool extends Component {

    changeX (x)  { 
        let y = this.props.currentElement.info().y;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);
        this.props.currentElement.info().x = x;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    changeY = (y) => {
        let x = this.props.currentElement.info().x;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);
        this.props.currentElement.info().y = y;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
 
     }

     changeR = (r) => {
        this.props.currentElement.info().rotation = r;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     }

     changeW = (w) => {
        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let h = this.props.currentElement.info().height; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);
        this.props.currentElement.info().width = w;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

     };
     changeH = (h) => {
        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let w = this.props.currentElement.info().width; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);    
        this.props.currentElement.info().height = h;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
     }

    


    render() {
        const {currentElement} = this.props;
        return (
            <div style={{padding: '0px 10px 5px 10px', fontSize: '14px', backgroundColor: 'white',height:'90px',overflow: 'auto'}}>

                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                   <Col span={6}><InputNumber min={0} max={700} value = {this.props.dragPos ? this.props.dragPos.x : currentElement.info().x } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                   onChange = {value => this.changeX(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                   <Col span={6}><InputNumber min={0} max={700} value = {this.props.dragPos ? this.props.dragPos.y : currentElement.info().y } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeY(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                   <Col span={6}><InputNumber min={-360} max={360} value={this.props.transformInfo ? this.props.transformInfo.r : currentElement.info().rotation} precision={0.1} formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeR(value)}
                   /></Col>  
                </Row>

                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                   <Col span={6}><InputNumber min={0} max={800} value={this.props.transformInfo ? this.props.transformInfo.w : currentElement.info().width} precision={0.1} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeW(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                   <Col span={6}><InputNumber min={0} max={450} value={this.props.transformInfo ? this.props.transformInfo.h : currentElement.info().height} precision={0.1} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}
                   onChange = {value => this.changeH(value)}
                   /></Col>
                   {/* <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col> */}
                </Row>


            </div>
        
        )
    }
}


