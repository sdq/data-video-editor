import React, { Component } from 'react'
import {  Collapse, Row, Col, Divider, Button, Input, List } from 'antd';
import { SketchPicker } from 'react-color';
import MyURL from '@/constants/MyURL';
const { TextArea } = Input;
const { Panel } = Collapse;

const bglisttexture =  [    //default bg  of texture
    {
    name: "earth",
    style: "Texture",
    src: MyURL.OSS+"/backgroundImages/t-earth.png"
},
{
    name: "green",
    style: "Texture",
    src: MyURL.OSS+"/backgroundImages/t-green.png"
},
{
    name: "pinkblue",
    style: "Texture",
    src: MyURL.OSS+"/backgroundImages/t-pinkblue.png"
},
{
    name: "point",
    style: "Texture",
    src:MyURL.OSS+"/backgroundImages/t-point.png"
},
{
    name: "triangle",
    style: "advanced",
    src: MyURL.OSS+"/backgroundImages/t-triangle.png"
}];
const bglistscene = [       //default bg of scene
    {
    name: "sandy",
    style: "Scene",
    src: MyURL.OSS+"/backgroundImages/s-sandy.png"
},
{
    name: "classroom",
    style: "Scene",
    src: MyURL.OSS+"/backgroundImages/s-classroom.png"
},
{
    name: "blackboard",
    style: "Scene",
    src: MyURL.OSS+"/backgroundImages/s-blackboard.png"
}];
const bglistcharacter = [       //default bg  of character
    {
    name: "student",
    style: "Character",
    src: MyURL.OSS+"/backgroundImages/c-student.png"
},
{
    name: "midautumn",
    style: "Character",
    src: MyURL.OSS+"/backgroundImages/c-midautumn.png"
},
{
    name: "hand",
    style: "Character",
    src: MyURL.OSS+"/backgroundImages/c-hand.png"
}];
export default class SceneTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            inputValue: 1,
            color : this.props.currentScene.backgroundColor(), //default
            key : "",
            bgimage:"", 
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleScriptChange = this.handleScriptChange.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);  
    }

    handleBGClick = (item)=>{
        let bgimage=item.src;
        this.setState({bgimage})  
        const newScene = Object.assign({},this.props.currentScene);
        newScene.backgroundImage(bgimage);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    handleBGChange(){ 
        let bgimage = this.state.bgimage;
        this.setState({bgimage})
    }


    handleColorClick () {
        let {displayColorPicker} =this.state;
        displayColorPicker = displayColorPicker==="none"?"block":"none";
        this.setState({displayColorPicker})
        if(displayColorPicker){
            //this.props.updateColor(key,color)
        }
        this.setState({ displayColorPicker: !this.state.displayColorPicker })

    };


    handleColorChange = (value)=>{
        let color = value.hex;
        let bgimage = "";
        this.setState({bgimage,color})
        const newScene = Object.assign({},this.props.currentScene);
        newScene.backgroundImage("");
        newScene.backgroundColor(color);
        this.props.updateScene(this.props.sceneIndex, newScene); 
    }
  
    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };


    handleScriptChange(e) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.script(e.target.value);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    handleTitleChange(e) {
        //handle title
    }

    onChange = value => {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.duration = value;
        this.props.updateScene(this.props.sceneIndex, newScene);
    };

    render() {
        const popover = {
            position: 'absolute',
            //position: 'relative',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            //position:
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }



        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 10,
            border: 0,
            overflow: 'hidden',
            //textAlign:'center',
            fontSize:'12px',
          };


        return (
            <div style={{padding: '0px 10px 0px 10px', fontSize: '14px',height:this.props.contentHeight-50+'px',overflow: 'auto'}}>
                <Divider>Script</Divider> 
                {/* <Row style={{margin: '5px 0px 0px 0px', fontSize: '14px'}}>
                <Input placeholder="title" style={{ padding: '0px 5px 0 5px'}} value={this.props.currentScene.title()} onChange={this.handleTitleChange}  />
                </Row> */}
                <Row style={{margin: '0px 0px 0px 0px', fontSize: '12px'}}>
                    <TextArea style={{ padding: '0px 5px 0 5px'}} rows={3} value={this.props.currentScene.script()} onChange={this.handleScriptChange}   />
                </Row>
                
                <Divider>Background</Divider>
                <Row style={{margin: '0px 10px 0px 10px', fontSize: '14px'}}>
                <Col span={4} style={{margin: '0px 0px 0px 6px'}}>
                Color
                </Col>
                    <Col span={5} style={{margin: '0px 0px 0px 0px'}}>
                    <Button size='small' icon="bg-colors" onClick={ this.handleColorClick } style={{width: '100%',margin: '0px 0px 0px 0px',background:this.props.currentScene.backgroundColor(),border:"#ffffff",verticalAlign: "middle"}}></Button> 
                     {this.state.displayColorPicker ? <div style={ popover }>
                     <div style={ cover } onClick={ this.handleColorClose } />
                     <SketchPicker color={this.props.currentScene.backgroundColor()}  onChange={this.handleColorChange}  />
                     </div>:null }
                    </Col>
                </Row>
                <Collapse accordion bordered={false} expandIconPosition="right" defaultActiveKey={['1']} >
                <Panel header="Geometric Texture" key="1" style={customPanelStyle} >
                <List         
                    grid={{ gutter: 3, column: 2 }}
                        dataSource={bglisttexture}
                            renderItem={item => (
                                <List.Item key ={item} value={item.src} onClick={this.handleBGClick.bind(this,item)}>                
                                    <div style ={{height: '74px',borderStyle:'solid', borderColor:'#D8D8D8',borderWidth:'1px',padding: '5px'}}> 
                                    <img  src={item.src} alt={item.name}  style ={{maxWidth:'100%',maxHeight:'100%'}}/>
                                    </div>
                                </List.Item>
                      )}
                 />
                </Panel>
                 <Panel header="Illustration Scene" key="2" style={customPanelStyle}>
                 <List
                               grid={{ gutter: 3, column: 2 }}
                                dataSource={bglistscene}
                                 renderItem={item => (
                                    <List.Item key ={item} value={item.src} onClick={this.handleBGClick.bind(this,item)}>                
                                    <div style ={{height: '74px',borderStyle:'solid', borderColor:'#D8D8D8',borderWidth:'1px',padding: '5px'}}> 
                                    <img  src={item.src} alt={item.name}  style ={{maxWidth:'100%',maxHeight:'100%'}}/>
                                    </div>
                                  </List.Item>
                                 )}
                            />
                 </Panel>
                 <Panel header="Character Events" key="3" style={customPanelStyle}>
                 <List
                               grid={{ gutter: 3, column: 2 }}
                                dataSource={bglistcharacter}
                                 renderItem={item => (
                                    <List.Item key ={item} value={item.src} onClick={this.handleBGClick.bind(this,item)}>                
                                    <div  style ={{height: '74px',borderStyle:'solid', borderColor:'#D8D8D8',borderWidth:'1px',padding: '5px'}}> 
                                    <img  src={item.src} alt={item.name}  style ={{maxWidth:'100%',maxHeight:'100%'}}/>
                                    </div>
                                    </List.Item>
                                 )}
                            />
                  </Panel>
                 </Collapse>

                {/* <Divider>Transitions</Divider>
                <Collapse accordion bordered={false} style={{margin: '-5px 0px 0px 0px'}} expandIconPosition="right">
                <Panel header="Basic effects" key="1" style={customPanelStyle}>
                <List          style={{fontSize: '4px'}}
                               grid={{ gutter: 3, column: 3 }}
                                dataSource={effectsList}
                                 renderItem={item => (
                                    <List.Item>
                                        <ImageCard info={item}  {...this.props} />
                                        <p  style={{textAlign: 'center'}} >{item.name}</p>
                                     </List.Item>
                                 )}
                            />
                </Panel>
                 <Panel header="Advanced effects" key="2" style={customPanelStyle}>
                 <List         style={{fontSize: '4px'}}
                               grid={{ gutter: 3, column: 3 }}
                                dataSource={effectsList}
                                 renderItem={item => (
                                    <List.Item>
                                        <ImageCard info={item}  {...this.props} />
                                        <p  style={{textAlign: 'center'}} >{item.name}</p>
                                     </List.Item>
                                 )}
                            />
                 </Panel>
                 </Collapse> */}
            </div>
        )
    }
}