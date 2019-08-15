import { createSelector } from 'reselect';
import ElementType from '@/constants/ElementType';

// Data
const dataList = state => state.dataReducer.dataList;
const fieldsList = state => state.dataReducer.fieldsList;
const dataIndex = state => state.dataReducer.dataIndex;

// Chart
const elementIndex = state => state.canvas.elementIndex;
const scenes = state => state.timeline.scenes;
const sceneIndex = state => state.timeline.index;

export const getCurrentData = createSelector(
    dataList,
    dataIndex,
    (dataList, dataIndex) => {
        return {
            values: dataList[dataIndex]
        };
    }
)

export const getCurrentFields = createSelector(
    fieldsList,
    dataIndex,
    (fieldsList, dataIndex) => fieldsList[dataIndex]
)

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