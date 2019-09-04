import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Needle from './Needle';
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
            sceneWidth: props.currentScene.duration() * props.sceneScale,
        };
        this.clickNeedle = this.clickNeedle.bind(this);
        this.clickRuler = this.clickRuler.bind(this);
    }

    componentWillReceiveProps(props) {
        const sceneDuration = props.currentScene.duration();
        const sceneWidth = sceneDuration * props.sceneScale;
        if (sceneWidth < props.scenePosition) {
            props.setPosition(0);
        }
        this.setState({
            sceneWidth: sceneWidth,
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
        const changedPosition = this.keepOneDecimalPoint(newX / this.props.sceneScale);
        console.log(changedPosition);
        this.props.setPosition(changedPosition);
        this.props.unselectElement();
    }

    changeNeedlePlace(x) {
        const changedPosition = this.keepOneDecimalPoint(x / this.props.sceneScale);
        this.props.setPosition(changedPosition);
        this.props.unselectElement();
    }

    keepOneDecimalPoint(x) {
        return Math.floor(x * 10) / 10;
    }

    ruler() {
        var step = this.props.sceneScale;
        var gap = 10;
        if (this.props.sceneScale <= 10) {
            step = step * gap;
        }
        const n = (this.state.sceneWidth / step) * 5 - 1;
        let rulings = [<div key={-1} style={{height: 2, width: 2, float: 'left', backgroundColor: 'black'}}/>];
        for (let index = 0; index < n; index++) {
            rulings.push(
                <div key={index} style={{height: 2, width: step / 5, float: 'left', backgroundColor: 'white'}}>
                    <div style={{height: 2, width: (step / 5) - 2, float: 'left', opacity: 0}}/>
                    <div style={{height: 2, width: 2, float: 'left', backgroundColor: 'black'}}/>
                </div>
            ) 
        }
        return rulings;
    }

    timeMarks() {
        var step = this.props.sceneScale;
        var gap = 10;
        if (this.props.sceneScale <= 10) {
            step = step * gap;
        }
        const n = this.state.sceneWidth / step;
        let timeMarks = [<div key={0} style={{height: 2, width: step, float: 'left', backgroundColor: 'transparent'}}>
            <div style={{height: 2, width: step - 2, float: 'left', opacity: 0}}/>
            <p style={{marginTop: -5, marginLeft: -6, float: 'left', fontSize: '10px'}}>0s</p>
        </div>];
        for (let index = 1; index < n; index++) {
            timeMarks.push(
                <div key={index} style={{height: 2, width: step, float: 'left', backgroundColor: 'transparent'}}>
                    <div style={{height: 2, width: step - 2, float: 'left', opacity: 0}}/>
                    <p style={{marginTop: -5, marginLeft: -10, float: 'left', fontSize: '10px'}}>{index * gap}s</p>
                </div>
            )
        }
        return timeMarks;
    }

    render() {
        const {scenePosition, isPerforming, sceneScale} = this.props;
        var needle;
        const scenePositionWithScale = scenePosition * sceneScale;
        if (this.state.isNeedleActive) {
            needle = <Rnd
                style={{zIndex: 2}}
                size={{ width: width, height: height }}
                position={{ x: scenePositionWithScale, y: 0 }}
                bounds='parent'
                disableDragging={isPerforming}
                enableResizing={{}}
                enableUserSelectHack={false}
                onDragStop={(e, d) => {
                    console.log('drag end');
                    this.changeNeedlePlace(d.x);
                }}
            >
                <Needle/>
            </Rnd>
        } else {
            needle = <div style={{marginLeft: scenePositionWithScale, height: height, width: width, position:'absolute', zIndex: 2}} onClick = {this.clickNeedle} onMouseOver = {this.clickNeedle}>
                <Needle/>
            </div>
        }

        return (
            <div className='timeline-ruler'>
                <div 
                    id={"timeline-ruler"} 
                    style={{height: height, width: offset + this.state.sceneWidth + offset, backgroundColor:'#fff'}} 
                    
                >
                    <div style={{marginLeft: offset-1, marginTop: 2, backgroundColor: 'transparent', position:'absolute', zIndex: 0}}>
                        {this.timeMarks()}
                    </div>
                    <div style={{marginLeft: offset-1, marginTop: 16, backgroundColor: 'transparent', position:'absolute', zIndex: 0}}>
                        {this.ruler()}
                    </div>
                    <div
                        id={'timeline-ruler-clickable-area'} 
                        style={{height: height, width: offset + this.state.sceneWidth + offset, position:'absolute', zIndex: 1, opacity: 0}}
                        onClick={isPerforming?null:e=>this.clickRuler(e)}
                    />
                    {needle}
                </div>
            </div>
        )
    }
}
