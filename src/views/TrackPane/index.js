import { connect } from 'react-redux';
import TrackPane from './TrackPane';
import {scenes, sceneIndex, currentScene} from '@/selectors/timeline';
import {currentElements, currentElement, elementIndex, isElementSelected} from '@/selectors/canvas';
import * as timelineActions from '@/actions/timelineAction';
import * as uiActions from '@/actions/uiAction';
import * as canvasActions from '@/actions/canvasAction';
import * as sceneActions from '@/actions/sceneAction';
import { dataList } from '@/selectors/vis';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
        currentElements: currentElements(state),
        currentElement: currentElement(state),
        elementIndex: elementIndex(state),
        isElementSelected: isElementSelected(state),
        // vis
        dataList: dataList(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectElement: (index) => dispatch(canvasActions.selectElement(index)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        updateElement: (element, elementIndex) => dispatch(canvasActions.updateElement(element, elementIndex)),
        reorderElement: (sourceIndex, destinationIndex) => dispatch(canvasActions.reorderElement(sourceIndex, destinationIndex)),
        selectScene: (index) => dispatch(timelineActions.selectScene(index)),
        addScene: (scene) => dispatch(timelineActions.addScene(scene)),
        removeScene: (index) => dispatch(timelineActions.removeScene(index)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        reorderScene: (scenes) => dispatch(timelineActions.reorderScene(scenes)),
        setPosition: (position) => dispatch(sceneActions.setPosition(position)),
        displayStoryline: () => dispatch(uiActions.displayStoryline()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TrackPane)