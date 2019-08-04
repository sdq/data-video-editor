import ActionType from '../constants/ActionType';
import Scene from '../models/Scene';
import { Element, ImageInfo, TextInfo} from '../models/Element';
import SceneType from '../constants/SceneType';

const demoimage = new ImageInfo(
    "http://localhost:8080/images/man.png",
    100,
    100,
    100,
    100,
    0,
)
const demotext = new TextInfo(
    "http://localhost:8080/images/man.png",
    100,
    100,
)
const element1 = new Element(SceneType.IMAGE, demoimage);
const element2 = new Element(SceneType.TEXT, demotext);
const scene = new Scene([element1, element2], 5);

const blankScene = new Scene([], 3);

const initialState = {
    scenes: [blankScene, scene],
    index: 1,
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    var newScenes = newState.scenes;
    switch (action.type) {
        case ActionType.SELECT_SCENE:
            newState.index = action.index;
            return newState;
        case ActionType.ADD_SCENE:
            newScenes.push(action.scene);
            newState.scenes = newScenes;
            newState.index = newScenes.length - 1;
            return newState;
        case ActionType.REMOVE_SCENE:
            newScenes.splice(action.index, 1);
            newState.scenes = newScenes;
            newState.index = 0;
            return newState
        case ActionType.UPDATE_SCENE:
            newScenes[action.index] = action.scene;
            newState.scenes = newScenes;
            return newState
        case ActionType.REORDER_SCENE:
            //TODO: reorder
            return state

        default:
            return state
    }
}
