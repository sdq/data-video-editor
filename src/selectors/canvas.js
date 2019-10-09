import { createSelector } from 'reselect';

export const isElementSelected = state => state.canvas.isElementSelected;
export const elementIndex = state => state.canvas.elementIndex;
export const elementName = state => state.canvas.elementName;
export const actionHistory = state => state.canvas.actionHistory;
export const dragPos = state => state.canvas.dragPos;
export const transformInfo = state => state.canvas.transformInfo;

const scenes = state => state.video.scenes;
const sceneIndex = state => state.video.index;

export const currentElements = createSelector(
    scenes,
    sceneIndex,
    function(scenes, sceneIndex) {
        return scenes[sceneIndex].elements();
    }
)

export const currentElement = createSelector(
    currentElements,
    elementIndex,
    function(currentElements, elementIndex) {
        return currentElements[elementIndex];
    }
)