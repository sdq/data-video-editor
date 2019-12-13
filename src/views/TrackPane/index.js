import { connect } from 'react-redux';
import TrackPane from './TrackPane';
import {scenes, sceneIndex, currentScene, isLastScene, isFirstScene} from '@/selectors/video';
import {currentElements, currentElement, elementIndex, isElementSelected} from '@/selectors/canvas';
import { scenePosition, sceneScale } from '@/selectors/scene';
import { isPerforming, isScenePerforming, isVideoPerforming } from '@/selectors/player';
import * as videoActions from '@/actions/videoAction';
import * as uiActions from '@/actions/uiAction';
import * as canvasActions from '@/actions/canvasAction';
import * as sceneActions from '@/actions/sceneAction';
import * as playerActions from '@/actions/playerAction';
import { showPathLayer } from '@/selectors/ui';
import { dataList } from '@/selectors/vis';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        isFirstScene: isFirstScene(state),
        isLastScene: isLastScene(state),
        currentScene: currentScene(state),
        currentElements: currentElements(state),
        currentElement: currentElement(state),
        elementIndex: elementIndex(state),
        isElementSelected: isElementSelected(state),
        scenePosition: scenePosition(state),
        sceneScale: sceneScale(state),
        isPerforming: isPerforming(state),
        isScenePerforming: isScenePerforming(state),
        isVideoPerforming: isVideoPerforming(state),
        // vis
        dataList: dataList(state),
        //path
        showPathLayer:showPathLayer(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectElement: (elementIndex, elementName) => dispatch(canvasActions.selectElement(elementIndex, elementName)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        updateElement: (element, elementIndex, elementName) => dispatch(canvasActions.updateElement(element, elementIndex, elementName)),
        reorderElement: (sourceIndex, destinationIndex) => dispatch(canvasActions.reorderElement(sourceIndex, destinationIndex)),
        selectScene: (index) => dispatch(videoActions.selectScene(index)),
        addScene: (scene) => dispatch(videoActions.addScene(scene)),
        removeScene: (index) => dispatch(videoActions.removeScene(index)),
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        reorderScene: (scenes) => dispatch(videoActions.reorderScene(scenes)),
        setPosition: (position) => dispatch(sceneActions.setPosition(position)),
        setSceneScale: (scale) => dispatch(sceneActions.setSceneScale(scale)),
        displayStoryline: () => dispatch(uiActions.displayStoryline()),
        playScene: (sceneIndex) => dispatch(playerActions.playScene(sceneIndex)),
        stopScene: (sceneIndex) => dispatch(playerActions.stopScene(sceneIndex)),
        //showpath
        displayPathLayer:(isActive) => dispatch(uiActions.displayPathLayer(isActive)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TrackPane)