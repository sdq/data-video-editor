import ActionType from './types';

export const displayStoryline = () => ({
    type: ActionType.DISPLAY_STORYLINE,
})

export const displayTrackEditor = () => ({
    type: ActionType.DISPLAY_TRACK_EDITOR
})

export const displayAnimationTargetArea = (isActive) => ({
    type: ActionType.DISPLAY_ANIMATION_TARGET_AREA,
    isActive
})


export const displayPathLayer = (isActive) => ({
    type: ActionType.DISPLAY_PATHLAYER,
    isActive
})

export const displayResourceTargetArea = (isActive) => ({
    type: ActionType.DISPLAY_RESOURCE_TARGET_AREA,
    isActive
})

export const displayMusicTargetArea = (isActive) => ({
    type: ActionType.DISPLAY_MUSIC_TARGET_AREA,
    isActive
})

export const displayResourcePane = (isActive) => ({
    type: ActionType.DISPLAY_RESOURCE_PANE,
    isActive
})

export const displayToolPane = (isActive) => ({
    type: ActionType.DISPLAY_TOOL_PANE,
    isActive
})