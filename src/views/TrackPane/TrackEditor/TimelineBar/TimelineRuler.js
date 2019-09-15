import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Needle from './Needle';
import './timelinebar.css';

const performingHeight = 228;
const realHeight = 24;
const trackHeight = 34;
const width = 12;
const offset = 6;

export default class TimelineRuler extends Component {

    constructor(props) {
        super(props);
        this.props.setPosition(0);
        // this.state = {
        //     isNeedleActive: false,
        // };
        this.clickNeedle = this.clickNeedle.bind(this);
        this.clickRuler = this.clickRuler.bind(this);
    }

    clickNeedle() {
        // this.setState({
        //     isNeedleActive: true,
        // })
    }

    clickRuler(e) {
        const clickPosition = e.nativeEvent.offsetX;
        var newX = clickPosition - offset;
        if (newX < 0) {
            newX = 0
        } else if ( newX > this.props.sceneWidth) {
            newX = this.props.sceneWidth;
        }
        const changedPosition = this.keepOneDecimalPoint(newX / this.props.sceneScale);
        this.props.setPosition(changedPosition);
        this.props.unselectElement();
    }

    changeNeedlePlace(x) {
        let changedPosition = this.keepOneDecimalPoint(x / this.props.sceneScale);
        if (changedPosition > this.props.currentScene.duration()) {
            changedPosition = this.props.currentScene.duration();
        }
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
        const n = (this.props.scrollWidth / step - 1) * 5;
        let rulings = [<div key={-1} style={{marginTop: 4, height: 6, width: 2, float: 'left', backgroundColor: 'gray'}}/>];
        for (let index = 0; index < n; index++) {
            if ((index+1) % 5 === 0) {
                rulings.push(
                    <div key={index} style={{height: 4, width: step / 5, float: 'left', backgroundColor: 'white'}}>
                        <div style={{height: 10, width: (step / 5) - 2, float: 'left', opacity: 0}}/>
                        <div style={{marginTop: 4, height: 6, width: 2, float: 'left', backgroundColor: 'gray'}}/>
                    </div>
                ) 
            } else {
                rulings.push(
                    <div key={index} style={{height: 4, width: step / 5, float: 'left', backgroundColor: 'white'}}>
                        <div style={{height: 2, width: (step / 5) - 2, float: 'left', opacity: 0}}/>
                        <div style={{marginTop: 8, height: 2, width: 2, float: 'left', backgroundColor: 'gray'}}/>
                    </div>
                ) 
            }
        }
        return rulings;
    }

    timeMarks() {
        var step = this.props.sceneScale;
        var gap = 10;
        if (this.props.sceneScale <= 10) {
            step = step * gap;
        }
        const n = this.props.scrollWidth / step - 1;
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
        const {scenePosition, isPerforming, sceneScale, currentElements} = this.props;
        const scenePositionWithScale = scenePosition * sceneScale;
        let height = isPerforming?performingHeight:realHeight;
        let needleHeight = currentElements.length * trackHeight;
        if (needleHeight > (performingHeight - realHeight)) {
            needleHeight = performingHeight - realHeight;
        }
        let needle = <Rnd
            style={{zIndex: 2}}
            size={{ width: width, height: height }}
            position={{ x: scenePositionWithScale, y: 0 }}
            bounds='parent'
            disableDragging={isPerforming}
            enableResizing={{}}
            enableUserSelectHack={false}
            onDrag={(e, d) => {
                this.changeNeedlePlace(d.x);
            }}
            onDragStop={(e, d) => {
                this.changeNeedlePlace(d.x);
            }}
        >
            <Needle needleHeight={needleHeight}/>
        </Rnd>;

        return (
            <div className='timeline-ruler'>
                <div 
                    id={"timeline-ruler"} 
                    style={{height: height, width: offset + this.props.screenWidth + offset, backgroundColor:'transparent', position:'relative', left: -this.props.screenX
                    }} 
                    
                >
                    <div style={{width: this.props.screenWidth, marginLeft: offset-1, marginTop: 4, marginRight: -offset, backgroundColor: 'transparent', position:'absolute', zIndex: 0}}>
                        <div style={{width: this.props.scrollWidth}}>
                            {this.timeMarks()}
                        </div>
                    </div>
                    <div style={{width: this.props.screenWidth, marginLeft: offset-1, marginTop: 14, backgroundColor: 'transparent', position:'absolute', zIndex: 0}}>
                        <div style={{width: this.props.scrollWidth}}>
                            {this.ruler()}
                        </div>
                    </div>
                    <div
                        id={'timeline-ruler-clickable-area'} 
                        style={{height: height, width: offset + this.props.scrollWidth + offset, position:'absolute', zIndex: 1, opacity: 0}}
                        onClick={isPerforming?null:e=>this.clickRuler(e)}
                    />
                    {needle}
                </div>
                {/* <div 
                    id={"timeline-ruler"} 
                    style={{height: height+100, width: offset + this.props.screenWidth + offset, opacity: 0, position:'relative', left: -this.props.screenX
                    }} 
                >
                    {needle}
                </div> */}
            </div>
        )
    }
}
