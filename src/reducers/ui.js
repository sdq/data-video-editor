import UIMode from '../constants/UIMode';
import ActionType from '../actions/types';

const initialState = {
    uimode: UIMode.STORYLINE_MODE,
    showResourcePane: true,
    showToolPane: true,
    showAnimationTargetArea: false,
    showResourceTargetArea: false,
    showMusicTargetArea: false,
    showPathLayer:false,
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    switch (action.type) {
    
        case ActionType.DISPLAY_STORYLINE:
            if (state.uimode === UIMode.STORYLINE_MODE) {
                return state
            } else {
                newState.uimode = UIMode.STORYLINE_MODE;
                return newState;
            }

        case ActionType.DISPLAY_TRACK_EDITOR:
            if (state.uimode === UIMode.TRACK_MODE) {
                return state
            } else {
                newState.uimode = UIMode.TRACK_MODE;
                return newState;
            }

        case ActionType.DISPLAY_ANIMATION_TARGET_AREA:
            if (state.showAnimationTargetArea === action.isActive) {
                return state;
            } else {
                newState.showAnimationTargetArea = action.isActive;
                return newState;
            }

            
        case ActionType.DISPLAY_PATHLAYER:
                if (state.showPathLayer === action.isActive) {
                    return state;
                } else {
                    newState.showPathLayer = action.isActive;
                    return newState;
                }

        case ActionType.DISPLAY_RESOURCE_TARGET_AREA:
            if (state.showResourceTargetArea === action.isActive) {
                return state;
            } else {
                newState.showResourceTargetArea = action.isActive;
                return newState;
            }

        case ActionType.DISPLAY_MUSIC_TARGET_AREA:
            if (state.showMusicTargetArea === action.isActive) {
                return state;
            } else {
                newState.showMusicTargetArea = action.isActive;
                return newState;
            }

        case ActionType.DISPLAY_RESOURCE_PANE:
            if (state.showResourcePane === action.isActive) {
                return state;
            } else {
                newState.showResourcePane = action.isActive;
                return newState;
            }

        case ActionType.DISPLAY_TOOL_PANE:
            if (state.showToolPane === action.isActive) {
                return state;
            } else {
                newState.showToolPane = action.isActive;
                return newState;
            }

        default:
            return state
    }
}