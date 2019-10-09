import { connect } from 'react-redux';
import ToolPane from './ToolPane';
import {currentScene, sceneIndex, scenes} from '@/selectors/video';
import {currentElement, elementIndex, isElementSelected} from '@/selectors/canvas';
import { dataNameList, dataList, fieldsList, displaySpec, currentData, currentVis, slots, dataIndex } from '@/selectors/vis';
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
        // data
        dataNameList: dataNameList(state),
        dataList: dataList(state),
        fieldsList: fieldsList(state),
        currentData: currentData(state),
        dataIndex: dataIndex(state),
        // vis
        displaySpec: displaySpec(state),
        currentVis: currentVis(state),
        slots: slots(state),
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
        // vis
        openEditor: (dataIndex, spec) => dispatch(visActions.openEditor(dataIndex, spec)),
        switchData : (index) => dispatch(visActions.switchData(index)),
        addData: (dataName, data, dataSchema) => dispatch(visActions.addData(dataName, data, dataSchema)),
        updateData: (index, data, dataSchema) => dispatch(visActions.updateData(index, data, dataSchema)),
        deleteData: (index) => dispatch(visActions.deleteData(index)),
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