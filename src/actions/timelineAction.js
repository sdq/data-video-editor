import ActionType from '../constants/ActionType';

export const selectScene = (index) => ({
    type: ActionType.SELECT_SCENE,
    index
})

export const addScene = (scene) => ({
    type: ActionType.ADD_SCENE,
    scene
})

export const removeScene = (index) => ({
    type: ActionType.REMOVE_SCENE,
    index
})

export const updateScene = (index, scene) => ({
    type: ActionType.UPDATE_SCENE,
    index,
    scene
})

export const reorderScene = (scenes) => ({
    type: ActionType.REORDER_SCENE,
    scenes
})
