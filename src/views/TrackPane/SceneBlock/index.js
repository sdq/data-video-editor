import React, { Component } from 'react';
import SceneType from '../../../constants/SceneType';
import AddSceneBlock from './AddSceneBlock';
import BlankBlock from './BlankBlock';
import VideoBlock from './VideoBlock';
import AudioBlock from './AudioBlock';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import ChartBlock from './ChartBlock';

export default class SceneBlock extends Component {

    constructor(props) {
        super(props);
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
            <div>
                {this.chooseSceneBlock()}
            </div>
        )
    }
}
