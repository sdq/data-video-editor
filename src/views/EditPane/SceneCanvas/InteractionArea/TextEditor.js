import React, { Component } from 'react';

let offsetX = 0.0;  //offset in browers，不同浏览器不同，每一次刷新都不同
let offsetY = 0.0;  //offset in browers
//let offsetW = 20;   //offset between textelement and texteditor，不同浏览器不同
let offsetH = 10;    //by gmj 确认需要 offset between textelement and texteditor

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentElement:this.props.currentElement,
            text:(this.props.currentElement) ? this.props.currentElement.info().text : 0,
            currentTextId:this.props.currentElement.id(),
            isShowTextArea:this.props.showTextEditor,
        };
        this.isTextChanged = false
    }

    onTextChange(e)
    {
        this.isTextChanged = true;
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
    //由交互层到编辑层
    componentWillUnmount(){ 
        const newScene = Object.assign({},this.props.currentScene);
        let realWidth = parseInt(this.textarea.style.width.split('px')[0]) 
        let realHeight = parseInt(this.textarea.style.height.split('px')[0]) 
        this.props.currentElement.info().width = realWidth;
        if(this.isTextChanged){
            this.props.currentElement.info().height = realHeight;//真实的高度
        }else{
            this.props.currentElement.info().height = realHeight - offsetH; //为了显示的，增加了offsetH。现在要恢复
        }
        this.props.updateScene(this.props.sceneIndex, newScene);   
    }

    render() {


        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;


        //当宽高同时变化，按照最小的scale缩放
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        const scale = scaleX>scaleY?scaleY:scaleX;
        // //获取现在画布的真实大小
        // var fakeWidth = 0;
        // var fakeHeight = 0;
        // if(scaleX>scaleY){
        //     fakeWidth = 800*canvasH/450;
        //     fakeHeight = canvasH;
        // }else {
        //     fakeWidth = canvasW;
        //     fakeHeight =canvasW*450/800;
        // }
        



           //位移偏差
             //不同字体textarea 不同字号 与tranformer的变换伸缩度（暂时忽略其余浏览器）都不同
            //let offwidth = 0; 
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
                offsetX = 1;
                offsetY = 1;
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

            //宽度偏差
            //offsetW = (this.props.currentElement) ? this.props.currentElement.info().textSize:20;//基础偏差：一个字的偏差
            //offwidth = 0.25-offsetW/500;  //次级偏差：计算伸缩，假定为线性函数,进行测试（中文）
            //假如换行的是英文，那么换行时就会出现跳行偏差


       

       
        return (
             <div className="TextEditor" style={{display: (this.state.isShowTextArea) ? "block" : "none"}} > 
             <textarea
             ref={node => { this.textarea = node; }}
             style={{
              // apply many styles to match text on canvas as close as possible
              // remember that text rendering on canvas and on the textarea can be different
              // and sometimes it is hard to make it 100% the same. But we will try...
              position: "absolute",
              outline: "none",
              border: "0px",
              background:'none',
              color:this.props.currentElement.info().color,
              resize: 'none',
              lineHeight:(this.props.currentElement) ? this.props.currentElement.info().textSize*scale+'px':20*scale+'px',//需要和当前字号相等
              //Elimination of displacement error between textTransform and textEditor
              //判断当前element是否存在，保证编辑时切换scene运行正确
              fontFamily:(this.props.currentElement) ? this.props.currentElement.info().fontFamily:"Arial",
              fontSize:(this.props.currentElement) ? this.props.currentElement.info().textSize*scale:20*scale,
              top:(this.props.currentElement) ? (this.props.currentElement.info().y-offsetY)*scale : 0,
              left:(this.props.currentElement) ? (this.props.currentElement.info().x-offsetX)*scale : 0,
              //width:(this.props.currentElement) ? (this.props.currentElement.info().width+offsetW+offwidth)*scale: 0, 
              //height: this.textarea?this.textarea.scrollHeight: (this.props.currentElement) ? (this.props.currentElement.info().height + offsetH) * scale : 0,
              width:(this.props.currentElement) ? (this.props.currentElement.info().width ): 0, 
              height: this.textarea?this.textarea.scrollHeight: (this.props.currentElement) ? (this.props.currentElement.info().height+ offsetH ) : 0,
              fillOpacity:0.5,
              padding:'0px',
              margin:'0px',
              overflow:'hidden'
            }}
            autoFocus  //自动获取焦点 
            spellCheck ={false}//关闭拼写检查
            value = {this.state.text}
            onChange={(value) => {this.onTextChange(value)}}
             />
      </div>
        )
    }
}
