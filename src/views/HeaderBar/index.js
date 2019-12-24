import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import {videoDuration ,scenes} from '@/selectors/video';
import * as uiActions from '@/actions/uiAction';

const mapStateToProps = state => {
    return {
        videoDuration: videoDuration(state),
        scenes: scenes(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar)