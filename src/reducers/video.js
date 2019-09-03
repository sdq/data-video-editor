import ActionType from '../actions/types';
import scenes from './demo';

const initialState = {
    scenes: scenes,
    index: 1,
};

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    var newScenes = newState.scenes.slice();
    switch (action.type) {
        case ActionType.SELECT_SCENE:
            newState.index = action.index;
            return newState;
        case ActionType.ADD_SCENE:
            newScenes.push(action.scene);
            newState.scenes = newScenes;
            // newState.video.add(action.scene)
            newState.index = newScenes.length - 1;
            return newState;
        case ActionType.REMOVE_SCENE:
            newScenes.splice(action.index, 1);
            newState.scenes = newScenes;
            // newState.video.remove(action.index)
            newState.index = 0;
            return newState
        case ActionType.UPDATE_SCENE:
            newScenes[action.index] = action.scene;
            newState.scenes = newScenes;
            //newState.video.update(action.index, action.scene);
            return newState
        case ActionType.REORDER_SCENE:
            const [moved] = newScenes.splice(action.sourceIndex, 1);
            newScenes.splice(action.destinationIndex, 0, moved);
            newState.scenes = newScenes;
            newState.index = action.destinationIndex;
            return newState;
        case ActionType.ADD_ELEMENT: //TODO: track information
            newScenes[action.index] = action.scene;
            newState.scenes = newScenes;
            //newState.video.update(action.index, action.scene);
            return newState;
        default:
            return state
    }
}
