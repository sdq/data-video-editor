import ActionType from '@/actions/types';

export const undoCanvas = (index) => ({
    type: ActionType.UNDO_CANVAS,
    index
})

export const redoCanvas = (index) => ({
    type: ActionType.REDO_CANVAS,
    index
})