import React, { Component } from 'react';
import Color from '@/constants/Color';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';

const animationTarget = {
	drop: (props) => ({ 
        target: "animation",
        sceneIndex: props.sceneIndex,
        currentScene: props.currentScene,
        elementIndex: props.elementIndex,
        currentElement: props.currentElement,
    })
}

class AnimationTargetArea extends Component {

    render() {
        const { canDrop, isOver, connectDropTarget, currentElement } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = 'white';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_BLUE;
        }
        return connectDropTarget(
            <div
                style={{
                    position: 'absolute',
                    top: currentElement.info().y,
                    left: currentElement.info().x,
                    width: currentElement.info().width,
                    height: currentElement.info().height,
                    backgroundColor: backgroundColor,
                    opacity: 0.5,
                }}
            />
        )
    }
}

export default DropTarget(
	DNDType.DND_ANIMATION,
	animationTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(AnimationTargetArea);
