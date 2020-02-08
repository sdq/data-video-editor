import React, { Component } from 'react';
import { HotKeys } from "react-hotkeys";
import shortcuts from '@/constants/Shortcuts';
import EditToolBar from './EditToolBar';
import PlayControlBar from './PlayControlBar';
import SceneCanvas from './SceneCanvas';
import { Element } from '@/models/Element';
import createElementUtils  from "../../utils/creatElement";
import { message } from 'antd';
import _ from 'lodash';
import './editpane.css';

export default class EditPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showGridLines: false,
            copiedElement: null,
        };
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
    }

    // setIsshowPathAnimator = value => {
    //     this.setState({
    //         showPathAnimator: value
    //     })
    // }


    setIsShowGridLines = value => {
        this.setState({
            showGridLines: value
        })
    }

    // edit methods
    handlers = {
        COPY: this.copyElement.bind(this),
        CUT: this.cutElement.bind(this),
        PASTE: this.pasteElement.bind(this),
        DELETE: this.deleteElement.bind(this),
    };

    copyElement() {
        this.props.unselectElement();
        if (this.props.elementName === "") {
            return
        }
        const copyIndex = this.props.elementName.split('-')[1];
        this.setState({
            copiedElement: this.props.currentScene.elements()[copyIndex]
        });
    }

    cutElement() {
        this.props.unselectElement();
        if (this.props.elementName === "") {
            return
        }
        const cutIndex = this.props.elementName.split('-')[1];
        this.setState({
            copiedElement: this.props.currentScene.elements()[cutIndex]
        });
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.elements().splice(cutIndex, 1);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }

    pasteElement() {
        if (!this.state.copiedElement) {
            message.info("Please try copy element again!")
            return
        };
        const newScene = _.cloneDeep(this.props.currentScene);
        const newInfo = _.cloneDeep(this.state.copiedElement.info());
        newInfo.x = newInfo.x + 10; // offset
        newInfo.y = newInfo.y + 10;
        const type = this.state.copiedElement.type();
        console.log("pasteElement...", this.state.copiedElement)
        if (type === 'video_element') {
            const newElement = new Element(type, newInfo);
            newElement.start(this.state.copiedElement.start());
            newElement.duration(this.state.copiedElement.duration())
            newScene.addElement(newElement);
            //add videoResource to videoList
            let videoResource = {};
            videoResource.id = newElement.id();
            createElementUtils.createElement('video_element', newInfo.src).then(reslove => {
                videoResource.element = reslove;
                newScene.addVideoTag(videoResource);
                this.props.updateScene(this.props.sceneIndex, newScene);
            })
        } else if (type === 'audio_element') {
            const newElement = new Element(type, newInfo);
            newElement.start(this.state.copiedElement.start());
            newElement.duration(this.state.copiedElement.duration())
            newScene.addElement(newElement);
            //add audioResource to audioList
            let audioResource = {};
            audioResource.id = newElement.id();
            //解析
            createElementUtils.createElement("audio_element", newInfo.src).then(reslove => {
                audioResource.element = reslove;
                newScene.addAudio(audioResource);
                this.props.updateScene(this.props.sceneIndex, newScene);
            })
        } else {
            const newElement = new Element(type, newInfo);
            newScene.addElement(newElement);
            this.props.updateScene(this.props.sceneIndex, newScene);
        }


    }

    deleteElement() {
        this.props.unselectElement();
        if (this.props.elementName === "") {
            return
        }
        const deleteIndex = this.props.elementName.split('-')[1];
        const newScene = _.cloneDeep(this.props.currentScene);
        newScene.elements().splice(deleteIndex, 1);
        this.props.updateScene(this.props.sceneIndex, newScene);
    }


    render() {
        return (
            <div id="editpane">
                <HotKeys keyMap={shortcuts} handlers={this.handlers} style={{height:"100%",display:"flex",flexDirection:'column',flex:1}}>
                    <EditToolBar
                        copyElement={this.copyElement}
                        cutElement={this.cutElement}
                        pasteElement={this.pasteElement}
                        deleteElement={this.deleteElement}
                        copiedElement={this.state.copiedElement}
                        showGridLines={this.state.showGridLines}
                        setIsShowGridLines={this.setIsShowGridLines}
                        // showPathAnimator={this.state.showPathAnimator}
                        // setIsshowPathAnimator={this.setIsshowPathAnimator}
                        {...this.props}
                    />
                    <div style={{ background: '#eee', height: this.props.contentHeight - 100 + 'px' }}>
                        <SceneCanvas
                            showGridLines={this.state.showGridLines}
                            // showPathAnimator={this.state.showPathAnimator}
                            {...this.props}
                        />
                    </div>
                    <PlayControlBar {...this.props} />
                </HotKeys>
            </div>
        )
    }
}
