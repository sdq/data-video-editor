import { connect } from 'react-redux';
import ResourcePane from './ResourcePane';
import {currentScene, sceneIndex} from '@/selectors/timeline';
import * as timelineActions from '@/actions/timelineAction';
import * as canvasActions from '@/actions/canvasAction';
import * as uiActions from '@/actions/uiAction';

const mapStateToProps = state => {
    return {
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        addScene: (scene) => dispatch(timelineActions.addScene(scene)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResourcePane)