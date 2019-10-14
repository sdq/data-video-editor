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
        console.log(scenes[sceneIndex].elements());
        console.log(elementIndex);
        const currentElement = scenes[sceneIndex].elements()[elementIndex];
        if (currentElement.type() === ElementType.CHART) {
            return scenes[sceneIndex].elements()[elementIndex].info();
        } else {
            return {}
        }
    }
)

export const channels = createSelector(
    displaySpec,
    (displaySpec) => {
        const channels = {
            x: {
                name: 'x',
                isEncoded: false,
                field: ''
            },
            y: {
                name: 'y',
                isEncoded: false,
                field: ''
            },
        }
        if (_.isEmpty(displaySpec) || displaySpec === "") {
            return channels;
        }
        const encoding = displaySpec["encoding"];
        if ("x" in encoding && "field" in encoding["x"]) {
            channels.x.isEncoded = true;
            channels.x.field = encoding["x"]["field"];
        }
        if ("y" in encoding && "field" in encoding["y"]) {
            channels.y.isEncoded = true;
            channels.y.field = encoding["y"]["field"];
        }
        return channels;
    }
)