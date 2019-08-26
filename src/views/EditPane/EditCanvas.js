import React, { Component } from 'react';
import Konva from "konva";
import { Stage, Layer } from 'react-konva';
import { HotKeys } from "react-hotkeys";
import TransformerComponent from '@/components/Elements/TransformerComponent';
import ImageElement from '@/components/Elements/ImageElement';
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import ElementType from '@/constants/ElementType';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import Color from '@/constants/Color';
import { Element } from '@/models/Element';
import AssistLines from './AssistLines';
import './editpane.css';
import { None } from 'vega';
import _ from 'lodash';

const keyMap = {
    COPY: ["command+c", "ctrl+c"],
    CUT: ["command+x", "ctrl+x"],
    PASTE: ["command+v", "ctrl+v"],
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
            editable: false,
            selectedElementName: "",
            copiedElement: null,
            showAssistLines: false,
        };
        this.elementNodes = new Array(props.currentElements.length).fill({});
        this.animations = new Array(props.currentElements.length).fill({});
        this.editStart = this.editStart.bind(this);
        this.editElement = this.editElement.bind(this);
    }

    componentWillReceiveProps(props) {
        const name = this.props.sceneIndex+"-"+props.elementIndex;
        const editable = !this.props.isPerforming;
        this.setState({
            selectedElementName: name,
            editable: editable,
        });

        // this.animationStart()
        
    }

    componentWillUnmount() {
        this.animationStop()
    }

    editStart() {
        this.setState({
            showAssistLines: true
        })
    }

    editElement(eleIndex, element) {
        this.setState({
            showAssistLines: false
        })
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(element, eleIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.updateElement(element, eleIndex);
    }

    handleStageMouseDown = e => {
        // clicked on stage - clear selection
        // console.log('click----')
        if (e.target === e.target.getStage()) {
            this.setState({
                selectedElementName: ""
            });
            this.props.unselectElement();
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
        // console.log(name);
        if (name) {
            this.setState({
                selectedElementName: name
            });
            var eleIndex = Number(name.split('-')[1]);
            this.props.selectElement(eleIndex);
            this.props.displayTrackEditor();
        } else {
            this.setState({
                selectedElementName: ""
            });
            this.props.unselectElement();
        }

        if (e.evt.button === 2) {
            // TODO: right click
        }
    };

    animationStart() {
        // TODO: animation test
        var period = 3000;
        for (let index = 0; index < this.props.currentElements.length; index++) {
            if (_.isEmpty(this.elementNodes[index])) {
                continue;
            }
            // this.animations[index] = new Konva.Animation(frame => {
            //     var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
            //     this.elementNodes[index].rotate(angleDiff);
            // }, this.animationLayer);
            console.log(this.elementNodes);
            this.animations[index] = new Konva.Animation(function(frame) {
                var scale = Math.abs(Math.sin((frame.time * 2 * Math.PI) / period)) + 0.001;
                this.elementNodes[index].scale({ x: scale, y: scale });
            }.bind(this), this.animationLayer);
            this.animations[index].start();
        }
    }

    animationStop() {
        for (let index = 0; index < this.props.currentElements.length; index++) {
            if (_.isEmpty(this.animation[index])) {
                continue;
            }
            this.animations[index].stop();
        }
    }

    handlers = {
        COPY: this.copyElement.bind(this),
        CUT: this.cutElement.bind(this),
        PASTE: this.pasteElement.bind(this),
        DELETE: this.deleteElement.bind(this),
    };

    copyElement() {
        this.props.unselectElement();
        if (this.state.selectedElementName==="") {
            return
        }
        const copyIndex = this.state.selectedElementName.split('-')[1];
        this.setState({
            copiedElement: this.props.currentScene.elements()[copyIndex]
        });
    }

    cutElement() {
        this.props.unselectElement();
        if (this.state.selectedElementName==="") {
            return
        }
        const cutIndex = this.state.selectedElementName.split('-')[1];
        this.setState({
            copiedElement: this.props.currentScene.elements()[cutIndex]
        });
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements().splice(cutIndex, 1);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    pasteElement() {
        console.log("pasteElement")
        // TODO: select pasted element
        const newScene = Object.assign({},this.props.currentScene);
        const newInfo = Object.assign({},this.state.copiedElement.info());
        const type = this.state.copiedElement.type();
        const newElement = new Element(type, newInfo);
        newScene.addElement(newElement);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    deleteElement() {
        this.props.unselectElement();
        if (this.state.selectedElementName==="") {
            return
        }
        const deleteIndex = this.state.selectedElementName.split('-')[1];
        const newScene = Object.assign({},this.props.currentScene);
        newScene.elements().splice(deleteIndex, 1);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    isElementDisplay(element) {
        if (this.props.scenePosition >= element.sstart() && this.props.scenePosition <= element.sstart()+element.sduration()) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { editable } = this.state;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = '#fff';
        if (isActive) {
			backgroundColor = Color.BLUE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_BLUE;
        }
        return connectDropTarget(
            <div id="canvasContainer" style={{ backgroundColor }}>
                <HotKeys keyMap={keyMap} handlers={this.handlers}>
                    { this.state.showAssistLines ? <AssistLines /> : null }
                    <Stage width={800} height={450} onMouseDown={editable?this.handleStageMouseDown:None}>
                        <Layer ref={node => (this.animationLayer = node)}>
                            {this.props.currentScene.elements().map(function(element, index) {
                                //console.log(element.info);
                                switch (element.type()) {
                                    case ElementType.TEXT:
                                        if (this.isElementDisplay(element)) {
                                            return <TextElement
                                                key={this.props.sceneIndex+"-"+index} 
                                                edit={ele => this.editElement(index, ele)} 
                                                editStart={this.editStart} 
                                                element={element} 
                                                name={this.props.sceneIndex+"-"+index} 
                                                draggable={editable} 
                                                {...this.props}
                                            />
                                        } else {
                                            return null;
                                        }
                                        
                                    case ElementType.IMAGE:
                                        if (this.isElementDisplay(element)) {
                                            return <ImageElement 
                                                ref={node => (this.elementNodes[index] = node)}
                                                key={this.props.sceneIndex+"-"+index} 
                                                edit={ele => this.editElement(index, ele)} 
                                                editStart={this.editStart} 
                                                element={element} 
                                                name={this.props.sceneIndex+"-"+index} 
                                                draggable={editable} 
                                                {...this.props}
                                            />
                                        } else {
                                            return null;
                                        }
                                        
                                    case ElementType.CHART:
                                        if (this.isElementDisplay(element)) {
                                            return <ChartElement 
                                                key={this.props.sceneIndex+"-"+index} 
                                                edit={ele => this.editElement(index, ele)} 
                                                editStart={this.editStart} 
                                                element={element} 
                                                name={this.props.sceneIndex+"-"+index} 
                                                width={200} 
                                                height={200} 
                                                draggable={editable} 
                                                {...this.props}
                                            />
                                        } else {
                                            return null;
                                        }
                                        
                                    case ElementType.AUDIO:
                                        return null;
                                    default:
                                        //TODO: remove
                                        console.log("wrong!!!!!!!");
                                        console.log(element);
                                        return null;
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
	[DNDType.DND_IMAGE, DNDType.DND_CHART, DNDType.DND_AUDIO],
	canvasTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(EditCanvas);
