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
                if(!props.info.audio){
                    //console.log("音频对象为空")
                    return null;
                }
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                const newAudio = new AudioInfo(item.name,item.src,Math.round( props.info.audio && props.info.audio.duration));
                const newElement = new Element(ElementType.AUDIO, newAudio);
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
       this.playerElement={}
    }
    
    onCanPlay=() => {
        this.playerElement.audioEl.id = 'audiotest-' + Math.random();
        // this.playerElement.audioEl.crossOrigin = 'anonymous';
        // this.playerElement.audioEl.src = this.props.info.src + "?" + Math.random();
        this.props.info.audio = this.playerElement.audioEl;
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div>
                <p>{this.props.info.name}</p>
                <ReactAudioPlayer
                    src={this.props.info.src} // + "?" + Math.random()
                    //ref={(element) => { this.state.duration = element}}
                    ref={(element) => { this.playerElement = element}}
                    onCanPlay={this.onCanPlay}
                    controls
                    preload={'auto'}
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
