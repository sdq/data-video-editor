import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, AudioInfo} from '@/models/Element';
import './audiocard.css';

const audioSource = {

	beginDrag(props) {
		return props.info;
	},

	endDrag(props, monitor) {
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
                newScene.elements.push(newElement);
                props.addElement(newElement);
                props.updateScene(dropResult.sceneIndex, newScene);
                props.displayTrackEditor();
            }
		}
    },
}

class AudioCard extends Component {

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div>
                <p>{this.props.info.name}</p>
                <ReactAudioPlayer
                    src={this.props.info.src}
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