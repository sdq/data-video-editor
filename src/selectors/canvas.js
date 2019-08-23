import { createSelector } from 'reselect';

export const isElementSelected = state => state.canvas.isElementSelected;
export const elementIndex = state => state.canvas.elementIndex;
export const actionHistory = state => state.canvas.actionHistory;

const scenes = state => state.timeline.scenes;
const sceneIndex = state => state.timeline.index;

export const currentElements = createSelector(
    scenes,
    sceneIndex,
    function(scenes, sceneIndex) {
        return scenes[sceneIndex].elements;
    }
)

export const currentElement = createSelector(
    currentElements,
    elementIndex,
    function(currentElements, elementIndex) {
        return currentElements[elementIndex];
    }
)