import React, { Component } from 'react';
import Track from './Track';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './trackeditor.css';

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});
  
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
});

export default class TrackGroup extends Component {
    
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        console.log("drag")
    }

    render() {
        let { currentScene } = this.props;
        let elements = currentScene.elements;
        return (
            <div className="track-group">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {elements.map((element, index) => (
                                <Draggable key={element.id()} draggableId={element.id()} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                    >
                                    <Track element={element} isSelected={this.props.isElementSelected && (this.props.elementIndex===index)} index={index} {...this.props}/>
                                    </div>
                                )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        )
    }
}
