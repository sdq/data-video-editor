import { connect } from 'react-redux';
import EditorView from './EditorView';
import * as uiActions from '@/actions/uiAction';
import {uimode, showResourcePane, showToolPane} from '@/selectors/ui';
import { userInfo } from '@/selectors/user';

const mapStateToProps = state => {
    return {
        uimode: uimode(state),
        showResourcePane: showResourcePane(state),
        showToolPane: showToolPane(state),
        userInfo: userInfo(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
            // showpane
            displayResourcePane: (isActive) => dispatch(uiActions.displayResourcePane(isActive)),
            displayToolPane: (isActive) => dispatch(uiActions.displayToolPane(isActive)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditorView)