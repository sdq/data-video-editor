import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

const y = 0;
const height = 24

export default class TrackBar extends Component {

    constructor(props) {
        super(props);
        this.clickBar = this.clickBar.bind(this);
        this.leaveBar = this.leaveBar.bind(this);
        this.dragBar = this.dragBar.bind(this);
        this.resizeBar = this.resizeBar.bind(this);
    }

    clickBar() {
        this.props.clickBar();
    }

    leaveBar() {
        this.props.leaveBar();
    }

    dragBar(x) {
        const newX = x / this.props.sceneScale;
        this.adjustElementDuration(newX, this.props.element.duration(), this.props.currentScene.duration());
    }

    resizeBar(x, width) {
        const newX = x / this.props.sceneScale;
        const duration = width / this.props.sceneScale;
        this.adjustElementDuration(newX, duration, this.props.currentScene.duration());
    }

    adjustElementDuration(x, duration, sceneDuration) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.duration(sceneDuration);
        var newEle = Object.assign({},this.props.element);
        newEle.start(x);
        newEle.duration(duration);
        newScene.updateElement(newEle, this.props.index);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newEle, this.props.index, elementName);
    }

    render() {
        let {element, isBarActive, isPerforming} = this.props;
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
        var bar;
        if (isBarActive && !isPerforming) {
            bar = <Rnd
                id={"bar-"+this.props.element.id()}
                style={{backgroundColor: color}}
                size={{ width: this.props.width, height: height }}
                position={{ x: this.props.x, y: y }}
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
            bar = <div style={{marginLeft: this.props.x, height: 24, width: this.props.width ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>
        }
        return (
            <div 
                style={{padding: 6}}
            >
                <div id={"bar-container-"+this.props.element.id()} style={{height: 24, width: this.props.sceneWidth, backgroundColor:'#fff'}}>
                    {bar}
                </div>
            </div>
        )
    }
}
