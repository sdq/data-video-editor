import { createSelector } from 'reselect';
import ElementType from '@/constants/ElementType';

const elementIndex = state => state.canvas.elementIndex;
const scenes = state => state.timeline.scenes;
const sceneIndex = state => state.timeline.index;

export const currenVis = createSelector(
    scenes,
    sceneIndex,
    elementIndex,
    function(scenes, sceneIndex, elementIndex) {
        const currentElement = scenes[sceneIndex].elements[elementIndex];
        if (currentElement.type()===ElementType.ChartType) {
            return scenes[sceneIndex].elements[elementIndex].info();
        } else {
            return {}
        }
    }
)