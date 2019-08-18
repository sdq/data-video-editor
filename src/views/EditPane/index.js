import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene, sceneIndex, scenes} from '@/selectors/timeline';
import {currentElement, elementIndex, isSelected} from '@/selectors/canvas';
import { dataList } from '@/selectors/vis';
import {isPerforming} from '@/selectors/player';
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
        isSelected: isSelected(state),
        isPerforming: isPerforming(state),
        // vis
        dataList: dataList(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
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