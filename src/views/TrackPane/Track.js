import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SceneBlock from './SceneBlock';
import SceneType from '../../constants/SceneType';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
  
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

export default class Track extends Component {

    render() {
        return (
            <Droppable droppableId={this.props.droppableId} direction="horizontal">
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    >
                    {this.props.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            onClick = {this.clickSceneBlock}
                            >
                            {/* {item.content} */}
                                <SceneBlock type={SceneType.IMAGE} info={item.content} index={index} { ...this.props }/>
                            </div>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}
