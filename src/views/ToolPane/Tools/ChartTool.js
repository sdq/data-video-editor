import React, { Component } from 'react';
import { InputNumber, Row, Col, Divider, Icon } from 'antd';
import { ChartConfigure } from '@/charts/Info';

export default class ChartTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            chartX : this.props.currentElement.info().x,
            chartY : this.props.currentElement.info().y,
        };
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    changeChartX (x)  {
        let y = this.props.currentElement.info().y;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);
        this.props.currentElement.info().x = x;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };
    changeChartY  (y)  {
        let x = this.props.currentElement.info().x;  //console conflict
        let dragPos = {x,y}; 
        this.props.dragElement(dragPos);
        this.props.currentElement.info().y = y;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };
    changeChartR = (value) => {
        this.props.currentElement.info().rotation = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

    };
    changeChartW = (w) => {
        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let h = this.props.currentElement.info().height; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);
        this.props.currentElement.info().width = w;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

    };
    changeChartH = (h) => {
        let r = this.props.currentElement.info().rotation;  // need a real size to effect
        let w = this.props.currentElement.info().width; 
        let transformInfo = {w,h,r}; 
        this.props.transformElement(transformInfo);
        this.props.currentElement.info().height = h;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);

    };

    handleConfigureOk = (spec) => {
        this.props.visConfigure(spec.configure);
        // Update chart on canvas
        const newScene = Object.assign({}, this.props.currentScene);
        let newEle = Object.assign({}, this.props.currentElement);
        newEle.info().spec = spec;
        newScene.updateElement(newEle, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newEle, this.props.elementIndex, elementName);
    }

    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        return (
            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',overflow: 'auto'}}>
                <Divider>Position</Divider>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.dragPos ? this.props.dragPos.x : currentElement.info().x } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                    onChange = {value => this.ChangeChartX(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.dragPos ? this.props.dragPos.y : currentElement.info().y } size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.ChangeChartY(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                    <Col span={6}><InputNumber min={-360} max={360} value={this.props.transformInfo ? this.props.transformInfo.r : currentElement.info().rotation} precision={0.1} formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeChartR(value)}
                    /></Col>
                    
                </Row>
                <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.transformInfo ? this.props.transformInfo.w : currentElement.info().width} size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeChartW(value)}
                    /></Col>
                    <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                    <Col span={6}><InputNumber min={0} max={600} value={this.props.transformInfo ? this.props.transformInfo.h : currentElement.info().height} size="small" precision={0.1} style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    onChange = {value => this.changeChartH(value)}
                    /></Col>
                    {/* <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col> */}
                </Row>
                <Divider>Configure</Divider>
                <ChartConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
            </div>
        )
    }
}

