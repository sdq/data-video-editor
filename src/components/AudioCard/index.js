import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, AudioInfo} from '@/models/Element';
import _ from 'lodash';
import './audiocard.css';

const audioSource = {

	beginDrag(props) {
        props.displayMusicTargetArea(true);

        props.displayResourceTargetArea(true);
		return props.info;
	},

	endDrag(props, monitor) {

        props.displayMusicTargetArea(false);
        props.displayResourceTargetArea(false);
        const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            // console.log(item);
             console.log(dropResult);
            //if audio for current scene  
            if (dropResult.target === "canvas") {
                if(!props.info.audio){
                    return null;
                }
                //add element to scene
                const newScene = _.cloneDeep(dropResult.currentScene);
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

            //if background music for all scene
            if (dropResult.target === "music") {
                if(!props.info.audio){
                    return null;
                }
                //add music element to everyscene
                console.log(props)
                //添加给第一张scene  可不可以默认是第一scene的元素 如果不方便独立为一个全局元素
                //从其他scene 开始播放时重新解析起点
                //redux新建一个界面 背景音乐开关&名字显示
                //播放时候使用单独的player
                //tag to backgroundmusic
                //避免重复
                if(props.scenes[0].backgroundMusic()!=="none"||!props.scenes[0].backgroundMusic()){
                //先删除旧背景音乐
                for(let i = 0;i<props.scenes[0].elements().length;i++){ //element 删除
                    if(props.scenes[0].elements()[i].info().name === props.scenes[0].backgroundMusic())
                    {
                        props.scenes[0].elements().splice(i, 1);
                    }
                }
                }
                //设置全局backgroundname
                props.scenes[0].backgroundMusic(item.name);
                //新增新背景音乐
                const newbackGroundMusic = new AudioInfo(item.name,item.src,Math.round( props.info.audio && props.info.audio.duration),true);
                const newElement = new Element(ElementType.AUDIO, newbackGroundMusic);
                props.scenes[0].addElement(newElement); //添加给第一scene //但是控制不要显示在底部
                //add audioResource to audioList
                let audioResource = {};
                audioResource.id = newElement.id();
                //console.log("newElement.id",newElement.id())
                audioResource.element = props.info.audio
                props.scenes[0].addAudio(audioResource);
                props.addElement(newElement);
                props.updateScene(0, props.scenes[0]);
                
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
        this.props.info.audio = this.playerElement.audioEl;
    }

    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="audiocard">
                <p>{this.props.info.name}</p>
                <ReactAudioPlayer
                    style={{width:"250px"}}
                    src={this.props.info.src}
                    ref={(element) => { this.playerElement = element}}
                    onCanPlay={this.onCanPlay}
                    controls
                    preload = {'auto'}
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
