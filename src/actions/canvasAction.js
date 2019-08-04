import ActionType from '../constants/ActionType';

export const addElement = (element, sceneIndex) => ({
    type: ActionType.ADD_ELEMENT,
    element,
    sceneIndex
})