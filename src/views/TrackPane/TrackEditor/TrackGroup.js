import React, { Component } from 'react';
import Track from './Track';
import AudioTrack from './Track/AudioTrack';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import './trackeditor.css';
import ElementType from '@/constants/ElementType'  
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "white",
});

export default class TrackGroup extends Component {
    
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.setBarActive = this.setBarActive.bind(this);
        this.setBarUnactive = this.setBarUnactive.bind(this);
    }

    onDragStart(result) {
        this.setBarUnactive();
    }

    onDragEnd(result) {
        if (result.destination === null) {
            return; // drop outside region
        }
        let sourceIndex = result.source.index;
        let destinationIndex = result.destination.index;
        const newScene = Object.assign({},this.props.currentScene);
        const [moved] = newScene.elements().splice(sourceIndex, 1);
        newScene.elements().splice(destinationIndex, 0, moved);
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.reorderElement(sourceIndex, destinationIndex);
    }

    setBarActive(index) {
        this.props.setBarActive(index);
    }

    setBarUnactive() {
        this.props.setBarUnactive();
    }

    render() {
        let { currentScene, barActiveList } = this.props;
        let elements = currentScene.elements();
        //console.log("显示元素",elements)
        return (
            <div className="track-group">
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                    <Droppable droppableId="trackgroup">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {elements.map((element, index) => {
                                //console.log("elements.map",element.type(),element)
                                 let isbackgroundMusic = element.info().backgroundmusic?element.info().backgroundmusic:false;
                                    switch (element.type()) {
                                        case ElementType.AUDIO:
                                            //console.log("isbackgroundMusic...",isbackgroundMusic,element)
                                            if(isbackgroundMusic){
                                                return null;
                                            }else{
                                            return (<AudioTrack
                                                key={element.id()}
                                                index={index}
                                                element={element}
                                                isBarActive={barActiveList[index]}
                                                setBarActive={this.setBarActive}
                                                setBarUnactive={this.setBarUnactive}
                                                isSelected={this.props.isElementSelected && (this.props.elementIndex === index)}
                                                {...this.props}
                                            />)}
                                    
                                        default:
                                            return (<Track
                                                key={element.id()}
                                                index={index}
                                                element={element}
                                                isBarActive={barActiveList[index]}
                                                setBarActive={this.setBarActive}
                                                setBarUnactive={this.setBarUnactive}
                                                isSelected={this.props.isElementSelected && (this.props.elementIndex === index)}
                                                {...this.props}
                                            />)
                                    }
                                }
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
