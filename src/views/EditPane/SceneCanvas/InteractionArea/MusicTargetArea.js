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

class MusicTargetArea extends Component {
    render() {
        console.log("music")
        const { canDrop, isOver, connectDropTarget } = this.props;
        // const canvasW = 800*(this.props.contentHeight-100)/450;
        // const canvasH = this.props.contentHeight-100;
        const canvasW = 300;
        const canvasH = 300;
        const isActive = canDrop && isOver;
        let backgroundColor = '#fff';
        if (isActive) {
			backgroundColor = Color.ORANGE;
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
	[DNDType.DND_AUDIO],
	canvasTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(MusicTargetArea);