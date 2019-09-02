import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import Animation from '@/models/Animation';
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
            const newScene = Object.assign({},dropResult.currentScene);
            const newEle = Object.assign({},dropResult.currentElement);
            const animation = new Animation(item.type, item.name);
            newEle.add(animation);
            newScene.updateElement(newEle, dropResult.elementIndex);
            props.updateScene(dropResult.sceneIndex, newScene);
            const elementName = dropResult.sceneIndex + '-' + dropResult.elementIndex;
            props.updateElement(newEle, dropResult.elementIndex, elementName);
		}
    },
}

class AnimationCard extends Component {
    render() {
        const { connectDragSource, animation } = this.props;
        return connectDragSource(
            <div className='animationcard'>
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
