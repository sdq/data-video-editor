import { connect } from 'react-redux';
import ResourcePane from './ResourcePane';
import {currentScene, sceneIndex,scenes} from '@/selectors/video';
import {isCleanInterationLayer} from '@/selectors/canvas';
import * as videoActions from '@/actions/videoAction';
import * as canvasActions from '@/actions/canvasAction';
import * as uiActions from '@/actions/uiAction';
import * as visActions from '@/actions/visAction';
import {uimode, showResourcePane} from '@/selectors/ui';

const mapStateToProps = state => {
    return {
        scenes:scenes(state),
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
        uimode: uimode(state),
        showResourcePane: showResourcePane(state),
        isCleanInterationLayer: isCleanInterationLayer(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectElement: (elementIndex, elementName) => dispatch(canvasActions.selectElement(elementIndex, elementName)),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        addScene: (scene) => dispatch(videoActions.addScene(scene)),
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        updateBackgroundMusic :(element,elementName)=>dispatch(videoActions.addBackgroundMusic(element,elementName)),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
        displayResourceTargetArea: (isActive) => dispatch(uiActions.displayResourceTargetArea(isActive)),
        displayResourcePane: (isActive) => dispatch(uiActions.displayResourcePane(isActive)),
        displayMusicTargetArea: (isActive) => dispatch(uiActions.displayMusicTargetArea(isActive)),
        cleanInterationLayer: (isClean) => dispatch(canvasActions.cleanInterationLayer(isClean)),
        //vis
        switchData : (index) => dispatch(visActions.switchData(index)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResourcePane)