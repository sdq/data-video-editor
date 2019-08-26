import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import './timelinebar.css';

const height = 34;
const width = 12;
const offset = 6;

export default class TimelineRuler extends Component {

    constructor(props) {
        super(props);
        this.props.setPosition(0);
        this.state = {
            isNeedleActive: false,
            sceneWidth: props.currentScene.duration(),
            x: 0,
        };
        this.clickNeedle = this.clickNeedle.bind(this);
        this.clickRuler = this.clickRuler.bind(this);
    }

    componentWillReceiveProps(props) {
        const sceneDuration = props.currentScene.duration();
        const sceneWidth = sceneDuration
        var newX = this.state.x;
        if (sceneWidth < this.state.x) {
            newX = 0;
        }
        this.setState({
            sceneWidth: sceneDuration,
            x: newX,
        })
    }

    clickNeedle() {
        this.setState({
            isNeedleActive: true,
        })
    }

    clickRuler(e) {
        const clickPosition = e.nativeEvent.offsetX;
        var newX = clickPosition - offset;
        if (newX < 0) {
            newX = 0
        } else if ( newX > this.state.sceneWidth) {
            newX = this.state.sceneWidth;
        }
        this.setState({
            x: newX
        })
    }

    changeNeedlePlace(x) {
        this.props.setPosition(x);
        this.setState({
            x: x
        })
    }

    render() {

        var needle;
        if (this.state.isNeedleActive) {
            needle = <Rnd
                style={{zIndex: 2}}
                size={{ width: width, height: height }}
                position={{ x: this.state.x, y: 0 }}
                bounds='parent'
                enableResizing={{}}
                enableUserSelectHack={false}
                onDragStop={(e, d) => {
                    this.changeNeedlePlace(d.x);
                }}
            >
                <div style={{width: 12, height: 18}}/>
                <div style={{width: 12, height: 10,backgroundColor: 'black'}}/>
                <div id='triangle-down'/>
                <div style={{width: 2, height: 214,backgroundColor: 'black', marginLeft: 5}}/>
            </Rnd>
        } else {
            needle = <div style={{marginLeft: this.state.x, height: height, width: width}} onClick = {this.clickNeedle} onMouseOver = {this.clickNeedle}>
                <div style={{width: 12, height: 18}}/>
                <div style={{width: 12, height: 10,backgroundColor: 'black'}}/>
                <div id='triangle-down'/>
                <div style={{width: 2, height: 216,backgroundColor: 'black', marginLeft: 5, zIndex: 2}}/>
            </div>
        }

        return (
            <div className='timeline-ruler'>
                <div 
                    id={"timeline-ruler"} 
                    style={{height: height, width: offset + this.state.sceneWidth + offset, backgroundColor:'#fff'}} 
                    // onClick={e=>this.clickRuler(e)}
                >
                    {needle}
                </div>
            </div>
        )
    }
}
