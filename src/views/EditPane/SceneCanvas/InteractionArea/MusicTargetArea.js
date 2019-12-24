import React, { Component } from 'react';
import Color from '@/constants/Color';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';

const musicTarget = {
	drop: (props) => ({ 
        target: "music",
        sceneIndex: 1,
        // currentScene: props.currentScene
    })
}

class MusicTargetArea extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const canvasW = 800*(this.props.contentHeight-100)/450;
        //const canvasH = this.props.contentHeight-100;
        const windowinnerWidth =window.innerWidth;
        const isActive = canDrop && isOver;
        let backgroundColor = '#fff';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.DEEP_GRAY;
        }
        return connectDropTarget(
            <div style={{ 
                backgroundColor: backgroundColor, 
                opacity: 0.4, 
                height: 50, 
                width: windowinnerWidth,
                marginLeft:-(windowinnerWidth-canvasW-660)/2,
                border:"dotted 2px black",
                }}>
                    {/* <p>music here</p> */}
            </div>
        )
    }
}

export default DropTarget(
	[DNDType.DND_AUDIO],
	musicTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(MusicTargetArea);