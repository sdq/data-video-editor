import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import DNDType from '../../constants/DNDType';
import ElementType from '../../constants/ElementType';
import {Element, ImageInfo} from '../../models/Element';
import './imagecard.css';

const imageSource = {

	beginDrag(props) {
		return props.info
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            console.log(item);
            console.log(dropResult);
            //add element to scene
            const newScene = Object.assign({},dropResult.currentScene);
            const newImage = new ImageInfo(item.src, 300, 150, 100, 100, 0);
            const newElement = new Element(ElementType.IMAGE, newImage);
            newScene.elements.push(newElement);
            props.updateScene(dropResult.sceneIndex, newScene);
		}
    },
}

class ImageCard extends Component {
    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
            <div className="imagecard" align="center">
                <img src={this.props.info.src} alt={this.props.info.name} />
            </div>
        )
    }
}

export default DragSource(
    DNDType.ADD_ELEMENT_TO_CANVAS,
    imageSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(ImageCard)