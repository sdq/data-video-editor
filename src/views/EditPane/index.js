import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene, sceneIndex} from '../../selectors/timeline';
import * as timelineActions from '../../actions/timelineAction';

const mapStateToProps = state => {
    return {
        sceneIndex: sceneIndex(state),
        currentScene: currentScene(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPane)