import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Track from './Track';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

export default class TrackGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track1: this.props.scenes.map((scene,index) => ({id:index.toString(),content:scene})),
            track2: [{id:"2-1",content:"item212"}, {id:"2-2",content:"item22"}],
        }
    }
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable1: 'track1',
        droppable2: 'track2'
    };
    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { track1: items };

            if (source.droppableId === 'droppable2') {
                state = { track2: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                track1: result.droppable1,
                track2: result.droppable2
            });
        }
    };
    render() {
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Track droppableId="droppable1" items={this.state.track1}/>
                    <Track droppableId="droppable2" items={this.state.track2}/>
                </DragDropContext>
                {/* <Track/>
                <Track/>
                <Track/> */}
            </div>
        )
    }
}
