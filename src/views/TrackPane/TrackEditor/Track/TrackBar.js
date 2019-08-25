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
            sceneWidth: props.currentScene.duration(),
            width: props.currentScene.duration(),
            x: 0,
        };
        this.clickBar = this.clickBar.bind(this);
    }

    componentWillReceiveProps(props) {
        const sceneDuration = props.currentScene.duration();
        const sceneWidth = sceneDuration
        var newWidth = this.state.width;
        var newX = this.state.x;
        if (sceneWidth < this.state.x) {
            newWidth = sceneWidth;
            newX = 0;
        } else if (sceneWidth < this.state.x + this.state.width) {
            newWidth = sceneWidth - newX;
        }
        this.setState({
            sceneWidth: sceneDuration,
            width: newWidth,
            x: newX,
        })
    }

    clickBar() {
        this.props.clickBar();
    }

    render() {
        let {element, isBarActive} = this.props;
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
        if (isBarActive) {
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
                    this.setState({ x: d.x });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.setState({
                        x: position.x,
                        width: parseInt(ref.style.width),
                    });
                }}
            />
        } else {
            bar = <div style={{marginLeft: this.state.x, height: 24, width: this.state.width ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>
        }
        return (
            <div style={{padding: 6}}>
                <div id={"bar-container-"+this.props.element.id()} style={{height: 24, width: this.state.sceneWidth, backgroundColor:'#fff'}}>
                    {bar}
                </div>
            </div>
        )
    }
}
