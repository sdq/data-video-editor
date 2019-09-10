import React, { Component } from 'react'
import { InputNumber, Row, Col, Divider, Button, Select,Icon } from 'antd';
import { SketchPicker } from 'react-color';

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

    ChangeTextXX (value)  {

        this.props.currentElement.info().x = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
    };

    ChangeTextYY = (value) => {

        this.props.currentElement.info().y = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
 
    };



    render() {

        const {currentElement} = this.props;
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white'}}>
              <Divider>Position</Divider>
               <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2}  style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>X</Col>
                   <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().x} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}} 
                  // value= {value}
                  onChange = {value => this.ChangeTextXX(value)}
                   onPressEnter={value => this.ChangeTextX(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>Y</Col>
                   <Col span={6}><InputNumber min={0} max={600} value={currentElement.info().y} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}
                    //value= {value}
                   //onPressEnter = {this.ChangeTextY(value)}
                   onChange = {value => this.ChangeTextYY(value)}
                   onPressEnter={value => this.ChangeTextY(value)}
                   /></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="redo" /> </Col>
                   <Col span={6}><InputNumber min={-360} max={360} defaultValue={0}  formatter={value => `${value}°`} size="small"  style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                  
               </Row>
               <Row style={{margin: '15px 15px 0px 12px', fontSize: '14px'}}>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>W</Col>
                   <Col span={6}><InputNumber min={0} max={600} defaultValue={100} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}>H</Col>
                   <Col span={6}><InputNumber min={0} max={600} defaultValue={100} size="small" style={{width: '100%',padding: '0px 0px 0px 0px'}}/></Col>
                   <Col span={2} style={{textAlign:'center', padding: '0px 0px 0px 0px'}}><Icon type="link" /> </Col>
               </Row>
            </div>
        )
    }
}

