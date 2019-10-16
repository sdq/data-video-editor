import React, { Component } from 'react';

let offsetX = 0.0;  //offset in browers，不同浏览器不同，每一次刷新都不同
let offsetY = 0.0;  //offset in browers
let offsetW = 20;   //offset between textelement and texteditor，不同浏览器不同
let offsetH = 0;    //offset between textelement and texteditor

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentElement:this.props.currentElement,
            text:(this.props.currentElement) ? this.props.currentElement.info().text : 0,
            currentTextId:this.props.currentElement.id(),
            isShowTextArea:this.props.showTextEditor,
        };
    }

    onTextChange(e)
    {
        this.setState({text:e.target.value}); 
        for (let i=0;i<Object.keys(this.props.currentElements).length;i++){
                if(this.props.currentElements[i].id()===this.state.currentTextId){
                const newScene = Object.assign({},this.props.currentScene);
                this.props.currentElements[i].info().text = e.target.value; 
                return this.props.updateScene(this.props.sceneIndex, newScene);  
                }       
        } 
    }

    render() {
        //取得浏览器的userAgent字符串
            var userAgent = navigator.userAgent; 
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                offsetX = 0.5;
                offsetY = 7;
            }; //判断是否Opera浏览器
            if (userAgent.indexOf("Firefox") > -1) {
                offsetX = 1;
                offsetY = 6.6;
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1){
                offsetX = 2;
                offsetY = 6.4965;
            }
            if (userAgent.indexOf("Safari") > -1 && !(userAgent.indexOf("Chrome") > -1) ) {
                //在Mac主机电脑上通过测试
                offsetX = 2;
                offsetY = 7;
            } //判断是否Safari浏览器
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                offsetX = 0.5;
                offsetY = 6.5;
            }; //判断是否IE浏览器
            //仍然需要更精准测试


        return (
             <div className="TextEditor" style={{display: (this.state.isShowTextArea) ? "block" : "none"}} > 
             <textarea
             style={{
               // apply many styles to match text on canvas as close as possible
               // remember that text rendering on canvas and on the textarea can be different
               // and sometimes it is hard to make it 100% the same. But we will try...
              position: "absolute",
              outline: "none",
              border: "0px",
              background:'none',
              color:'black',
              //Elimination of displacement error between textTransform and textEditor
              //判断当前element是否存在，保证编辑时切换scene运行正确
              fontFamily:(this.props.currentElement) ? this.props.currentElement.info().fontFamily:"Arial",
              fontSize:(this.props.currentElement) ? this.props.currentElement.info().textSize:20,
              top:(this.props.currentElement) ? this.props.currentElement.info().y-offsetY : 0,
              left:(this.props.currentElement) ? this.props.currentElement.info().x-offsetX : 0,
              width:(this.props.currentElement) ? this.props.currentElement.info().width+offsetW : 0, 
              height:(this.props.currentElement) ? this.props.currentElement.info().height+offsetH : 0,
              fillOpacity:0.5
            }}
            value = {this.state.text}
            onChange={(value) => {this.onTextChange(value)}}
             />
      </div>
        )
    }
}
