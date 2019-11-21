import ActionType from '../actions/types';

const initialState = {
    position: 0,
    scale: 5,
}



export default (state = initialState, action) => {
    switch (action.type) {
        case ActionType.SET_POSITION:
            return {...state, position: action.position};
        case ActionType.SET_SCENE_SCALE:
            return {...state, scale: action.scale};
        default:
            return state;
    }
}