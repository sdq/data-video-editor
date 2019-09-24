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
        console.log(66666666666,item)
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            // console.log(item);
            // console.log(dropResult);
            if (dropResult.target === "canvas") {
                //add element to scene
                const newScene = Object.assign({},dropResult.currentScene);
                //const newAudio = new AudioInfo(item.name,item.src,item.duration);
                const newAudio = new AudioInfo(item.name,item.src);
                const newElement = new Element(ElementType.AUDIO, newAudio);
                newElement.duration(item.duration);
                newScene.addElement(newElement);
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
       this.state={
        duration:0
       }
    }
    onCanPlay=() => {
        let enDuration = this.state.duration.audioEl && this.state.duration.audioEl.duration;
        this.props.info.duration=Math.round(enDuration)
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div>
                <p>{this.props.info.name}</p>
                <ReactAudioPlayer
                    src={this.props.info.src}
                    ref={(element) => { this.state.duration= element}}
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