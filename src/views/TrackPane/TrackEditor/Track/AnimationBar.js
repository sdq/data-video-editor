import React, { Component } from 'react';
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

export default class AnimationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sceneWidth: props.currentScene.duration() * props.sceneScale,
            width: props.element.sduration(),
            x: props.element.sstart(),
        };
    }

    componentWillReceiveProps(props) {
        const sceneDuration = props.currentScene.duration();
        const sceneWidth = sceneDuration * props.sceneScale;
        var newWidth = this.state.width;
        var newX = this.state.x;
        if (sceneWidth < this.state.x) {
            newWidth = sceneWidth;
            newX = 0;
            this.updateElement(newX, newWidth, sceneDuration);
        } else if (sceneWidth < this.state.x + this.state.width) {
            newWidth = sceneWidth - newX;
            this.updateElement(this.state.x, newWidth, sceneDuration);
        }
        this.setState({
            sceneWidth: sceneDuration,
            width: newWidth,
            x: newX,
        })
    }
    
    render() {
        let {element} = this.props;
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
        var bar = <div style={{marginLeft: this.state.x, height: 24, width: this.state.width ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>
        return (
            <div 
                style={{padding: 6}}
            >
                <div id={"bar-container-"+this.props.element.id()} style={{height: 24, width: this.state.sceneWidth, backgroundColor:'#fff'}}>
                    {bar}
                </div>
            </div>
        )
    }
}
