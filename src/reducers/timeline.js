import ActionType from '../constants/ActionType';
import Scene from '../models/scene';

const blankScene = new Scene([], 5);

const initialState = {
    timeline: [blankScene],
    index: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {

    case ActionType.SELECT_SCENE:
        return { ...state, ...payload }
    case ActionType.ADD_SCENE:
        return { ...state, ...payload }
    case ActionType.REMOVE_SCENE:
        return { ...state, ...payload }
    case ActionType.UPDATE_SCENE:
        return { ...state, ...payload }
    case ActionType.REORDER_SCENE:
        return { ...state, ...payload }

    default:
        return state
    }
}
