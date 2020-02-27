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
        const windowinnerWidth =window.innerWidth;


        //当宽高同时变化，按照最小的scale缩放
        const canvasW = this.props.contentWidth;
        const canvasH = this.props.contentHeight-100;
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        //const scale = scaleX>scaleY?scaleY:scaleX;
        //获取现在画布的真实大小
        var fakeWidth = 0;
        var fakeHeight = 0;
        if(scaleX>scaleY){
            fakeWidth = 800*canvasH/450;
            fakeHeight = canvasH;
        }else {
            fakeWidth = canvasW;
            fakeHeight = canvasW*450/800;
        }

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
                position:"absolute",
                zIndex:6,
                backgroundColor: backgroundColor, 
                opacity: 0.4, 
                height: 50, 
                width: canvasW,
                marginLeft:-(windowinnerWidth-fakeWidth-660)/2,
                marginTop:fakeHeight+(canvasH-fakeHeight)/2,
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