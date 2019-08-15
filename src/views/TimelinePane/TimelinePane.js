import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SceneBlock from '@/components/SceneBlock';
import AddScene from '@/components/SceneBlock/AddScene';
import AddSceneModal from '@/components/SceneBlock/AddSceneModal';
import Scene from '@/models/Scene';
import './timelinepane.css';

const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    overflow: 'auto',
});

export default class TimelinePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        };
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.clickAddScene = this.clickAddScene.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    clickAddScene() {
        // showModal
        this.setState({
            visible: true,
        });
    }
    
    handleOk(script) {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(function(){
            const newScene = new Scene(script, [], 2);
            this.props.addScene(newScene);
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }.bind(this), 200);
    };
    
    handleCancel() {
        this.setState({
            visible: false,
        });
    };

    onDragStart(result) {
        console.log("drag start!!!!");
        this.props.selectScene(result.source.index)
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        this.props.reorderScene(result.source.index, result.destination.index);
    }

    render() {
        return (
            <div>
                <div id="timelineHeader">
                    <font color="white" weight="bold">Storyline</font>
                </div>
                <div id="timeline">
                    <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {this.props.scenes.map(function(scene, index) {
                                        console.log(scene);
                                        return <Draggable key={index} draggableId={scene.id()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                    <SceneBlock key={index} index={index} scene={scene} isSelected={this.props.sceneIndex===index} { ...this.props }/>
                                                </div>
                                            )}
                                        </Draggable>
                                    }.bind(this))}
                                {provided.placeholder}
                                </div>
                           )}
                        </Droppable>
                    </DragDropContext>
                    <AddScene clickAddScene={this.clickAddScene}/>
                    <AddSceneModal 
                        visible={this.state.visible}
                        confirmLoading={this.state.confirmLoading}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                    />
                </div>
            </div>
        )
    }
}
