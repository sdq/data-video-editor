import React, { Component } from 'react';
import SceneType from '../../constants/SceneType';
import AddSceneBlock from './AddSceneBlock';
import BlankBlock from './BlankBlock';
import VideoBlock from './VideoBlock';
import AudioBlock from './AudioBlock';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import ChartBlock from './ChartBlock';

export default class SceneBlock extends Component {

    chooseSceneBlock(blockType) {
        switch (blockType) {
            case SceneType.IMAGE:
                return <ImageBlock />;
            case SceneType.VIDEO:
                return <VideoBlock />;
            case SceneType.AUDIO:
                return <AudioBlock />;
            case SceneType.CHART:
                return <ChartBlock />;
            case SceneType.Text:
                return <TextBlock />;
            default:
                return <BlankBlock />;
        }
    }

    render() {
        return (
            <div>
                <chooseSceneBlock />
            </div>
        )
    }
}
