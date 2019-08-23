import ActionType from '../constants/ActionType';

const initialState = {
    isElementSelected: false,
    elementIndex: -1,
    actionHistory: [],
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    newState.actionHistory = state.actionHistory.slice();
    newState.actionHistory.push(action);
    switch (action.type) {
        case ActionType.SELECT_ELEMENT:
            newState.isElementSelected = true;
            newState.elementIndex = action.elementIndex;
            return newState;
        case ActionType.UNSELECT_ELEMENT:
            newState.isElementSelected = false;
            newState.elementIndex = -1;
            return newState;
        case ActionType.ADD_ELEMENT:
            newState.isElementSelected = false;
            newState.elementIndex = -1;
            return newState;
        case ActionType.REMOVE_ELEMENT:
            newState.isElementSelected = false;
            newState.elementIndex = -1;
            return newState
        case ActionType.UPDATE_ELEMENT:
            //TODO: add action detail
            newState.isElementSelected = true;
            newState.elementIndex = action.elementIndex;
            return newState
        case ActionType.REORDER_ELEMENT:
            newState.isElementSelected = true;
            newState.elementIndex = action.destinationIndex;
            return newState
        case ActionType.UNDO_CANVAS:
            //TODO: undo
            return state
        case ActionType.REDO_CANVAS:
            //TODO: redo
            return state
        default:
            return state
    }
}