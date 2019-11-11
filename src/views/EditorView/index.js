import { connect } from 'react-redux';
import EditorView from './EditorView';
// import {currentScene, sceneIndex, scenes} from '@/selectors/video';
// import {currentElement, elementIndex, isElementSelected, dragPos,transformInfo} from '@/selectors/canvas';
import { dataNameList, dataList, fieldsList, displaySpec, currentData, currentVis, channels} from '@/selectors/vis';

import * as visActions from '@/actions/visAction';

const mapStateToProps = state => {
    return {
        // data
        dataNameList: dataNameList(state),
        dataList: dataList(state),
        fieldsList: fieldsList(state),
        currentData: currentData(state),
        // vis
        displaySpec: displaySpec(state),
        currentVis: currentVis(state),
        channels: channels(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
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
        configureStyle: (style) => dispatch(visActions.configureStyle(style)),
        addChartAnimation: (animation) => dispatch(visActions.addChartAnimation(animation)),
        modifyChartAnimation: (index, animation) => dispatch(visActions.modifyChartAnimation(index, animation)),
        removeChartAnimation: (index) => dispatch(visActions.removeChartAnimation(index)),
        reorderChartAnimation: (animations) => dispatch(visActions.reorderChartAnimation(animations)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditorView)