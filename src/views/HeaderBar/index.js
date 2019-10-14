import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import {videoDuration} from '@/selectors/video';

const mapStateToProps = state => {
    return {
        videoDuration: videoDuration(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar)