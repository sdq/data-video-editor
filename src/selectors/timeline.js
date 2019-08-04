import { createSelector } from 'reselect';

export const scenes = state => state.timeline.scenes;
export const sceneIndex = state => state.timeline.index;

export const currentScene = createSelector(
    scenes,
    sceneIndex,
    (scenes, sceneIndex) => scenes[sceneIndex]
)