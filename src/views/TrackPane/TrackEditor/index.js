import React, { Component } from 'react';
import TimelineBar from './TimelineBar';
import TrackHeader from './Track/TrackHeader';
import TrackGroup from './TrackGroup';
import './trackeditor.css';

export default class TrackEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barActiveList: new Array(props.currentElements.length).fill(false)
        }
        this.setBarActive = this.setBarActive.bind(this);
        this.setBarUnactive = this.setBarUnactive.bind(this);
    }

    setBarActive(index) {
        let barActiveList = new Array(this.props.currentElements.length).fill(false);
        barActiveList[index] = true;
        this.setState({
            barActiveList: barActiveList
        })
    }

    setBarUnactive() {
        let barActiveList = new Array(this.props.currentElements.length).fill(false);
        this.setState({
            barActiveList: barActiveList
        })
    }

    render() {
        return (
            <div 
                className="trackeditor"
                onMouseLeave={this.setBarUnactive}
            >
                <TimelineBar 
                    setBarUnactive={this.setBarUnactive}
                    {...this.props}
                />
                <TrackHeader {...this.props}/>
                <TrackGroup 
                    barActiveList={this.state.barActiveList} 
                    setBarActive={(index)=>this.setBarActive(index)}
                    setBarUnactive={this.setBarUnactive}
                    {...this.props}
                />
            </div>
        )
    }
}
