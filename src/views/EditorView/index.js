import { connect } from 'react-redux';
import EditorView from './EditorView';
import {uimode} from '@/selectors/ui';

const mapStateToProps = state => {
    return {
        uimode: uimode(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditorView)