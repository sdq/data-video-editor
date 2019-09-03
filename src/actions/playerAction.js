import ActionType from '@/actions/types';

export const playVideo = () => ({
    type: ActionType.PLAY_VIDEO,
})

export const pauseVideo = () => ({
    type: ActionType.PAUSE_VIDEO,
})

export const stopVideo = () => ({
    type: ActionType.STOP_VIDEO,
})

export const playScene = (sceneIndex) => ({
    type: ActionType.PLAY_SCENE,
    sceneIndex
})

export const pauseScene = (sceneIndex) => ({
    type: ActionType.PAUSE_SCENE,
    sceneIndex
})

export const stopScene = (sceneIndex) => ({
    type: ActionType.STOP_SCENE,
    sceneIndex
})