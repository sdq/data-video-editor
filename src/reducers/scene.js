import ActionType from '../constants/ActionType';

const initialState = {
    position: 0,
    scale: 5,
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    switch (action.type) {
        case ActionType.SET_POSITION:
            newState.position = action.position;
            return newState;
        case ActionType.SET_SCENE_SCALE:
            newState.scale = action.scale;
            return newState;
        default:
            return state;
    }
}