import UIMode from '../constants/UIMode';
import ActionType from '../constants/ActionType';

const initialState = {
    uimode: UIMode.STORYLINE_MODE,
    displayAnimationTargetArea: false,
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
            if (state.displayAnimationTargetArea === action.isActive) {
                return state
            } else {
                newState.displayAnimationTargetArea = action.isActive;
                return newState;
            }

        default:
            return state
    }
}