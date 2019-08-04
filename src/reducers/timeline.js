import ActionType from '../constants/ActionType';
import Scene from '../models/Scene';
import { Element, ImageInfo, TextInfo} from '../models/Element';
import ElementType from '../constants/ElementType';

const demoimage = new ImageInfo(
    "http://localhost:8080/images/man.png",
    240,
    30,
    100,
    100,
    0,
)
const demotext = new TextInfo(
    "这是一段字幕文本，这是一段字幕文本，这是一段字幕文本",
    160,
    320,
)
const element1 = new Element(ElementType.IMAGE, demoimage);
const element2 = new Element(ElementType.TEXT, demotext);
const scene = new Scene([element1, element2], 1);

const blankScene = new Scene([], 1);

const initialState = {
    scenes: [scene],
    index: 0,
}

export default (state = initialState, action) => {
    const newState = Object.assign({},state);
    var newScenes = newState.scenes.slice();
    switch (action.type) {
        case ActionType.SELECT_SCENE:
            newState.index = action.index;
            return newState;
        case ActionType.ADD_SCENE:
            console.log(newScenes);
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
        case ActionType.ADD_ELEMENT:
            newScenes[action.index] = action.scene;
            newState.scenes = newScenes;
            return newState
        default:
            return state
    }
}
