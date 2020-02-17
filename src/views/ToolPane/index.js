import { connect } from 'react-redux';
import ToolPane from './ToolPane';
import {currentScene, sceneIndex, scenes} from '@/selectors/video';
import {currentElement, elementIndex, isElementSelected, dragPos,transformInfo} from '@/selectors/canvas';
import { dataNameList, dataList, fieldsList, displaySpec, currentData, currentVis, channels, choosenAnimation, selectedAnimation, selectedAnimationIndex, isSelectingChartElement, selectingParameter, chartAnimationVideoURL } from '@/selectors/vis';
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
        // data
        dataNameList: dataNameList(state),
        dataList: dataList(state),
        fieldsList: fieldsList(state),
        currentData: currentData(state),
        // vis
        displaySpec: displaySpec(state),
        currentVis: currentVis(state),
        channels: channels(state),
        choosenAnimation: choosenAnimation(state),
        selectedAnimation: selectedAnimation(state),
        selectedAnimationIndex: selectedAnimationIndex(state),
        isSelectingChartElement: isSelectingChartElement(state),
        selectingParameter: selectingParameter(state),
        //Animation
        chartAnimationVideoURL: chartAnimationVideoURL(state),
    }
}

const mapDispatchToProps = dispatch => {  
    return {
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        selectElement: (elementIndex, selectElement) => dispatch(canvasActions.selectElement(elementIndex, selectElement)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        removeElement: (elementIndex) => dispatch(canvasActions.removeElement(elementIndex)),
        updateElement: (element, elementIndex, selectElement) => dispatch(canvasActions.updateElement(element, elementIndex, selectElement)),
        displayAnimationTargetArea: (isActive) => dispatch(uiActions.displayAnimationTargetArea(isActive)),
        displayPathLayer:(isActive) => dispatch(uiActions.displayPathLayer(isActive)),
        dragElement: (dragPos) => dispatch(canvasActions.dragElement(dragPos)),
        transformElement: (transformInfo) => dispatch(canvasActions.transformElement(transformInfo)),
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
        changeAggregation: (channel, method) => dispatch(visActions.changeAggregation(channel, method)),
        configureStyle: (style) => dispatch(visActions.configureStyle(style)),
        chooseChartAnimation: (animation) => dispatch(visActions.chooseChartAnimation(animation)),
        selectChartAnimation: (animation, index) => dispatch(visActions.selectChartAnimation(animation, index)),
        selectChartElement: (isSelecting, parameter) => dispatch(visActions.selectChartElement(isSelecting, parameter)),
        addChartAnimation: (animation) => dispatch(visActions.addChartAnimation(animation)),
        modifyChartAnimation: (index, animation) => dispatch(visActions.modifyChartAnimation(index, animation)),
        removeChartAnimation: (index) => dispatch(visActions.removeChartAnimation(index)),
        reorderChartAnimation: (animations) => dispatch(visActions.reorderChartAnimation(animations)),
        updatChartInnerAnimationUrl: (url) => dispatch(visActions.updatChartInnerAnimationUrl(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToolPane)