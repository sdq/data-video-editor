import { connect } from 'react-redux';
import ToolPane from './ToolPane';
import {currentScene, sceneIndex, scenes} from '@/selectors/video';
import {currentElement, elementIndex, isElementSelected,dragPos,transformInfo} from '@/selectors/canvas';
import { displaySpec, getCurrentData, getCurrentVis, getCurrentFields, getSlots } from '@/selectors/vis';
import * as videoActions from '@/actions/videoAction';
import * as canvasActions from '@/actions/canvasAction';
import * as visActions from '@/actions/visAction';
import * as uiActions from '@/actions/uiAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
        elementIndex: elementIndex(state),
        currentElement: currentElement(state),
        isElementSelected: isElementSelected(state),
        dragPos:dragPos(state),
        transformInfo:transformInfo(state),
        // vis
        displaySpec: displaySpec(state),
        currentData: getCurrentData(state),
        currentVis: getCurrentVis(state),
        currentFields: getCurrentFields(state),
        slots: getSlots(state),
    }
}

const mapDispatchToProps = dispatch => {  
    return {
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        selectElement: (elementIndex, selectElement) => dispatch(canvasActions.selectElement(elementIndex, selectElement)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        removeElement: (elementIndex) => dispatch(canvasActions.selectElement(elementIndex)),
        updateElement: (element, elementIndex, selectElement) => dispatch(canvasActions.updateElement(element, elementIndex, selectElement)),
        displayAnimationTargetArea: (isActive) => dispatch(uiActions.displayAnimationTargetArea(isActive)),
        dragElement: (dragPos) => dispatch(canvasActions.dragElement(dragPos)),
        transformElement: (transformInfo) => dispatch(canvasActions.transformElement(transformInfo)),
        // vis
        openEditor: (dataIndex, spec) => dispatch(visActions.openEditor(dataIndex, spec)),
        uploadData: (file) => dispatch(visActions.uploadData(file)),
        changeData: (file) => dispatch(visActions.changeData(file)),
        encoding: (channel, field, isEncoded) => {
            if (isEncoded) {
                return dispatch(visActions.modifyEncoding(channel, field))
            } else {
                return dispatch(visActions.encoding(channel, field))
            }
        },
        removeEncoding: (channel, field) => dispatch(visActions.removeEncoding(channel, field)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToolPane)