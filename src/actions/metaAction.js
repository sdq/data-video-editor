import ActionType from '../constants/ActionType';

export const undoCanvas = () => ({
    type: ActionType.UNDO_CANVAS,
})

export const redoCancas = () => ({
    type: ActionType.REDO_CANVAS,
})