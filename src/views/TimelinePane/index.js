import { connect } from 'react-redux';
import TimelinePane from './TimelinePane';
import {scenes, sceneIndex} from '../../selectors/timeline';
import * as timelineActions from '../../actions/timelineAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectScene: (index) => dispatch(timelineActions.selectScene(index)),
        addScene: (scene) => dispatch(timelineActions.addScene(scene)),
        removeScene: (index) => dispatch(timelineActions.removeScene(index)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        reorderScene: (scenes) => dispatch(timelineActions.reorderScene(scenes)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TimelinePane)