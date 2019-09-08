import React, { Component } from 'react';
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

export default class AnimationBar extends Component {

    adjustAnimationDuration(x, duration, elementStart, elementDuration) {
        const newScene = Object.assign({},this.props.currentScene);
        const newElement = Object.assign({},this.props.element);
        newElement.start(elementStart);
        newElement.duration(elementDuration);
        var newAnimation = Object.assign({},this.props.animation);
        newAnimation.start(x);
        newAnimation.duration(duration);
        newElement.update(newAnimation, this.props.animationIndex);
        newScene.updateElement(newElement, this.props.index);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newElement, this.props.index, elementName);
    }
    
    render() {
        let {element, elementX, elementWidth, x, width} = this.props;
        var color = Color.LIGHT_ORANGE;
        switch (element.type()) {
            case ElementType.IMAGE:
                color = Color.ILLUSTRATION_BAR;
                break;
            case ElementType.CHART:
                color = Color.CHART_BAR;
                break;
            case ElementType.AUDIO:
                color = Color.AUDIO_BAR;
                break;
            case ElementType.TEXT:
                color = Color.TEXT_BAR;
                break;
        
            default:
                break;
        }
        var bar = <div 
            style={{marginLeft: x, height: 24, width: width ,backgroundColor: color}} 
            // onClick = {this.clickBar} 
            // onMouseOver = {this.clickBar}
            />
        return (
            <div 
                style={{padding: 6}}
            >
                <div id={"bar-container-"+this.props.element.id()} style={{height: 24, marginLeft: elementX, width: elementWidth, backgroundColor:'#fff'}}>
                    {bar}
                </div>
            </div>
        )
    }
}
