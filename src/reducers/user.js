import ActionType from '../actions/types';

let userFolderId = sessionStorage.getItem('userFolderId') ? JSON.parse(sessionStorage.getItem('userFolderId')) : '';
let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
const initialState = {
    userFolderId,
    userInfo
}

export default (state = initialState, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ActionType.UPDATE_USER_FOLDER:
            sessionStorage.setItem('userFolderId', JSON.stringify(action.userFolderId));
            newState.userFolderId = action.userFolderId;
            return newState;
        case ActionType.UPDATE_USER_INFO:
            sessionStorage.setItem('userInfo', JSON.stringify(action.userInfo));
            newState.userInfo = {
                emailNum: action.userInfo.emailNum
            };
            return newState;
        default:
            return state;
    }


}