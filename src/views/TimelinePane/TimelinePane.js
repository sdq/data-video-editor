import React, { Component } from 'react';
import SceneBlock from '../../components/SceneBlock';
import AddScene from '../../components/SceneBlock/AddScene';
import AddSceneModal from '../../components/SceneBlock/AddSceneModal';
import Scene from '../../models/Scene';
import './timelinepane.css';

export default class TimelinePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        };
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
            const newScene = new Scene(script, "", [], 2);
            this.props.addScene(newScene);
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }.bind(this), 1000);
    };
    
    handleCancel() {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <div id="timelineHeader">
                    <font color="white" weight="bold">Storyline</font>
                </div>
                <div id="timeline">
                    {this.props.scenes.map(function(scene, index) {
                        return <SceneBlock key={index} index={index} scene={scene} isSelected={this.props.sceneIndex===index} { ...this.props }/>
                    }.bind(this))}
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
