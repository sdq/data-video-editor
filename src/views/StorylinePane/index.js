import { connect } from 'react-redux';
import StorylinePane from './StorylinePane';
import {scenes, sceneIndex} from '@/selectors/video';
import {uimode} from '@/selectors/ui';
import { dataList } from '@/selectors/vis';
import * as videoActions from '@/actions/videoAction';
import * as uiActions from '@/actions/uiAction';
import * as canvasActions from '@/actions/canvasAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        uimode: uimode(state),
        // vis
        dataList: dataList(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        selectScene: (index) => dispatch(videoActions.selectScene(index)),
        addScene: (scene) => dispatch(videoActions.addScene(scene)),
        removeScene: (index) => dispatch(videoActions.removeScene(index)),
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        reorderScene: (sourceIndex, destinationIndex) => dispatch(videoActions.reorderScene(sourceIndex, destinationIndex)),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StorylinePane)