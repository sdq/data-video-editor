import ActionType from '../constants/ActionType';

const initialState = {
    isSelected: false,
    elementIndex: -1,
    actionHistory: [],
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    newState.actionHistory = state.actionHistory.slice();
    newState.actionHistory.push(action);
    switch (action.type) {
        case ActionType.SELECT_ELEMENT:
            newState.isSelected = true;
            newState.elementIndex = action.elementIndex;
            return newState;
        case ActionType.UNSELECT_ELEMENT:
            newState.isSelected = false;
            newState.elementIndex = -1;
            return newState;
        case ActionType.ADD_ELEMENT:
            newState.isSelected = false;
            newState.elementIndex = -1;
            return newState;
        case ActionType.REMOVE_ELEMENT:
            newState.isSelected = false;
            newState.elementIndex = -1;
            return newState
        case ActionType.UPDATE_ELEMENT:
            //TODO: add action detail
            newState.isSelected = true;
            newState.elementIndex = action.elementIndex;
            return newState
        case ActionType.UNDO_CANVAS:
            //TODO: reorder
            return state
        case ActionType.REDO_CANVAS:
            //TODO: reorder
            return state
        default:
            return state
    }
}