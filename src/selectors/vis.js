import { createSelector } from 'reselect';
import ElementType from '@/constants/ElementType';
import { getChannels } from '@/charts/Info';
import _ from 'lodash';

// Data
export const dataNameList = state => state.vis.dataNameList;
export const dataList = state => state.vis.dataList;
export const fieldsList = state => state.vis.fieldsList;
const dataIndex = state => state.vis.dataIndex;

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
            'dataIndex': dataIndex,
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
        if (currentElement && currentElement.type() === ElementType.CHART) {
            return scenes[sceneIndex].elements()[elementIndex].info();
        } else {
            return {}
        }
    }
)

export const channels = createSelector(
    displaySpec,
    scenes,
    sceneIndex,
    elementIndex,
    (displaySpec, scenes, sceneIndex, elementIndex) => {
        if (elementIndex === -1) {
            return {}
        }
        const currentElement = scenes[sceneIndex].elements()[elementIndex];
        if (!currentElement || currentElement.type() !== ElementType.CHART) {
            return {}
        }
        const chartInfo = currentElement.info();
        const channels = getChannels(chartInfo.category, chartInfo.type)
        // const channels = {
        //     x: {
        //         name: 'x',
        //     },
        //     y: {
        //         name: 'y',
        //     },
        // }
        for (const key in channels) {
            channels[key].isEncoded = false;
            channels[key].field = '';
        }
        if (_.isEmpty(displaySpec) || displaySpec === "") {
            return channels;
        }
        const encoding = displaySpec["encoding"];
        for (const channel in encoding) {
            if (channels.hasOwnProperty(channel) && "field" in encoding[channel]) {
                channels[channel].isEncoded = true;
                channels[channel].field = encoding[channel]["field"];
            }
        }
        return channels;
    }
)