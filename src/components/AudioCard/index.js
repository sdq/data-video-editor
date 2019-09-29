import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, AudioInfo} from '@/models/Element';
import './audiocard.css';

const audioSource = {

	beginDrag(props) {
        props.displayResourceTargetArea(true);
		return props.info;
	},

	endDrag(props, monitor) {
        props.displayResourceTargetArea(false);
        const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            // console.log(item);
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                const newAudio = new AudioInfo(item.name,item.src);
                const newElement = new Element(ElementType.AUDIO, newAudio);
                //TODO set duration时要检查props.info.audio对象状态，是否可获取到duration
                newElement.duration(Math.round(props.info.audio.duration));
                newScene.addElement(newElement);
                //add audioResource to audioList
                let audioResource = {};
                audioResource.id = newElement.id();
                //console.log("newElement.id",newElement.id())
                audioResource.element = props.info.audio
                newScene.addAudio(audioResource);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
                // props.displayTrackEditor();
            }
		}
    },
}

class AudioCard extends Component {
    constructor(props){
       super(props);
       //局部变量不需要放在this.state里边，
       this.playerElement={}
    }
    
    onCanPlay=() => {
        //ReactAudioPlayer底层封装的是audio
        this.props.info.audio = this.playerElement.audioEl
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div>
                <p>{this.props.info.name}</p>
                <ReactAudioPlayer
                    src={this.props.info.src}
                    //ref={(element) => { this.state.duration = element}}
                    ref={(element) => { this.playerElement = element}}
                    onCanPlay={this.onCanPlay}
                    controls
                />
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_AUDIO,
    audioSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(AudioCard)