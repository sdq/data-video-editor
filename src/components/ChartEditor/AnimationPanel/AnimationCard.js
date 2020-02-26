import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ChartAnimationTask from '@/charts/D3/ChartAnimationTask';

const boxSource = {

	beginDrag(props) {
		props.chooseChartAnimation(props.animation);
		return {
			animation: props.animation,
		}
	},
	endDrag(props, monitor) {
		// const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
			//props.addChartAnimation(item.animation);
			props.addChartAnimation(props.choosenAnimation);
		}
	},
}

class AnimationCard extends Component {
	render() {
		const { connectDragSource, animation } = this.props;
		let color = '#FFFFFF';
		switch (animation.task) {
			case ChartAnimationTask.TEMPORAL:
				color = '#66c2a5';
				break;
			case ChartAnimationTask.COMPARE:
				color = '#fc8d62';
				break;
			case ChartAnimationTask.EMPHASIZE:
				color = '#8da0cb';
				break;

			case ChartAnimationTask.GRANULARITY:
				color = '#e78ac3';
				break;
			case ChartAnimationTask.CAUSAL:
				color = '#a6d854';
				break;
			case ChartAnimationTask.STYLE:
				color = '#ffd92f';
				break;
			default:
				break;
		}
		color += '3C';
		return connectDragSource(
			<div className={"animation-card"} style={{ backgroundColor: color }}>
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
