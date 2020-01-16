import { connect } from "react-redux";
import LogInView from './Login/LogInView';
import { userFolderId } from '@/selectors/user';
import * as userActions from '@/actions/userActions';


const mapStateToProps = state => {
    return {
        userFolderId: userFolderId(state),
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        updateUserFolder: (userFolderId) => dispatch(userActions.updateUserFolder(userFolderId)),
        updateUserInfo: (updateUserInfo) => dispatch(userActions.updateUserInfo(updateUserInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInView)