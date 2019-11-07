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
                //text编辑 换行实时显示
                if(e.target.value.indexOf('\n') !== -1){
                    this.props.currentElement.info().height += this.props.currentElement.info().textSize;
                }
                return this.props.updateScene(this.props.sceneIndex, newScene);  
                }       
        } 
        
    }

    render() {
             //不同字体textarea与tranformer的变换伸缩度（暂时忽略其余浏览器）
            let offwidth = 0; 
             //取得浏览器的userAgent字符串
            let userAgent = navigator.userAgent; 
            let isOpera = userAgent.indexOf("Opera") > -1;
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
                offsetY = 2;
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

            offsetW = (this.props.currentElement) ? this.props.currentElement.info().textSize:20;//基础偏差：一个字的偏差
            offwidth = 0.25-offsetW/500;  //次级偏差：计算伸缩，假定为线性函数（中文） 
            
            //TODO://识别换行前是英文还是中文
            //假如换行的是英文，那么换行时就会出现跳行偏差


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
              resize: 'none',
              autofocus:"autofocus",//设置光标，无效
              lineHeight:(this.props.currentElement) ? this.props.currentElement.info().textSize+'px':'20px',//需要和当前字号相等
              //Elimination of displacement error between textTransform and textEditor
              //判断当前element是否存在，保证编辑时切换scene运行正确
              fontFamily:(this.props.currentElement) ? this.props.currentElement.info().fontFamily:"Arial",
              fontSize:(this.props.currentElement) ? this.props.currentElement.info().textSize:20,
              top:(this.props.currentElement) ? this.props.currentElement.info().y-offsetY : 0,
              left:(this.props.currentElement) ? this.props.currentElement.info().x-offsetX : 0,
              width:(this.props.currentElement) ? this.props.currentElement.info().width+offsetW*offwidth: 0, 
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
