import React, { Component } from 'react';
import Track from './Track';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import './trackeditor.css';
  
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
});

export default class TrackGroup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            barActiveList: new Array(props.currentElements.length).fill(false)
        }
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.setBarActive = this.setBarActive.bind(this);
    }

    onDragStart(result) {
        console.log("start drag");
        console.log(result);
        let barActiveList = new Array(this.props.currentElements.length).fill(false);
        this.setState({
            barActiveList: barActiveList
        })
    }

    onDragEnd(result) {
        console.log("end drag")
        console.log(result)
    }

    setBarActive(index) {
        console.log("clickbar"+index);
        let barActiveList = new Array(this.props.currentElements.length).fill(false);
        barActiveList[index] = true;
        this.setState({
            barActiveList: barActiveList
        })
    }

    render() {
        let { currentScene } = this.props;
        let { barActiveList } = this.state;
        let elements = currentScene.elements;
        return (
            <div className="track-group">
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            >
                            {elements.map((element, index) => (
                                <Track key={element.id()} element={element} isBarActive={barActiveList[index]} setBarActive={this.setBarActive} index={index} isSelected={this.props.isElementSelected && (this.props.elementIndex===index)} index={index} {...this.props}/>
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
