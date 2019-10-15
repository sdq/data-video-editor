import ActionType from '../actions/types';

const initialState = {
    isElementSelected: false,
    elementIndex: -1,
    elementName: '',
    actionHistory: [],
    dragPos:'', // for tool display
    transformInfo:'', // for tool display
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    newState.actionHistory = state.actionHistory.slice();
    newState.actionHistory.push(action);
    switch (action.type) {
        case ActionType.SELECT_ELEMENT:
            newState.isElementSelected = true;
            newState.elementIndex = action.elementIndex;
            newState.elementName = action.elementName;
            return newState;
        case ActionType.DRAG_ELEMENT:
            newState.dragPos = action.dragPos;
            return newState;
        case ActionType.TRANSFORM_ELEMENT:
            newState.transformInfo = action.transformInfo;
            return newState;
        case ActionType.UNSELECT_ELEMENT:
            newState.isElementSelected = false;
            newState.elementIndex = -1;
            newState.elementName = '';
            return newState;
        case ActionType.ADD_ELEMENT:
            newState.isElementSelected = false;
            newState.elementIndex = -1;
            newState.elementName = '';
            return newState;
        case ActionType.REMOVE_ELEMENT:
            newState.isElementSelected = false;
            newState.elementIndex = -1;
            newState.elementName = '';
            return newState
        case ActionType.UPDATE_ELEMENT:
            //TODO: add action detail
            newState.isElementSelected = true;
            newState.elementIndex = action.elementIndex;
            newState.elementName = action.elementName;
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