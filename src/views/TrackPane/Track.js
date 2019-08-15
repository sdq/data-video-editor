import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import TrackBlock from './TrackBlock';
import SceneType from '@/constants/SceneType';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    margin: `0 ${grid}px 0 0`,
  
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',
    height: '90px',
    width: '160px',
    borderStyle: 'solid',
    borderColor: '#D8D8D8',
    borderWidth: '1px',
    
    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

const trackTarget = {
	drop: (props) => ({ 
        target: "track",
        // sceneIndex: props.sceneIndex,
        // currentScene: props.currentScene
    })
}

class Track extends Component {

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
            <div style={{ backgroundColor }}>
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
                                    <TrackBlock type={SceneType.IMAGE} info={item.content} index={index} { ...this.props }/>
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default DropTarget(
	[DNDType.DND_IMAGE, DNDType.DND_CHART],
	trackTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(Track);
