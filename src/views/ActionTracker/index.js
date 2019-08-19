import { connect } from 'react-redux';
import ActionTracker from './ActionTracker';
import { actionHistory } from '@/selectors/canvas';

const mapStateToProps = state => {
    return {
        actionHistory: actionHistory(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActionTracker)