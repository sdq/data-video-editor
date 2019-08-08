import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { HotKeys } from "react-hotkeys";
import TransformerComponent from './Elements/TransformerComponent';
import ImageElement from './Elements/ImageElement';
import TextElement from './Elements/TextElement';
import ChartElement from './Elements/ChartElement';
import ElementType from '../../constants/ElementType';
import { DropTarget } from 'react-dnd';
import DNDType from '../../constants/DNDType';
import { Element } from '../../models/Element';
import './editpane.css';

const keyMap = {
    COPY: "command+c",
    CUT: "command+x",
    PASTE: "command+v",
    DELETE: ["del", "backspace"]
};

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
            selectedElementName: "",
            copiedElement: null,
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

    handlers = {
        COPY: this.copyElement.bind(this),
        CUT: this.cutElement.bind(this),
        PASTE: this.pasteElement.bind(this),
        DELETE: this.deleteElement.bind(this),
    };

    copyElement() {
        console.log("copy")
        if (this.state.selectedElementName==="") {
            return
        }
        const copyIndex = this.state.selectedElementName.split('-')[1];
        this.setState({
            copiedElement: this.props.currentScene.elements[copyIndex]
        });
    }

    cutElement() {
        console.log("cut")
        if (this.state.selectedElementName==="") {
            return
        }
        const cutIndex = this.state.selectedElementName.split('-')[1];
        this.setState({
            copiedElement: this.props.currentScene.elements[cutIndex]
        });
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements.splice(cutIndex, 1);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    pasteElement() {
        console.log("pasteElement")
        const newScene = Object.assign({},this.props.currentScene);
        const newInfo = Object.assign({},this.state.copiedElement.info);
        const type = this.state.copiedElement.type;
        const newElement = new Element(type, newInfo);
        newScene.elements.push(newElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    deleteElement() {
        //console.log("delete element")
        if (this.state.selectedElementName==="") {
            return
        }
        const deleteIndex = this.state.selectedElementName.split('-')[1];
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements.splice(deleteIndex, 1);
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
            <div id="canvasContainer" style={{ backgroundColor }}>
                <HotKeys keyMap={keyMap} handlers={this.handlers}>
                    <Stage width={800} height={450} onMouseDown={this.handleStageMouseDown}>
                        <Layer>
                            {this.props.currentScene.elements.map(function(element, index) {
                                //console.log(element.info);
                                switch (element.type) {
                                    case ElementType.TEXT:
                                        return <TextElement key={this.props.sceneIndex+"-"+index} edit={ele => this.editElement(index, ele)} element={element} name={this.props.sceneIndex+"-"+index}/>
                                    case ElementType.IMAGE:
                                        return <ImageElement key={this.props.sceneIndex+"-"+index} edit={ele => this.editElement(index, ele)} element={element} name={this.props.sceneIndex+"-"+index}/>
                                    case ElementType.CHART:
                                        return <ChartElement key={this.props.sceneIndex+"-"+index} edit={ele => this.editElement(index, ele)} element={element} name={this.props.sceneIndex+"-"+index}/>
                                    default:
                                        //TODO: remove
                                        console.log("wrong!!!!!!!");
                                        console.log(this.props.currentScene.elements);
                                        console.log(element);
                                        return;
                                }
                            }.bind(this))}
                            <TransformerComponent
                                selectedElementName={this.state.selectedElementName}
                            />
                        </Layer>
                    </Stage>
                </HotKeys>
            </div>
        )
    }
}

export default DropTarget(
	[DNDType.DND_IMAGE, DNDType.DND_CHART],
	canvasTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(EditCanvas);
