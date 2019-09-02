import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import './animationcard.css';

const animationSource = {

	beginDrag(props) {
        // console.log(props.animation);
        // return props.animation.name();
        props.displayAnimationTargetArea(true);
        return {
            type: props.animation.type(),
            name: props.animation.name(),
        }
	},

	endDrag(props, monitor) {
        props.displayAnimationTargetArea(false);
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            console.log(item);
            console.log(dropResult);
            // TODO: drop
		}
    },
}

class AnimationCard extends Component {
    render() {
        const { connectDragSource, animation } = this.props;
        return connectDragSource(
            <div>
                {animation.name()}
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_ANIMATION,
    animationSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(AnimationCard)
