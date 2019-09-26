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
//控制音频 
export const playAudio = (sceneIndex) => ({
    type: ActionType.PLAY_AUDIO,
    sceneIndex
})

export const pauseAudio = (sceneIndex) => ({
    type: ActionType.PAUSE_AUDIO,
    sceneIndex
})

export const prePlayAudio = (sceneIndex) => ({
    type: ActionType.PRE_PLAY_AUDIO,
    sceneIndex
})
export const backPlayAudio = (sceneIndex) => ({
    type: ActionType.BACK_PLAY_AUDIO,
    sceneIndex
})