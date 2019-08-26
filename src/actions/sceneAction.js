import ActionType from '../constants/ActionType';

export const setDuration = (sceneIndex, duration) => ({
    type: ActionType.SET_DURATION,
    sceneIndex,
    duration,
})

export const setPosition = (position) => ({
    type: ActionType.SET_POSITION,
    position,
})