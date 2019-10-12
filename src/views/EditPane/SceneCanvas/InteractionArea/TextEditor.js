import React, { Component } from 'react';

var offsetX = 0;  //offset in browers
var offsetY = 0;  //offset in browers

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
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                offsetX =0.5;
                offsetY = 7;
            }; //判断是否Opera浏览器
            if (userAgent.indexOf("Firefox") > -1) {
                offsetX = 1;
                offsetY = 6.6;
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1){
                offsetX = 1;
                offsetY = 9.5;
         }
            if (userAgent.indexOf("Safari") > -1) {
                offsetX =1.5;
                offsetY = 9.5;
            } //判断是否Safari浏览器
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                offsetX =0.5;
                offsetY = 6.5;
            }; //判断是否IE浏览器
            //console.log(userAgent);
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
              fontSize:this.props.currentElement.info().textSize,
              background:'none',
              color:'black',
              //Elimination of displacement error between textTranform and textEditor
              top:(this.props.currentElement) ? this.props.currentElement.info().y-offsetY : 0,
              left:(this.props.currentElement) ? this.props.currentElement.info().x-offsetX : 0,
              width:"400px", 
              height:"60px",//completely fake width and height now
              fillOpacity:0.5
            }}
            value = {this.state.text}
            onChange={(value) => {this.onTextChange(value)}}
             />
      </div>
        )
    }
}
