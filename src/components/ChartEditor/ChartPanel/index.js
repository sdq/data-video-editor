import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ChartContainer from '@/charts/ChartContainer';
import Color from '@/constants/Color';
import './chartpanel.css';

const animationTarget = {
    hover(props,monitor,component) {
        //console.log(monitor.getClientOffset());
        component.setState({
            pointx: monitor.getClientOffset().x-findDOMNode(component).getBoundingClientRect().left,
            pointy: monitor.getClientOffset().y-findDOMNode(component).getBoundingClientRect().top,
        })
    },
	drop: (props) => ({ 
        target: "animation",
        sceneIndex: props.sceneIndex,
        currentScene: props.currentScene,
        elementIndex: props.elementIndex,
        currentElement: props.currentElement,
    })
}

class ChartPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pointx: 0,
            pointy: 0,
        }
    }

    render() {
        const { canDrop, isOver, connectDropTarget, chartInfo, choosenAnimation, chooseChartAnimation, selectedAnimation, selectedAnimationIndex, isSelectingChartElement, selectingParameter, selectChartElement, modifyChartAnimation } = this.props;
        const { pointx, pointy } = this.state;
        
        // const width=this.props.currentElement.info().width;
        // const height=this.props.currentElement.info().height;

        // console.log(width,height)

        const isActive = canDrop && isOver;
        let backgroundColor = 'white';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_BLUE;
        }
        return connectDropTarget(
            <div style={{backgroundColor: backgroundColor}}>
                <ChartContainer 
                    category={chartInfo.category}
                    type={chartInfo.type}
                    data={this.props.data}
                    spec={this.props.spec}
                    width={600} //600比画布上大
                    height={600}
                    // width={400} 
                    // height={400}
                    pointx={pointx}
                    pointy={pointy}
                    choosenAnimation={choosenAnimation}
                    chooseChartAnimation={chooseChartAnimation}
                    selectedAnimation={selectedAnimation}
                    selectedAnimationIndex={selectedAnimationIndex}
                    isSelectingChartElement={isSelectingChartElement}
                    selectingParameter={selectingParameter}
                    selectChartElement={selectChartElement}
                    modifyChartAnimation={modifyChartAnimation}
                    current={this.props.scenePosition}
                    onCanvas={false} 
                    showChartAnimation={this.props.showChartAnimation}
                    showAnimation={this.props.showAnimation}
                    {...this.props}
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
        canDrop: monitor.canDrop(),
	})
)(ChartPanel);
