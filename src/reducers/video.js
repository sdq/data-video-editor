import ActionType from '../actions/types';
//import scenes from '../yicai-demo';
//import scenes from '../car-demo';
import scenes from '../blank-demo';//bug

import _ from 'lodash';

let initialPast = [];
let initialFuture = [];
for (let i=0;i<(scenes.length+1);i++){
    initialPast.push([]);
    initialFuture.push([]);
}

const initialState = {
    //根据数据更改
    past:initialPast,
    future:initialFuture,
    scenes: scenes,
    index: 0,
    backgroundMusic : null,
    backgroundMusicName : "none",
};

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    const newScenes = newState.scenes.slice();
    const newPast = newState.past.slice();
    switch (action.type) {
        case ActionType.SELECT_SCENE:
            newState.index = action.index;
            return newState;
        case ActionType.ADD_SCENE:
            newState.past.push([]);
            newState.future.push([]);
            newScenes.push(action.scene);
            newState.scenes = newScenes;
            // newState.video.add(action.scene)
            newState.index = newScenes.length - 1;
            return newState;
        case ActionType.REMOVE_SCENE:
            newState.past.splice(action.index, 1);
            newState.future.splice(action.index, 1);
            newScenes.splice(action.index, 1);
            newState.scenes = newScenes;
            //newState.video.remove(action.index)
            newState.index = action.index>0?action.index-1:0;//定位到上一个
            return newState
        case ActionType.UPDATE_SCENE:
            newPast[action.index].push(_.cloneDeep(newScenes[action.index]));
            newState.past = newPast;
            newScenes[action.index] = action.scene;
            newState.scenes = newScenes;
            newState.future[action.index] = []
            // newState.video.update(action.index, action.scene);
            return newState
        case ActionType.UNDO_CANVAS: 
            if(newState.past[action.index].length === 0) return newState;
            newState.future[action.index].push(_.cloneDeep(newScenes[action.index]));
            let undoScene = newState.past[action.index].pop();
            newScenes[action.index] = undoScene;
            newState.scenes = newScenes;
            return newState;
        case ActionType.REDO_CANVAS:           
            if(newState.future[action.index].length === 0) return newState;
            newState.past[action.index].push(_.cloneDeep(newScenes[action.index])) 
            newScenes[action.index] = newState.future[action.index].pop();       
            newState.scenes = newScenes;
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
        case ActionType.ADD_PROJECT:
            return newState;
        case ActionType.REMOVE_PROJECT:
            newState.past.length = 1;
            newState.future.length = 1;
            newScenes.length = 1;//clear to at least one scene
            newState.scenes = newScenes;
            newState.index = 0;
            return newState;  
        case ActionType.ADD_BACKGROUND_MUSIC:
            newState.backgroundMusic = action.backgroundMusic;
            newState.backgroundMusicName = action.elementName;
            return newState;     
        default:
            return state
    }
}
