import React, { Component } from 'react';
import ChartAnimationTask from '@/charts/D3/ChartAnimationTask';

export default class AnimationStep extends Component {

    render() {
        const { animation } = this.props;
        let color = 'FFFFFF';
        let taskIcon = '';
        switch (animation.task) {
            case ChartAnimationTask.TEMPORAL:
                color = '#66c2a5';
                taskIcon = 'T';
                break;
            case ChartAnimationTask.COMPARE:
                color = '#fc8d62';
                taskIcon = 'C';
                break;
            case ChartAnimationTask.EMPHASIZE:
                color = '#8da0cb';
                taskIcon = 'E';
                break;
            case ChartAnimationTask.GRANULARITY:
                color = '#e78ac3';
                taskIcon = 'G'; 
                break;
            case ChartAnimationTask.CAUSAL:
                color = '#a6d854';
                taskIcon = 'C'; 
                break;
            case ChartAnimationTask.STYLE:
                color = '#ffd92f';
                taskIcon = 'S';
                break;
            default:
                break;
        }
        let description = animation.description;
        return (
            <div className={'animation-step'}>
                <div style={{ float: 'left', display: 'inline-block', width: 36, height: 34, backgroundColor: color, padding: 5 }}>
                    <h3 style={{ color: 'white', paddingLeft: 8 }}>{taskIcon}</h3>
                </div>
                <div style={{ float: 'left', marginLeft: 'inline-block', width: 312, height: 35, backgroundColor: color + '3C', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: 6 }}>
                    {description}
                </div>
            </div>
        )
    }
}
