import VisActionType from '@/actions/visTypes';

export const openEditor = (dataIndex, spec) => ({
    type: VisActionType.OPEN_EDITOR,
    dataIndex,
    spec,
})

// Data

export const addData = (dataName, data, dataSchema) => ({
    type: VisActionType.ADD_DATA,
    dataName,
    data,
    dataSchema
})

export const switchData = (index) => ({
    type: VisActionType.SWITCH_DATA,
    index
})

export const updateData = (index, data, dataSchema) => ({
    type: VisActionType.UPDATE_DATA,
    index,
    data,
    dataSchema
})

export const deleteData = (index) => ({
    type: VisActionType.DELETE_DATA,
    index
})

// Exploration
// Mapping
export const encoding = (channel, field) => ({
    type: VisActionType.ENCODING,
    channel,
    field
})

export const modifyEncoding = (channel, field) => ({
    type: VisActionType.MODIFY_ENCODING,
    channel,
    field
})

export const removeEncoding = (channel, field) => ({
    type: VisActionType.REMOVE_ENCODING,
    channel,
    field
})

export const changeAggregation = (channel, method) => ({
    type: VisActionType.CHANGE_AGGREGATION,
    channel,
    method
})

// Style
export const configureStyle = (style) => ({
    type: VisActionType.CONFIGURE_STYLE,
    style
})

// Animation
export const chooseChartAnimation = (animation) => ({
    type: VisActionType.CHOOSE_CHART_ANIMATION,
    animation
})

export const selectChartAnimation = (animation, index) => ({
    type: VisActionType.SELECT_CHART_ANIMATION,
    animation,
    index,
})

export const selectChartElement = (isSelectingChartElement, parameter) => ({
    type: VisActionType.SELECTING_CHART_ELEMENT,
    isSelectingChartElement,
    parameter,
})

export const addChartAnimation = (animation) => ({
    type: VisActionType.ADD_CHART_ANIMATION,
    animation
})

export const modifyChartAnimation = (index, animation) => ({
    type: VisActionType.MODIFY_CHART_ANIMATION,
    index,
    animation
})

export const removeChartAnimation = (index) => ({
    type: VisActionType.REMOVE_CHART_ANIMATION,
    index
})

export const reorderChartAnimation = (animations) => ({
    type: VisActionType.REORDER_CHART_ANIMATION,
    animations
})
export const interruptSaveChartVideoProcess = ()=>({
    type: VisActionType.INTERRUPT_SAVE_CHART_VIDEO_ANIMATION
})

// Meta
export const undo = () => ({
    type: VisActionType.UNDO_VIS
})

export const redo = () => ({
    type: VisActionType.REDO_VIS
})

// Insight
export const bookmark = (spec, note, time) => ({
    type: VisActionType.BOOKMARK,
    spec,
    note,
    time
})

export const save = (spec) => ({
    type: VisActionType.SAVE,
    spec
})