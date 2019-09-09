import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

const y = 0;
const height = 24;

export default class AnimationBar extends Component {

    constructor(props) {
        super(props);
        this.clickBar = this.clickBar.bind(this);
        this.leaveBar = this.leaveBar.bind(this);
        this.dragBar = this.dragBar.bind(this);
        this.resizeBar = this.resizeBar.bind(this);
    }

    clickBar() {
        this.props.setAnimationBarActive(this.props.animationIndex);
    }

    leaveBar() {
        this.props.setAnimationBarUnactive();
    }

    dragBar(x) {
        const newX = x / this.props.sceneScale;
        this.adjustAnimationDuration(newX, this.props.animation.duration(), this.props.element.start(), this.props.element.duration());
    }

    resizeBar(x, width) {
        const newX = x / this.props.sceneScale;
        const duration = width / this.props.sceneScale;
        this.adjustAnimationDuration(newX, duration, this.props.element.start(), this.props.element.duration());
    }

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
        let {element, elementX, elementWidth, x, width, isPerforming, isAnimationBarActive} = this.props;
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
        // var bar = <div 
        //     style={{marginLeft: x, height: 24, width: width ,backgroundColor: color}} 
        //     // onClick = {this.clickBar} 
        //     // onMouseOver = {this.clickBar}
        //     />

        var bar;
        if (isAnimationBarActive && !isPerforming) {
            bar = <Rnd
                style={{backgroundColor: color}}
                size={{ width: width, height: height }}
                position={{ x: x, y: y }}
                bounds='parent'
                enableResizing={{
                    left: true,
                    right: true
                }}
                enableUserSelectHack={false}
                onDragStop={(e, d) => {
                    this.dragBar(d.x);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.resizeBar(position.x, parseFloat(ref.style.width));
                }}
            />
        } else {
            bar = <div 
            style={{marginLeft: x, height: 24, width: width ,backgroundColor: color}} 
            onClick = {this.clickBar} 
            onMouseOver = {this.clickBar}
            />
        }
        return (
            <div 
                style={{padding: 6}}
            >
                <div id={"bar-container-"+this.props.element.id()} style={{height: 24, marginLeft: elementX, width: elementWidth, backgroundColor:'#fff'}} onMouseLeave={this.leaveBar}>
                    {bar}
                </div>
            </div>
        )
    }
}
