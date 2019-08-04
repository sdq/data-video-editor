import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import ElementType from '../../constants/ElementType';
import { DropTarget } from 'react-dnd';
import DNDType from '../../constants/DNDType';
import './editpane.css';

const canvasTarget = {
	drop: (props) => ({ 
        target: "canvas",
        sceneIndex: props.sceneIndex,
        currentScene: props.currentScene
    })
}

class EditCanvas extends Component {

    constructor(props) {
        super(props);
        this.editElement = this.editElement.bind(this);
    }

    editElement(eleIndex, element) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements[eleIndex] = element;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = '#fff';
        if (isActive) {
			backgroundColor = 'darkgreen';
		} 
		else if (canDrop) {
			backgroundColor = '#c8e6c9';
		}
        return connectDropTarget(
            <div>
                EditCanvas
                <div id="canvasContainer" style={{ backgroundColor }}>
                    <Stage width={640} height={360}>
                        <Layer>
                            {this.props.currentScene.elements.map(function(element, index) {
                                switch (element.type) {
                                    case ElementType.TEXT:
                                        return <TextElement key={index} edit={ele => this.editElement(index, ele)} element={element}/>
                                    case ElementType.IMAGE:
                                        return <ImageElement key={index} edit={ele => this.editElement(index, ele)} element={element}/>
                                    default:
                                        //TODO: remove
                                        return <div></div>;
                                }
                            }.bind(this))}
                        </Layer>
                    </Stage>
                </div>
            </div>
        )
    }
}

export default DropTarget(
	[DNDType.DND_IMAGE],
	canvasTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(EditCanvas);
