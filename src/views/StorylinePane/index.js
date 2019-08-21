import { connect } from 'react-redux';
import StorylinePane from './StorylinePane';
import {scenes, sceneIndex} from '@/selectors/timeline';
import {uimode} from '@/selectors/ui';
import { dataList } from '@/selectors/vis';
import * as timelineActions from '@/actions/timelineAction';
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
        selectScene: (index) => dispatch(timelineActions.selectScene(index)),
        addScene: (scene) => dispatch(timelineActions.addScene(scene)),
        removeScene: (index) => dispatch(timelineActions.removeScene(index)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        reorderScene: (sourceIndex, destinationIndex) => dispatch(timelineActions.reorderScene(sourceIndex, destinationIndex)),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(StorylinePane)