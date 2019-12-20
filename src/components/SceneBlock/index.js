import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import Color from '@/constants/Color';
import {Button, Modal} from 'antd';
import CanvasPreview from './CanvasPreview';
import UIMode from '@/constants/UIMode';
import './sceneblock.css';

let num = 1;
export default class SceneBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            display: "block",
            visible: false,
        };
        this.clickSceneBlock = this.clickSceneBlock.bind(this);
        this.dbclickSceneBlock = this.dbclickSceneBlock.bind(this);
        this.copyScene = this.copyScene.bind(this);
        this.deleteScene = this.deleteScene.bind(this);
    }

    clickSceneBlock() {
        this.props.unselectElement();
        if(!this.props.scenes[this.props.index]){
            //console.log("err","this scene deleted")
        }else{
            this.props.selectScene(this.props.index);}
        
    }

    dbclickSceneBlock() {
        this.props.selectScene(this.props.index);
        if (this.props.uimode === UIMode.STORYLINE_MODE) {
            this.props.displayTrackEditor();
        } else {
            this.props.displayStoryline();
        }
    }

    copyScene(){
        // const newScene = this.props.scenes[this.props.sceneIndex];
        const newScene = Object.assign({},this.props.scenes[this.props.sceneIndex]);
        const newID = uuidv4();
        newScene.script(this.props.scenes[this.props.sceneIndex].script()+"copy"+num);
        newScene.id(newID);
        this.props.addScene(newScene);
        num++;
    }

    deleteScene(){
        this.setState({
            visible: true,
          });

    }

    handleOk = e => {
      this.setState({
        visible: false,
      });
       //取消选择
       this.props.selectScene(0);
       //this.props.scenes.splice(this.props.sceneIndex,1)
        //直接执行删除最后场景会报错，setTimeout，将界面先隐藏
        setTimeout(function(){
            this.props.scenes.splice(this.props.sceneIndex,1)
        }.bind(this), 100);
        this.setState({
            display: "none",
        });
    };
  
    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };


    render() {
        return (
            <div className="sceneblock" 
            onClick={this.clickSceneBlock} 
            onDoubleClick={this.dbclickSceneBlock}                        
            
            style={{display:this.state.display,borderColor: this.props.isSelected?Color.DEEP_ORANGE:Color.GRAY}}>
                <div className="canvas-preview">
                    <CanvasPreview {...this.props} />
                </div>
                <div className="script-preview">
                    {this.props.scene.script()}
                </div>
                <div className="scene-handle">
                    <Button icon="copy" size="large" type="link" style = { {padding: '0 0px 0 20px'} } onClick={this.copyScene} />
                    <Button icon="delete" size="large" type="link" style = { {padding: '0 0px 0 20px'} } onClick={this.deleteScene} />
                </div>
                <Modal
                centered
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>确定删除该场景吗？</p>
                <p>Are you sure to delete the scene？</p>
                </Modal>
            </div>
               
        )
    }
}
