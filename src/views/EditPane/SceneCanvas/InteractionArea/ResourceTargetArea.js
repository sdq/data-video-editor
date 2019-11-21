import React, { Component } from 'react';
import Color from '@/constants/Color';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';

const canvasTarget = {
	drop: (props) => ({ 
        target: "canvas",
        sceneIndex: props.sceneIndex,
        currentScene: props.currentScene
    })
}

class ResourceTargetArea extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const canvasW = 800*(this.props.contentHeight-100)/450;
        const canvasH = this.props.contentHeight-100;
        const isActive = canDrop && isOver;
        let backgroundColor = '#fff';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_BLUE;
        }
        return connectDropTarget(
            <div style={{ backgroundColor: backgroundColor, opacity: 0.4, height: canvasH, width: canvasW }}/>
        )
    }
}

export default DropTarget(
	[DNDType.DND_IMAGE, DNDType.DND_CHART, DNDType.DND_AUDIO, DNDType.DND_GIF, DNDType.DND_VIDEO],
	canvasTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(ResourceTargetArea);