import ActionType from './types';

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

export const reorderScene = (sourceIndex, destinationIndex) => ({
    type: ActionType.REORDER_SCENE,
    sourceIndex,
    destinationIndex,
})

export const addProject = (source) => ({
    type: ActionType.ADD_PROJECT,
    source,
})

export const removeProject = () => ({
    type: ActionType.REMOVE_PROJECT,
})

export const addBackgroundMusic = (backgroundMusic,elementName)=> ({
    type :ActionType.ADD_BACKGROUND_MUSIC,
    backgroundMusic,
    elementName
})

