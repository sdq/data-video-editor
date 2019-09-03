import Scene from '../models/Scene';
import Video from '../models/Video';
import { Element, ImageInfo, ChartInfo, TextInfo} from '../models/Element';
import MyURL from '../constants/MyURL';
import ElementType from '../constants/ElementType';
import ChartType from '../constants/ChartType';
import Color from '../constants/Color';

// Demo
const demoimage = new ImageInfo(
    'man.png',
    MyURL.OSS+'/images/man.png',
    300,
    60,
    100,
    100,
    0,
)
const demochart = new ChartInfo(
    0,
    ChartType.BARCHART,
    {
        "mark": "bar",
        "encoding": {
          "x": {"field": "Origin", "type": "ordinal"},
          "y": {"field": "Horsepower", "type": "quantitative"},
          "color": {"value": Color.DEEP_ORANGE},
        }
    },
    100,
    40,
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
const scene1 = new Scene("A man is sitting on the chair and thinking about something.", 700);
scene1.addElement(element0);
scene1.addElement(element1);
scene1.addElement(element2);

const demoimage2 = new ImageInfo(
    'woman.png',
    MyURL.OSS+'/images/woman.png',
    120,
    80,
    100,
    100,
    0,
)
const demochart2 = new ChartInfo(
    0,
    ChartType.LINECHART,
    {
        "mark": "line",
        "encoding": {
          "x": {"field": "Displacement", "type": "quantitative"},
          "y": {"field": "Acceleration", "type": "quantitative"},
          "color": {"value": Color.DEEP_ORANGE},
        }
    },
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
const scene2 = new Scene("A woman is sitting on the ground and thinking about something.", 700);
scene2.addElement(element02);
scene2.addElement(element12);
scene2.addElement(element22);

const video = new Video(1);
video.id(2);
video.add(scene1);
video.add(scene2);

// const demo = {
//     video: video,
//     scenes: [scene1, scene2],
//     index: 1,
// }

const scenes = [scene1, scene2];

export default scenes;