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
        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        const scale = scaleX>scaleY?scaleY:scaleX;

        let backgroundColor = 'white';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_BLUE;
        }
        const  rotation = currentElement?currentElement.info().rotation:0;
        //Gridline、Assistline、interaction使用的不是konva图层，需要将x y w h 在显示前转换成普通canvas系统
        return connectDropTarget(
            <div
                style={{
                    position: 'absolute',
                    top: currentElement.info().y*scale,
                    left: currentElement.info().x*scale,
                    width: currentElement.info().width*scale,
                    height: currentElement.info().height*scale,
                    transformOrigin:"left top",
                    transform:"rotate("+rotation+"deg)",
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
