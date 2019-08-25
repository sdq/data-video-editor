import ActionType from '../constants/ActionType';

export const setDuration = (sceneIndex, duration) => ({
    type: ActionType.SET_DURATION,
    sceneIndex,
    duration,
})