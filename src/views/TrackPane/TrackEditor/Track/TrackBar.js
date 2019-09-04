import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

const y = 0;
const height = 24

export default class TrackBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sceneWidth: props.currentScene.duration() * props.sceneScale,
            width: props.element.sduration() * props.sceneScale,
            x: props.element.sstart() * this.props.sceneScale,
        };
        this.clickBar = this.clickBar.bind(this);
        this.leaveBar = this.leaveBar.bind(this);
        this.dragBar = this.dragBar.bind(this);
        this.resizeBar = this.resizeBar.bind(this);
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
            sceneWidth: sceneWidth,
            width: newWidth,
            x: newX,
        })
    }

    clickBar() {
        this.props.clickBar();
    }

    leaveBar() {
        this.props.leaveBar();
    }

    dragBar(x) {
        const newX = x / this.props.sceneScale;
        this.updateElement(newX, this.props.element.sduration(), this.props.currentScene.duration());
        this.setState({ x: x });
    }

    resizeBar(x, width) {
        const newX = x / this.props.sceneScale;
        const duration = width / this.props.sceneScale;
        this.updateElement(newX, duration, this.props.currentScene.duration());
        this.setState({
            x: x,
            width: width,
        });
    }

    updateElement(x, duration, sceneDuration) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.duration(sceneDuration);
        var newEle = Object.assign({},this.props.element);
        newEle.sstart(x);
        newEle.sduration(duration);
        newScene.updateElement(newEle, this.props.index);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newEle, this.props.index, elementName);
    }

    render() {
        let {element, isBarActive, isPerforming, showAnimations} = this.props;
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
        if (isBarActive && !isPerforming && !showAnimations) {
            bar = <Rnd
                id={"bar-"+this.props.element.id()}
                style={{backgroundColor: color}}
                size={{ width: this.state.width, height: height }}
                position={{ x: this.state.x, y: y }}
                bounds='parent'
                enableResizing={{
                    left: true,
                    right: true
                }}
                enableUserSelectHack={false}
                onDragStop={(e, d) => {
                    //this.setState({ x: d.x });
                    this.dragBar(d.x);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    // this.setState({
                    //     x: position.x,
                    //     width: parseInt(ref.style.width),
                    // });
                    this.resizeBar(position.x, parseFloat(ref.style.width));
                }}
            />
        } else {
            bar = <div style={{marginLeft: this.state.x, height: 24, width: this.state.width ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>
        }
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
