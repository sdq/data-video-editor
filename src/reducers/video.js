import ActionType from '../actions/types';
import scenes from './demo';
import { Array } from 'core-js';

const initialState = {
    past:new Array(new Array(),new Array()),
    future:[],
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
            //TODO:
            newScenes.push(action.scene);
            newState.scenes = newScenes;
            // newState.video.add(action.scene)
            newState.index = newScenes.length - 1;
            return newState;
        case ActionType.REMOVE_SCENE:
            //TODO:
            newScenes.splice(action.index, 1);
            newState.scenes = newScenes;
            // newState.video.remove(action.index)
            newState.index = 0;
            return newState
        case ActionType.UPDATE_SCENE:
            //past
            //TODO:
            
            newState.past[action.index].push(action.scene);

            newScenes[action.index] = action.scene;
            newState.scenes = newScenes;
            //newState.video.update(action.index, action.scene);
            return newState

        case ActionType.UNDO_CANVAS:
            //TODO:
            

            if (newState.past[action.index].length > 0) {
                newState.past[action.index].pop()           
                console.log(newScenes[action.index])
                newScenes[action.index] = newState.past[action.index][newState.past[action.index].length - 1];

            } else return newState;
            
            console.log(newScenes[action.index])
            newState.scenes = newScenes;
            // newState.scenes = newState.past[action.index][newState.past[action.index].length - 1]
            return newState
        case ActionType.REDO_CANVAS:
            //TODO:
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
