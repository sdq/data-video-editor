import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';
import _ from 'lodash';

export default class TrackBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 24,
            x: 0,
            y: 0,
        };
        this.clickBar = this.clickBar.bind(this);
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
                ref={c => { this.rnd = c; }}
                style={{backgroundColor: color}}
                size={{ width: this.state.width, height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                bounds='parent'
                enableResizing={{
                    left: true,
                    right: true
                }}
                enableUserSelectHack={false}
                onDragStop={(e, d) => {
                    console.log(d);
                    this.setState({ x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    console.log(delta);
                    console.log(position);
                    this.setState({
                        x: position.x,
                        y: 0,
                        width: ref.style.width,
                        height: ref.style.height,
                    });
                }}
            />
        } else {
            bar = <div style={{marginLeft: this.state.x, height: 24, width: this.state.width ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>
        }
        return (
            <div style={{padding: 6}}>
                <div id={"bar-container-"+this.props.element.id()} style={{height: 24, width: 900}}>
                    {bar}
                </div>
            </div>
        )
    }
}
