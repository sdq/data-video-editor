import { createSelector } from 'reselect';
import ElementType from '@/constants/ElementType';
import _ from 'lodash';

// Data
export const dataList = state => state.vis.dataList;
const fieldsList = state => state.vis.fieldsList;
const dataIndex = state => state.vis.dataIndex;

// Chart
const elementIndex = state => state.canvas.elementIndex;
const scenes = state => state.timeline.scenes;
const sceneIndex = state => state.timeline.index;
export const displaySpec = state => state.vis.displaySpec;

export const getCurrentData = createSelector(
    dataList,
    dataIndex,
    (dataList, dataIndex) => {
        return dataList[dataIndex];
    }
)

export const getCurrentFields = createSelector(
    fieldsList,
    dataIndex,
    (fieldsList, dataIndex) => fieldsList[dataIndex]
)

export const getCurrentVis = createSelector(
    scenes,
    sceneIndex,
    elementIndex,
    function(scenes, sceneIndex, elementIndex) {
        if (elementIndex === -1) {
            return {}
        }
        const currentElement = scenes[sceneIndex].elements[elementIndex];
        if (currentElement.type()===ElementType.CHART) {
            return scenes[sceneIndex].elements[elementIndex].info();
        } else {
            return {}
        }
    }
)

export const getSlots = createSelector(
    getCurrentVis,
    (getCurrentVis) => {
        const slots = {
            x: {
                isEncoded: false,
                name: ""
            },
            y: {
                isEncoded: false,
                name: ""
            },
        }
        if (_.isEmpty(getCurrentVis)) {
            return slots;
        }
        if (getCurrentVis.spec === "") {
            return slots;
        }
        const currentSpec = getCurrentVis.spec;
        const encoding = currentSpec["encoding"];
        if ("x" in encoding && "field" in encoding["x"]) {
            slots.x.isEncoded = true;
            slots.x.name = encoding["x"]["field"];
        }
        if ("y" in encoding && "field" in encoding["y"]) {
            slots.y.isEncoded = true;
            slots.y.name = encoding["y"]["field"];
        }
        return slots;
    }
)