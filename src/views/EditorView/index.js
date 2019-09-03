import { connect } from 'react-redux';
import EditorView from './EditorView';
import {uimode, showResourcePane, showToolPane} from '@/selectors/ui';

const mapStateToProps = state => {
    return {
        uimode: uimode(state),
        showResourcePane: showResourcePane(state),
        showToolPane: showToolPane(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditorView)