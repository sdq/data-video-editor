import React, { Component } from 'react';

var isLastEditFinished = false;  //start next edit

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentElement:this.props.currentElement,// change to element id
            text:(this.props.currentElement) ? this.props.currentElement.info().text : 0,  //nouse
            currentTextId:this.props.currentElement.id(),
            isShowTextArea:this.props.showTextEditor,//this.props.showTextEditor,
            isLastEditFinished:isLastEditFinished,
        };
    }

    onTextChange(e)
    {
        this.setState({
            text:e.target.value
        }); 
        for (let i=0;i<Object.keys(this.props.currentElements).length;i++)  
        {

                if(this.props.currentElements[i].id()===this.state.currentTextId){
                //console.log(this.props.currentElements[i].id());
                console.log(e.target.value);
                console.log(this.state.text);//延迟获取
                const newScene = Object.assign({},this.props.currentScene);
                this.props.currentElements[i].info().text = e.target.value; 
                return  this.props.updateScene(this.props.sceneIndex, newScene);  
                }
                
        }
        
    }

    render() {

        console.log(this.props);
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
              fontSize:'16px',
              background:'none',
              color:'black',
              top:(this.props.currentElement) ? this.props.currentElement.info().y : 0,
              left:(this.props.currentElement) ? this.props.currentElement.info().x : 0,
              /*
              textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
              textarea.style.height =textNode.height() - textNode.padding() * 2 + 5 + 'px';
              */
              width: "300px",//需要动态获取
              height:"60px",//需要动态获取
              fillOpacity:0.5
            }}
            //defaultValue = {(this.props.currentElement) ? this.props.currentElement.info().text : 0}
            value = {this.state.text}
            //value={(this.props.currentElement) ? this.props.currentElement.info().text : 0}
            //placeholder={(this.props.currentElement) ? this.props.currentElement.info().text : 0}
            onChange={(value) => {this.onTextChange(value)}}
            onBlur={(value) => {this.inputOnBlur(value)}}
             />
      </div>
        )
    }
}
