import React, { Component } from 'react';
import { Layer } from 'react-konva';
import TransformerComponent from '@/components/Elements/TransformerComponent';
import ImageElement from '@/components/Elements/ImageElement';
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import ElementType from '@/constants/ElementType';

export default class EditableLayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAssistLines: false,
            canvasPosition: {
                left: 0,
                top: 0
            }
        };
        this.elementNodes = new Array(props.currentElements.length).fill({});
        this.editStart = this.editStart.bind(this);
        this.editElement = this.editElement.bind(this);
    }

    editStart() {
        this.props.displayAssistLines(true);
    }

    editElement(eleIndex, element) {
        this.props.displayAssistLines(false);
        const newScene = Object.assign({},this.props.currentScene);
        newScene.updateElement(element, eleIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + eleIndex;
        this.props.updateElement(element, eleIndex, elementName);
    }

    isElementDisplay(element) {
        if (this.props.scenePosition >= element.start() && this.props.scenePosition <= element.start()+element.duration()) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { isPerforming } = this.props;
        const editable = !isPerforming;
        return (
            <Layer 
                ref={node => (this.editableLayer = node)}
            >
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
                    selectedElementName={this.props.elementName}
                />
            </Layer>
        )
    }
}
