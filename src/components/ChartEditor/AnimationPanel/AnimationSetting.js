import React, { Component } from 'react';
import animationSetting from '@/charts/D3/animationSetting';
import ChartAnimationTask from '@/charts/D3/ChartAnimationTask';

export default class AnimationSetting extends Component {
    render() {
        const {currentVis, animation, index} = this.props;
        let color = 'FFFFFF';
        let taskIcon = '';
		switch (animation.task) {
			case ChartAnimationTask.TENDENCY:
                color = '#0091FF';
                taskIcon = 'T';
				break;
			case ChartAnimationTask.EMPHASIZE:
                color = '#6DD400';
                taskIcon = 'E';
				break;
			case ChartAnimationTask.COMPARISON:
                color = '#F7B500';
                taskIcon = 'C';
				break;
			case ChartAnimationTask.RECONFIGURATION:
                color = '#FA6400';
                taskIcon = 'R';
				break;		
			default:
				break;
        }
        let description = animation.description;
        return (
            <div style={{width: 380, height: 500, marginLeft: 12, backgroundColor: color+'1C'}}>
                <div className={'animation-step'} style={{width: 380, marginLeft: 0}} onClick={() => this.props.unselectAnimation()}>
                    <div style={{float: 'left', display: 'inline-block', width: 36, height: 34, backgroundColor: color, padding: 5}}>
                        <h3 style={{color:'white', paddingLeft:8}}>{taskIcon}</h3>
                    </div>
                    <div style={{float: 'left', marginLeft: 'inline-block', width: 342, height: 35, backgroundColor: color+'3C', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', padding: 6}}>
                        {description}
                    </div>
                </div>
                <div style={{height: 464, padding: 8, overflowY: 'auto'}}>
                    {animationSetting(currentVis.type, animation, index, this.props)}
                </div>
            </div>
        )
    }
}
