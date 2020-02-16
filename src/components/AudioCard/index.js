import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import ElementType from '@/constants/ElementType';
import {Element, AudioInfo} from '@/models/Element';
import WebApi from '@/axios/api';
import _ from 'lodash';
import './audiocard.css';

const audioSource = {

	beginDrag(props) {
        props.cleanInterationLayer(true);
        props.displayMusicTargetArea(true);
        props.displayResourceTargetArea(true);
        //console.log("beginDrag",props.info)
        //本地内存中的url,解决视频渲染MediaElementAudioSource outputs zeroes due to CORS access restrictions问题
        WebApi.GetGIFAsset(props.info.id).then((fileURL) => {
            //console.log("newSrc",fileURL)
            props.info.src = fileURL;
        })
		return props.info;
	},

	endDrag(props, monitor) {

        props.displayMusicTargetArea(false);
        props.displayResourceTargetArea(false);
        const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult) {
            // console.log(item);
            //if audio for current scene  
            if (dropResult.target === "canvas") {
                if(!props.info.audio){
                    return null;
                }
                //add element to scene
                const newScene = _.cloneDeep(dropResult.currentScene);
                const newAudio = new AudioInfo(item.id, item.name,item.src,Math.round( props.info.audio && props.info.audio.duration));
                const newElement = new Element(ElementType.AUDIO, newAudio);
                //解析音频时长
                newElement.duration(Math.round( props.info.audio && props.info.audio.duration))
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
                //add music element to scene0
                //删除旧背景音乐
                if(props.scenes[0].backgroundMusic()!=="none"||!props.scenes[0].backgroundMusic()){
                for(let i = 0;i<props.scenes[0].elements().length;i++){ 
                    if(props.scenes[0].elements()[i].info().name === props.scenes[0].backgroundMusic())
                    {
                        props.scenes[0].elements().splice(i, 1);
                    }
                }
                }
                //设置全局backgroundmusicname,用于显示name
                props.scenes[0].backgroundMusic(item.name);
                //新增新背景音乐
                const newbackGroundMusic = new AudioInfo(item.id, item.name,item.src,Math.round( props.info.audio && props.info.audio.duration),true);
                const newElement = new Element(ElementType.AUDIO, newbackGroundMusic);
                props.scenes[0].addElement(newElement); //添加给scene0
                //add audioResource to audioList
                let audioResource = {};
                audioResource.id = newElement.id();
                audioResource.element = props.info.audio
                props.scenes[0].addAudio(audioResource);
                props.addElement(newElement);
                props.updateScene(0, props.scenes[0]);

                //方案二：在添加背景音乐时直接切割为scenes份，添加到每一scene里
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
