import { createSelector } from 'reselect';

export const scenes = state => state.timeline.scenes;
export const sceneIndex = state => state.timeline.index;

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