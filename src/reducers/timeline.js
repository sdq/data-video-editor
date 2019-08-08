import ActionType from '../constants/ActionType';
import Scene from '../models/Scene';
import { Element, ImageInfo, ChartInfo, TextInfo} from '../models/Element';
import URL from '../constants/URL';
import ElementType from '../constants/ElementType';
import ChartType from '../constants/ChartType';

const demoimage = new ImageInfo(
    URL.OSS+'/images/man.png',
    300,
    60,
    100,
    100,
    0,
)
const demochart = new ChartInfo(
    '',
    ChartType.BARCHART,
    '',
    10,
    10,
    100,
    100,
    0,
)
const demotext = new TextInfo(
    "一个年轻的男子，坐在街道旁的椅子上发呆。他的身旁有一个路灯和灌木。",
    100,
    360,
)
const element0 = new Element(ElementType.CHART, demochart);
const element1 = new Element(ElementType.IMAGE, demoimage);
const element2 = new Element(ElementType.TEXT, demotext);
const scene = new Scene([element0, element1, element2], 1);

//const blankScene = new Scene([], 1);

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
