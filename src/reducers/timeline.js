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
    switch (action.type) {

    case ActionType.SELECT_SCENE:
        return { ...state }
    case ActionType.ADD_SCENE:
        return { ...state }
    case ActionType.REMOVE_SCENE:
        return { ...state }
    case ActionType.UPDATE_SCENE:
        return { ...state }
    case ActionType.REORDER_SCENE:
        return { ...state }

    default:
        return state
    }
}
