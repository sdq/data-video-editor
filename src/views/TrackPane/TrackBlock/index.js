import React, { Component } from 'react';
import SceneType from '@/constants/SceneType';
// import AddSceneBlock from './AddSceneBlock';
import BlankBlock from './BlankBlock';
import VideoBlock from './VideoBlock';
import AudioBlock from './AudioBlock';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import ChartBlock from './ChartBlock';
import './clipblock.css';

export default class ClipBlock extends Component {

    constructor(props) {
        super(props);
        this.clickClipBlock = this.clickClipBlock.bind(this);
    }

    clickClipBlock() {
        //console.log("click!"+this.props.index);
        this.props.selectScene(this.props.index);
    }

    chooseSceneBlock() {
        switch (this.props.type) {
            case SceneType.IMAGE:
                return <ImageBlock info={this.props.info}/>;
            case SceneType.VIDEO:
                return <VideoBlock info={this.props.info} />;
            case SceneType.AUDIO:
                return <AudioBlock info={this.props.info} />;
            case SceneType.CHART:
                return <ChartBlock info={this.props.info} />;
            case SceneType.Text:
                return <TextBlock info={this.props.info} />;
            default:
                return <BlankBlock />;
        }
    }

    render() {
        return (
            <div className="clipblock" onClick = {this.clickClipBlock}>
                {this.chooseSceneBlock()}
            </div>
        )
    }
}
