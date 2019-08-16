import VisActionType from '../constants/VisActionType';

export const openEditor = (dataIndex, slots, spec) => ({
    type: VisActionType.OPEN_EDITOR,
    dataIndex,
    slots,
    spec,
})

// Data
export const uploadData = (csvfile) => ({
    type: VisActionType.UPLOAD_DATA,
    csvfile
})

export const changeData = (index) => ({
    type: VisActionType.CHANGE_DATA,
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