import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import {videoDuration} from '@/selectors/video';
import * as uiActions from '@/actions/uiAction';
import {uimode, showResourcePane, showToolPane} from '@/selectors/ui';

const mapStateToProps = state => {
    return {
        videoDuration: videoDuration(state),
        uimode: uimode(state),
        showResourcePane: showResourcePane(state),
        showToolPane: showToolPane(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayTrackEditor: () => dispatch(uiActions.displayTrackEditor()),
        displayResourcePane: (isActive) => dispatch(uiActions.displayResourcePane(isActive)),
        displayToolPane: (isActive) => dispatch(uiActions.displayToolPane(isActive)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar)