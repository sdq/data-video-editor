import { createSelector } from 'reselect';
import { getChannels } from '@/charts/Info';
import {chart} from '@/chart';
import _ from 'lodash';

// Data
export const dataNameList = state => state.vis.dataNameList;
export const dataList = state => state.vis.dataList;
export const fieldsList = state => state.vis.fieldsList;
const dataIndex = state => state.vis.dataIndex;

// Chart
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
const chartInfo = {
    dataIndex: 0,
    type: chart,
    spec: {}
}


export const currentVis = createSelector(
    function () {
        return chartInfo
    }
)

export const channels = createSelector(
    displaySpec,
    (displaySpec) => {
        const channels = getChannels("D3", chartInfo.type)
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


