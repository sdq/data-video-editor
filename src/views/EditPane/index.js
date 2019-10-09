import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene, sceneIndex, scenes, isFirstScene, isLastScene, past, future} from '@/selectors/video';
import {currentElement, currentElements, elementIndex, elementName, isElementSelected, dragPos, transformInfo} from '@/selectors/canvas';
import { dataList } from '@/selectors/vis';
import { scenePosition } from '@/selectors/scene';
import { isPerforming, isScenePerforming, isVideoPerforming } from '@/selectors/player';
import { showAnimationTargetArea, showResourceTargetArea } from '@/selectors/ui';
import * as uiActions from '@/actions/uiAction';
import * as videoActions from '@/actions/videoAction';
import * as canvasActions from '@/actions/canvasAction';
import * as playerActions from '@/actions/playerAction';
import * as sceneActions from '@/actions/sceneAction';
import * as metaActions from '@/actions/metaAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        isFirstScene: isFirstScene(state),
        isLastScene: isLastScene(state),
        currentScene: currentScene(state),
        past: past(state),
        future: future(state),
        elementIndex: elementIndex(state),
        elementName: elementName(state),
        currentElement: currentElement(state),
        currentElements: currentElements(state),
        isElementSelected: isElementSelected(state),
        isPerforming: isPerforming(state),
        isScenePerforming: isScenePerforming(state),
        isVideoPerforming: isVideoPerforming(state),
        scenePosition: scenePosition(state),
        showAnimationTargetArea: showAnimationTargetArea(state),
        showResourceTargetArea: showResourceTargetArea(state),
        // vis
        dataList: dataList(state),
        dragPos:dragPos(state),
        transformInfo:transformInfo(state),

    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayResourcePane: () => dispatch(uiActions.displayResourcePane()),
        displayToolPane: () => dispatch(uiActions.displayToolPane()),
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
        selectScene: (index) => dispatch(videoActions.selectScene(index)),
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        selectElement: (elementIndex, elementName) => dispatch(canvasActions.selectElement(elementIndex, elementName)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        removeElement: (elementIndex) => dispatch(canvasActions.selectElement(elementIndex)),
        updateElement: (element, elementIndex, elementName) => dispatch(canvasActions.updateElement(element, elementIndex, elementName)),
        playVideo: () => dispatch(playerActions.playVideo()),
        stopVideo: () => dispatch(playerActions.stopVideo()),
        setPosition: (position) => dispatch(sceneActions.setPosition(position)),
        undoCanvas: (index) => dispatch(metaActions.undoCanvas(index)),
        redoCanvas: (index) => dispatch(metaActions.redoCanvas(index)),
        dragElement: (dragPos) => dispatch(canvasActions.dragElement(dragPos)),
        transformElement: (transformInfo) => dispatch(canvasActions.transformElement(transformInfo)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPane)