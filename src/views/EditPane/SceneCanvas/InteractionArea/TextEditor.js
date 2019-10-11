import React, { Component } from 'react';


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
              top:(this.props.currentElement) ? this.props.currentElement.info().y-7 : 0,
              left:(this.props.currentElement) ? this.props.currentElement.info().x-0.5 : 0,
              width: "400px",//fake
              height:"60px",//fake
              fillOpacity:0.5
            }}
            value = {this.state.text}
            onChange={(value) => {this.onTextChange(value)}}
             />
      </div>
        )
    }
}
