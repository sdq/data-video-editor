import { connect } from 'react-redux';
import EditPane from './EditPane';
import {currentScene} from '../../selectors/timeline';
import * as timelineActions from '../../actions/timelineAction';

const mapStateToProps = state => {
    return {
        currentScene: currentScene(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateScene: (index, scene) => dispatch(timelineActions.updateScene(index, scene)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPane)