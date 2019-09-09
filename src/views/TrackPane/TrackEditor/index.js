import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import TimelineBar from './TimelineBar';
// import TrackHeader from './Track/TrackHeader';
import TrackGroup from './TrackGroup';
import './trackeditor.css';

const infoWidth = 200;

export default class TrackEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barActiveList: new Array(props.currentElements.length).fill(false),
            screenWidth: 0,
        }
        this.setBarActive = this.setBarActive.bind(this);
        this.setBarUnactive = this.setBarUnactive.bind(this);
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
                <TimelineBar 
                    setBarUnactive={this.setBarUnactive}
                    screenWidth={this.state.screenWidth - infoWidth}
                    {...this.props}
                />
                {/* <TrackHeader {...this.props}/> */}
                <TrackGroup 
                    barActiveList={this.state.barActiveList} 
                    setBarActive={(index)=>this.setBarActive(index)}
                    setBarUnactive={this.setBarUnactive}
                    screenWidth={this.state.screenWidth - infoWidth}
                    {...this.props}
                />
            </div>
        )
    }
}
