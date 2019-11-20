import { connect } from 'react-redux';
import ResourcePane from './ResourcePane';
import {currentScene, sceneIndex} from '@/selectors/video';
import * as videoActions from '@/actions/videoAction';
import * as canvasActions from '@/actions/canvasAction';
import * as uiActions from '@/actions/uiAction';
import {uimode, showResourcePane} from '@/selectors/ui';

const mapStateToProps = state => {
    return {
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
        uimode: uimode(state),
        showResourcePane: showResourcePane(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectElement: (elementIndex, elementName) => dispatch(canvasActions.selectElement(elementIndex, elementName)),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        addScene: (scene) => dispatch(videoActions.addScene(scene)),
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
        displayResourceTargetArea: (isActive) => dispatch(uiActions.displayResourceTargetArea(isActive)),
        displayResourcePane: (isActive) => dispatch(uiActions.displayResourcePane(isActive)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResourcePane)