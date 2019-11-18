import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ChartAnimationTask from '@/charts/D3/ChartAnimationTask';

const boxSource = {

	beginDrag(props) {
		return {
			animation: props.animation,
		}
	},
	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (dropResult) {
			props.addChartAnimation(item.animation);
		}
	},
}

class AnimationCard extends Component {
    render() {
		const { connectDragSource, animation } = this.props;
		let color = '#FFFFFF';
		switch (animation.task) {
			case ChartAnimationTask.TENDENCY:
				color = '#0091FF';
				break;
			case ChartAnimationTask.EMPHASIZE:
				color = '#6DD400';
				break;
			case ChartAnimationTask.COMPARISON:
				color = '#F7B500';
				break;
			case ChartAnimationTask.RECONFIGURATION:
				color = '#FA6400';
				break;		
			default:
				break;
		}
		color += '3C';
        return connectDragSource(
            <div className={"animation-card"} style={{backgroundColor: color}}>
                {animation.title}
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_CHART_ANIMATION,
    boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(AnimationCard)
