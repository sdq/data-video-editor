import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene, sceneIndex, scenes} from '../../selectors/timeline';
import * as timelineActions from '../../actions/timelineAction';

const mapStateToProps = state => {
    return {
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectScene: (index) => dispatch(timelineActions.selectScene(index)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPane)