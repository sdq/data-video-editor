import ActionType from '../constants/ActionType';
import Scene from '../models/Scene';
import Video from '../models/Video';
import { Element, ImageInfo, ChartInfo, TextInfo} from '../models/Element';
import URL from '../constants/URL';
import ElementType from '../constants/ElementType';
import ChartType from '../constants/ChartType';

// Demo
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
const scene1 = new Scene("A man is sitting on the chair and thinking about something.", "", [element0, element1, element2], 2);

const demoimage2 = new ImageInfo(
    URL.OSS+'/images/woman.png',
    120,
    80,
    100,
    100,
    0,
)
const demochart2 = new ChartInfo(
    '',
    ChartType.LINECHART,
    '',
    400,
    80,
    100,
    100,
    0,
)
const demotext2 = new TextInfo(
    "一位女士坐在地上正在思考问题。",
    260,
    360,
)
const element02 = new Element(ElementType.CHART, demochart2);
const element12 = new Element(ElementType.IMAGE, demoimage2);
const element22 = new Element(ElementType.TEXT, demotext2);
const scene2 = new Scene("A woman is sitting on the ground and thinking about something.", "", [element02, element12, element22], 2);

const video = new Video(1);
console.log(video.id());
video.id(2);
video.add(scene1);
video.add(scene2);
console.log(video.scenes())

const initialState = {
    video: video,
    scenes: [scene1, scene2],
    index: 1,
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
