import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import {videoDuration ,sceneIndex, scenes} from '@/selectors/video';
import { userInfo } from '@/selectors/user';
import * as videoActions from '@/actions/videoAction';
import * as uiActions from '@/actions/uiAction';
import * as canvasActions from '@/actions/canvasAction';

const mapStateToProps = state => {
    return {
        videoDuration: videoDuration(state),
        scenes: scenes(state),
        sceneIndex: sceneIndex(state),
        userInfo: userInfo(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
        addScene: (scene) => dispatch(videoActions.addScene(scene)),
        updateScene: (index, scene) => dispatch(videoActions.updateScene(index, scene)),
        addProject: (source) => dispatch(videoActions.addProject(source)),
        removeProject: () => dispatch(videoActions.removeProject()),
        addElement: (element) => dispatch(canvasActions.addElement(element)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar)