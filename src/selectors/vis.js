import { createSelector } from 'reselect';
import ElementType from '@/constants/ElementType';
import _ from 'lodash';

// Data
export const dataNameList = state => state.vis.dataNameList;
export const dataList = state => state.vis.dataList;
export const fieldsList = state => state.vis.fieldsList;
export const dataIndex = state => state.vis.dataIndex;

// Chart
const elementIndex = state => state.canvas.elementIndex;
const scenes = state => state.video.scenes;
const sceneIndex = state => state.video.index;
export const displaySpec = state => state.vis.displaySpec;

export const currentData = createSelector(
    dataIndex,
    dataNameList,
    dataList,
    fieldsList,
    (dataIndex, dataNameList, dataList, fieldsList) => {
        console.log(dataNameList)
        return {
            'name': dataNameList[dataIndex],
            'data': dataList[dataIndex],
            'fields': fieldsList[dataIndex]
        }
    }
)

export const currentVis = createSelector(
    scenes,
    sceneIndex,
    elementIndex,
    function (scenes, sceneIndex, elementIndex) {
        if (elementIndex === -1) {
            return {}
        }
        const currentElement = scenes[sceneIndex].elements()[elementIndex];
        if (currentElement.type() === ElementType.CHART) {
            return scenes[sceneIndex].elements()[elementIndex].info();
        } else {
            return {}
        }
    }
)

export const slots = createSelector(
    displaySpec,
    (displaySpec) => {
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
        if (_.isEmpty(displaySpec) || displaySpec === "") {
            return slots;
        }
        const encoding = displaySpec["encoding"];
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