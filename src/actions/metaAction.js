import ActionType from '@/actions/types';

export const undoCanvas = () => ({
    type: ActionType.UNDO_CANVAS,
})

export const redoCancas = () => ({
    type: ActionType.REDO_CANVAS,
})