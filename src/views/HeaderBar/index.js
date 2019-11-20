import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import {videoDuration} from '@/selectors/video';
import * as uiActions from '@/actions/uiAction';

const mapStateToProps = state => {
    return {
        videoDuration: videoDuration(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar)