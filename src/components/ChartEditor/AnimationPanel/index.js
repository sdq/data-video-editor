import React, { Component } from 'react';
import AnimationList from './AnimationList';
import AnimationPlan from './AnimationPlan';
import './animationpanel.css';

export default class AnimationPanel extends Component {
    render() {
        return (
            <div>
                <AnimationList {...this.props}/>
                <AnimationPlan {...this.props}/>
                {/* <div className={'animation-list-container'} style={{backgroundColor: 'yellow'}}>
                    <AnimationList />
                </div>
                <div className={'animation-plan-container'} style={{backgroundColor: 'red'}}>
                    <AnimationPlan />
                </div> */}
            </div>
        )
    }
}
