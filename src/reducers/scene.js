import ActionType from '../constants/ActionType';

const initialState = {
    position: 0
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    switch (action.type) {
        case ActionType.SET_POSITION:
            newState.position = action.position;
            return newState
        default:
            return state
    }
}