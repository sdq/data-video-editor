import ActionType from './types';

export const selectElement = (elementIndex, elementName) => ({
    type: ActionType.SELECT_ELEMENT,
    elementIndex,
    elementName,
})

export const unselectElement = () => ({
    type: ActionType.UNSELECT_ELEMENT,
})
export const cleanInterationLayer =(isCleanInterationLayer)=>({
    type:ActionType.CLEAN_INTERACTION_LAYER,
    isCleanInterationLayer
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


export const dragElement = (dragPos) => ({ 
    type: ActionType.DRAG_ELEMENT,
    dragPos,
})

export const transformElement = (transformInfo) => ({ 
    type: ActionType.TRANSFORM_ELEMENT,
    transformInfo,
})