import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '../../constants/DNDType';
import ElementType from '../../constants/ElementType';
//import ChartType from '../../constants/ChartType';
import {Element, ChartInfo} from '../../models/Element';
import Scene from '../../models/Scene';
import './chartcard.css';

const chartSource = {

	beginDrag(props) {
		return {type: props.charttype};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            // console.log(item);
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                const newChart = new ChartInfo(
                    '',
                    item.type, //type
                    '', //spec
                    260,
                    100,
                    100,
                    100,
                    0,
                )
                const newElement = new Element(ElementType.CHART, newChart);
                newScene.elements.push(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
            } 
            // else if (dropResult.target === "track") {
            //     //add new scene
            //     const newChart = new ChartInfo(
            //         '',
            //         item.type, //type
            //         '', //spec
            //         260,
            //         100,
            //         100,
            //         100,
            //         0,
            //     )
            //     const newElement = new Element(ElementType.CHART, newChart);
            //     const newScene = new Scene([newElement], 2);
            //     props.addScene(newScene);
            // }
		}
    },
}

class ChartCard extends Component {

    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
            <div className="chartcard" align="center">
                <img src={this.props.chartsrc} alt={this.props.charttype} />
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_CHART,
    chartSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(ChartCard)
