import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import TimelineBar from './TimelineBar';
// import TrackHeader from './Track/TrackHeader';
import TrackGroup from './TrackGroup';
import ScrollBar from './ScrollBar';
import './trackeditor.css';

const infoWidth = 200;
const scrollScale = 2;

export default class TrackEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barActiveList: new Array(props.currentElements.length).fill(false),
            screenWidth: 0,
            screenX: 0,
        }
        this.setBarActive = this.setBarActive.bind(this);
        this.setBarUnactive = this.setBarUnactive.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onDragScrollbar = this.onDragScrollbar.bind(this);
    }

    setBarActive(index) {
        let barActiveList = new Array(this.props.currentElements.length).fill(false);
        barActiveList[index] = true;
        this.setState({
            barActiveList: barActiveList,
        })
    }

    setBarUnactive() {
        let barActiveList = new Array(this.props.currentElements.length).fill(false);
        this.setState({
            barActiveList: barActiveList
        });
    }

    onDragScrollbar = (screenX) => {
        this.setState({
            screenX: screenX
        })
    }

    onResize = (screenWidth) => {
        this.setState({
            screenWidth: screenWidth
        })
    }

    render() {
        return (
            <div 
                className="trackeditor"
                onMouseLeave={this.setBarUnactive}
            >
                <ReactResizeDetector handleWidth onResize={this.onResize} />
                <div style={{height: 24, width: this.state.screenWidth, position: 'absolute', zIndex: 1}}>
                    <TimelineBar 
                        setBarUnactive={this.setBarUnactive}
                        screenX={this.state.screenX}
                        screenWidth={(this.state.screenWidth - infoWidth)}
                        scrollScale={scrollScale}
                        scrollWidth={(this.state.screenWidth - infoWidth)*scrollScale}
                        {...this.props}
                    />
                </div>
                <div style={{marginTop: 24, height: 226, width: this.state.screenWidth, position: 'absolute', zIndex: 0}}>
                    <TrackGroup 
                        barActiveList={this.state.barActiveList} 
                        setBarActive={(index)=>this.setBarActive(index)}
                        setBarUnactive={this.setBarUnactive}
                        screenX={this.state.screenX}
                        screenWidth={(this.state.screenWidth - infoWidth)}
                        scrollScale={scrollScale}
                        scrollWidth={(this.state.screenWidth - infoWidth)*scrollScale}
                        {...this.props}
                    />
                    <ScrollBar 
                        screenX={this.state.screenX}
                        screenWidth={this.state.screenWidth - infoWidth}
                        scrollScale={scrollScale}
                        onDragScrollbar={this.onDragScrollbar}
                        {...this.props}
                    />
                </div>
                
                {/* <TrackHeader {...this.props}/> */}
                
            </div>
        )
    }
}
