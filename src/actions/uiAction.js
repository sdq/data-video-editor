import ActionType from '../constants/ActionType';

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

export const displayResourceTargetArea = (isActive) => ({
    type: ActionType.DISPLAY_RESOURCE_TARGET_AREA,
    isActive
})