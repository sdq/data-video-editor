import { createSelector } from 'reselect';

export const scenes = state => state.video.scenes;
export const sceneIndex = state => state.video.index;
export const past = state => state.video.past;
export const future = state => state.video.future;

export const currentScene = createSelector(
    scenes,
    sceneIndex,
    (scenes, sceneIndex) => scenes[sceneIndex]
)

export const isFirstScene = createSelector(
    sceneIndex,
    (sceneIndex) => sceneIndex === 0
)

export const isLastScene = createSelector(
    scenes,
    sceneIndex,
    (scenes, sceneIndex) => sceneIndex === scenes.length-1
)