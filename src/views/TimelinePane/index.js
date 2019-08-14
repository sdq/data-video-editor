import { connect } from 'react-redux';
import TimelinePane from './TimelinePane';
import {scenes, sceneIndex} from '../../selectors/timeline';
import {uimode} from '../../selectors/ui';
import * as timelineActions from '../../actions/timelineAction';
import * as uiActions from '../../actions/uiAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        uimode: uimode(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectScene: (index) => dispatch(timelineActions.selectScene(index)),
        addScene: (scene) => dispatch(timelineActions.addScene(scene)),
        removeScene: (index) => dispatch(timelineActions.removeScene(index)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        reorderScene: (sourceIndex, destinationIndex) => dispatch(timelineActions.reorderScene(sourceIndex, destinationIndex)),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TimelinePane)