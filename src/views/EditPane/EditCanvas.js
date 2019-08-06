import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import TransformerComponent from './Elements/TransformerComponent';
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
        this.state = {
            selectedElementName: ""
        };
        this.editElement = this.editElement.bind(this);
    }

    editElement(eleIndex, element) {
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements[eleIndex] = element;
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    handleStageMouseDown = e => {
        console.log("click");
        console.log(e.target);
        // clicked on stage - clear selection
        if (e.target === e.target.getStage()) {
            this.setState({
                selectedElementName: ""
            });
            return;
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer =
            e.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
            return;
        }
    
        // find clicked rect by its name
        const name = e.target.name();
        // const rect = this.state.rectangles.find(r => r.name === name);
        if (name) {
            this.setState({
                selectedElementName: name
            });
        } else {
            this.setState({
                selectedElementName: ""
            });
        }
    };

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
            <div id="canvasContainer" style={{ backgroundColor }}>
                <Stage width={800} height={450} onMouseDown={this.handleStageMouseDown}>
                    <Layer>
                        {this.props.currentScene.elements.map(function(element, index) {
                            //console.log(element.info);
                            switch (element.type) {
                                case ElementType.TEXT:
                                    return <TextElement key={this.props.sceneIndex+"-"+index} edit={ele => this.editElement(index, ele)} element={element} name={this.props.sceneIndex+"-"+index}/>
                                case ElementType.IMAGE:
                                    return <ImageElement key={this.props.sceneIndex+"-"+index} edit={ele => this.editElement(index, ele)} element={element} name={this.props.sceneIndex+"-"+index}/>
                                default:
                                    //TODO: remove
                                    return <div></div>;
                            }
                        }.bind(this))}
                        <TransformerComponent
                            selectedElementName={this.state.selectedElementName}
                        />
                    </Layer>
                </Stage>
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
