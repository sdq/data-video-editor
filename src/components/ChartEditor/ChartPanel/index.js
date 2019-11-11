import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ChartContainer from '@/charts/ChartContainer';
import Color from '@/constants/Color';
import './chartpanel.css';

const animationTarget = {
	drop: () => ({ 
        target: "animation",
    })
}

class ChartPanel extends Component {

    render() {
        const { canDrop, isOver, connectDropTarget, currentVis } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = 'white';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_BLUE;
        }
        return connectDropTarget(
            <div style={{textAlign: 'center', backgroundColor: backgroundColor}}>
                <ChartContainer 
                    category={"D3"}
                    type={currentVis.type}
                    data={this.props.data}
                    spec={this.props.spec}
                    width={600} 
                    height={600}
                    current={this.props.scenePosition}
                    onCanvas={false} 
                    showAnimation={this.props.showAnimation}
                />
            </div>
        )
    }
}

export default DropTarget(
	DNDType.DND_CHART_ANIMATION,
	animationTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(ChartPanel);
