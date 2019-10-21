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

export const configure = (configuration) => ({
    type: VisActionType.CONFIGURE,
    configuration
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