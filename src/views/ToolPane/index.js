import { connect } from 'react-redux';
import ToolPane from './ToolPane';
import {currentScene, sceneIndex, scenes} from '@/selectors/timeline';
import {currentElement, elementIndex, isSelected} from '@/selectors/canvas';
import * as timelineActions from '@/actions/timelineAction';
import * as canvasActions from '@/actions/canvasAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
        elementIndex: elementIndex(state),
        currentElement: currentElement(state),
        isSelected: isSelected(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
        selectElement: (elementIndex) => dispatch(canvasActions.selectElement(elementIndex)),
        unselectElement: () => dispatch(canvasActions.unselectElement()),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
        removeElement: (elementIndex) => dispatch(canvasActions.selectElement(elementIndex)),
        updateElement: (element, elementIndex) => dispatch(canvasActions.updateElement(element, elementIndex)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToolPane)