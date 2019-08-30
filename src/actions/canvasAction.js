import ActionType from '../constants/ActionType';

export const selectElement = (elementIndex, elementName) => ({
    type: ActionType.SELECT_ELEMENT,
    elementIndex,
    elementName,
})

export const unselectElement = () => ({
    type: ActionType.UNSELECT_ELEMENT,
})

export const addElement = (element) => ({
    type: ActionType.ADD_ELEMENT,
    element,
})

export const updateElement = (element, elementIndex, elementName, updateInfo) => ({
    type: ActionType.UPDATE_ELEMENT,
    element,
    elementIndex,
    elementName,
    updateInfo,
})

export const removeElement = (element, elementIndex) => ({
    type: ActionType.REMOVE_ELEMENT,
    element,
    elementIndex,
})

export const reorderElement = (sourceIndex, destinationIndex) => ({
    type: ActionType.REORDER_ELEMENT,
    sourceIndex,
    destinationIndex,
})