import React, { Component } from 'react';
import AnimationList from './AnimationList';
import AnimationPlan from './AnimationPlan';

export default class AnimationPanel extends Component {
    render() {
        return (
            <div>
                <div style={{height: 250, backgroundColor: 'yellow'}}>
                    <AnimationList />
                </div>
                <div style={{height: 250, backgroundColor: 'red'}}>
                    <AnimationPlan />
                </div>
            </div>
        )
    }
}
