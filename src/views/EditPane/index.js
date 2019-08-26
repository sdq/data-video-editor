import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene, sceneIndex, scenes} from '@/selectors/timeline';
import {currentElement, currentElements, elementIndex, isElementSelected} from '@/selectors/canvas';
import { dataList } from '@/selectors/vis';
import { scenePosition } from '@/selectors/scene';
import {isPerforming} from '@/selectors/player';
import * as uiActions from '@/actions/uiAction';
import * as timelineActions from '@/actions/timelineAction';
import * as canvasActions from '@/actions/canvasAction';
import * as playerActions from '@/actions/playerAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
        elementIndex: elementIndex(state),
        currentElement: currentElement(state),
        currentElements: currentElements(state),
        isElementSelected: isElementSelected(state),
        isPerforming: isPerforming(state),
        scenePosition: scenePosition(state),
        // vis
        dataList: dataList(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
        selectScene: (index) => dispatch(timelineActions.selectScene(index)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        selectElement: (elementIndex) => dispatch(canvasActions.selectElement(elementIndex)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        removeElement: (elementIndex) => dispatch(canvasActions.selectElement(elementIndex)),
        updateElement: (element, elementIndex) => dispatch(canvasActions.updateElement(element, elementIndex)),
        playVideo: () => dispatch(playerActions.playVideo()),
        stopVideo: () => dispatch(playerActions.stopVideo()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPane)