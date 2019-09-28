import ActionType from '../actions/types';


const initialState = {
    isPerforming: false,
    isVideoPerforming: false,
    isScenePerforming: false,
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    switch (action.type) {
        case ActionType.PLAY_VIDEO:
            newState.isPerforming = true;
            newState.isVideoPerforming = true;
            newState.isScenePerforming = false;
            return newState
        case ActionType.STOP_VIDEO:
            newState.isPerforming = false;
            newState.isVideoPerforming = false;
            newState.isScenePerforming = false;
            return newState
        case ActionType.PLAY_SCENE:
            newState.isPerforming = true;
            newState.isVideoPerforming = false;
            newState.isScenePerforming = true;
            return newState
        case ActionType.STOP_SCENE:
            newState.isPerforming = false;
            newState.isVideoPerforming = false;
            newState.isScenePerforming = false;
            return newState
        default:
            return state
    }
}