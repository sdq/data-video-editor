import ActionType from '../constants/ActionType';

const initialState = {
    isPerforming: false
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    switch (action.type) {
        case ActionType.PLAY_VIDEO:
            newState.isPerforming = true
            return newState
        case ActionType.STOP_VIDEO:
            newState.isPerforming = false
            return newState
        case ActionType.PLAY_SCENE:
            newState.isPerforming = true
            return newState
        case ActionType.STOP_SCENE:
            newState.isPerforming = false
            return newState
        default:
            return state
    }
}