import { connect } from 'react-redux';
import ResourcePane from './ResourcePane';
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
        addScene: (scene) => dispatch(timelineActions.addScene(scene)),
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResourcePane)