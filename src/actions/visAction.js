import VisActionType from '../constants/VisActionType';

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