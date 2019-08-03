import ActionType from '../constants/ActionType';
import Scene from '../models/Scene';

const blankScene = new Scene([], 3);

const initialState = {
    timeline: [blankScene],
    index: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {

    case ActionType.SELECT_SCENE:
        return { ...state }
    case ActionType.ADD_SCENE:
        return { ...state }
    case ActionType.REMOVE_SCENE:
        return { ...state }
    case ActionType.UPDATE_SCENE:
        return { ...state }
    case ActionType.REORDER_SCENE:
        return { ...state }

    default:
        return state
    }
}
