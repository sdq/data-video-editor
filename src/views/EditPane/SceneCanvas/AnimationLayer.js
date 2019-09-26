import React, { Component } from 'react';
import { Layer } from 'react-konva';
import ImageElement from '@/components/Elements/ImageElement';
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import ElementType from '@/constants/ElementType';

export default class AnimationLayer extends Component {

    constructor(props) {
        super(props);
        this.elementNodes = new Array(props.currentElements.length).fill({});
    }
     
    
    componentWillUnmount() {
       console.log("点击了暂停按钮")
       this.props.currentScene.elements().map(element =>{
           //console.log("elementNodes",element._info)
           if(element.type() === ElementType.AUDIO){
            element._elementSelf.pause()
            console.log("pause")
           }
           return element
       })
    }

    isElementDisplay(element) {
        let isElementDisplay = false;
        if (this.props.scenePosition >= element.start() && this.props.scenePosition <= element.start()+element.duration()) {
            element.fragments().forEach(fragment => {
                if (this.props.scenePosition >= fragment.start() && this.props.scenePosition <= fragment.end()) {
                    isElementDisplay = true;
                }
            });
        }
        return isElementDisplay;
    }



    render() {
        return (
            <Layer 
                ref={node => (this.animationLayer = node)}
            >
            
                {this.props.currentScene.elements().map(function(element, index) {
                    // TODO: dbclick
                    // if (index !== this.props.dbClickedElementIndex) {
                    //     return null;
                    switch (element.type()) {
                        case ElementType.TEXT:
                            return <TextElement
                                ref={node => (this.elementNodes[index] = node)} 
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                draggable={false} 
                                visible={this.isElementDisplay(element)}
                                showAnimation={true}
                                {...this.props}
                            />
                            
                        case ElementType.IMAGE:
                            return <ImageElement 
                                ref={node => (this.elementNodes[index] = node)}
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                draggable={false} 
                                visible={this.isElementDisplay(element)}
                                showAnimation={true}
                                {...this.props}
                            />
                            
                        case ElementType.CHART:
                            return <ChartElement 
                                ref={node => (this.elementNodes[index] = node)}
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                width={200} 
                                height={200} 
                                draggable={false} 
                                visible={this.isElementDisplay(element)}
                                showAnimation={true}
                                {...this.props}
                            />
                        case ElementType.AUDIO:
                            //console.log("element",element)
                            if(this.isElementDisplay(element)){
                                   element._elementSelf.play()
                            }else{
                                   element._elementSelf.pause()
                                  // console.log("pause")  
                            } 
                            return null;
                        default:
                            //TODO: remove
                            console.log("wrong!!!!!!!");
                            console.log(this.props.currentScene.elements());
                            console.log(element);
                            return;
                    }
                }.bind(this))}
            </Layer>
        )
    }
}
