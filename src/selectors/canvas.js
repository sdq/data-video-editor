import { createSelector } from 'reselect';

export const isSelected = state => state.canvas.isSelected;
export const elementIndex = state => state.canvas.elementIndex;
export const actionHistory = state => state.canvas.actionHistory;

const scenes = state => state.timeline.scenes;
const sceneIndex = state => state.timeline.index;

export const currentElement = createSelector(
    scenes,
    sceneIndex,
    elementIndex,
    function(scenes, sceneIndex, elementIndex) {
        return scenes[sceneIndex].elements[elementIndex];
    }
)