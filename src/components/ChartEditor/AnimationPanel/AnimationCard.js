import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';

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
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className={"animation-card"}>
                {this.props.animation.type}
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
