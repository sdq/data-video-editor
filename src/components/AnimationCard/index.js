import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import Animation from '@/animation/AnimationModel';
import AnimationType from '@/animation/AnimationType';
import './animationcard.css';

const animationSource = {

	beginDrag(props) {
        // console.log(props.animation);
        // return props.animation.name();
        props.displayAnimationTargetArea(true);
        switch (props.animation.type()) {
        case AnimationType.INTERPRETATION_PATH:     
        return  {
            type: props.animation.type(),
            name: props.animation.name(),
            pathinfo: props.animation.pathinfo(),
        }
        default:
            return {
                type: props.animation.type(),
                name: props.animation.name(),
            }
}
	},

	endDrag(props, monitor) {
        props.displayAnimationTargetArea(false);
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            const newScene = Object.assign({},dropResult.currentScene);
            const newEle = Object.assign({},dropResult.currentElement);
            if(item.type===AnimationType.INTERPRETATION_PATH){
                //if path 
                props.displayPathLayer(true);//redux管理（而不是state），保证动画拖拽及时显示path层
                const animation = new Animation(item.type, item.name, item.pathinfo);
                newEle.add(animation);
            }else{
                const animation = new Animation(item.type, item.name);
                newEle.add(animation);
            }
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
