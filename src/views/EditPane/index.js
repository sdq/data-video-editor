import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene, sceneIndex, scenes, isFirstScene, isLastScene, past, future} from '@/selectors/video';
import {currentElement, currentElements, elementIndex, elementName, isElementSelected, dragPos, transformInfo} from '@/selectors/canvas';
import { scenePosition } from '@/selectors/scene';
import { isPerforming, isScenePerforming, isVideoPerforming } from '@/selectors/player';
import { showAnimationTargetArea, showResourceTargetArea,showMusicTargetArea,uimode, showResourcePane, showToolPane, showPathLayer } from '@/selectors/ui';
import { dataNameList, dataList, fieldsList, displaySpec, currentData, currentVis, channels } from '@/selectors/vis';
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
        showPathLayer:showPathLayer(state),
        showResourceTargetArea: showResourceTargetArea(state),
        showMusicTargetArea: showMusicTargetArea(state),
        // canvas
        dragPos:dragPos(state),
        transformInfo:transformInfo(state),
        // data
        dataNameList: dataNameList(state),
        dataList: dataList(state),
        fieldsList: fieldsList(state),
        currentData: currentData(state),
        // vis
        displaySpec: displaySpec(state),
        currentVis: currentVis(state),
        channels: channels(state),
        // showpane
        uimode: uimode(state),
        showResourcePane: showResourcePane(state),
        showToolPane: showToolPane(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
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
        // showpane
        displayResourcePane: (isActive) => dispatch(uiActions.displayResourcePane(isActive)),
        displayToolPane: (isActive) => dispatch(uiActions.displayToolPane(isActive)),
        //showpath
        displayPathLayer:(isActive) => dispatch(uiActions.displayPathLayer(isActive)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPane)