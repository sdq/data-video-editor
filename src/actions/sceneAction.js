import ActionType from './types';

export const setDuration = (sceneIndex, duration) => ({
    type: ActionType.SET_DURATION,
    sceneIndex,
    duration,
})

export const setPosition = (position) => ({
    type: ActionType.SET_POSITION,
    position,
})

export const setSceneScale = (scale) => ({
    type: ActionType.SET_SCENE_SCALE,
    scale,
})