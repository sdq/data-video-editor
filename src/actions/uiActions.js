import ActionType from '../constants/ActionType';

export const displayStoryline = () => ({
    type: ActionType.DISPLAY_STORYLINE,
})

export const displayTrackEditor = (sceneIndex) => ({
    type: ActionType.DISPLAY_TRACK_EDITOR,
    sceneIndex
})