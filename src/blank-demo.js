import Scene from './models/Scene';
import Video from './models/Video';
import { Element, TextInfo } from './models/Element';
import ElementType from './constants/ElementType';
import AnimationType from './animation/AnimationType';
import AnimationModel from './animation/AnimationModel';

const demotext = new TextInfo(
    "欢迎使用",
    320,
    205,
    0,
    'black',
    40,
)

const demotext2 = new TextInfo(
    "如果您的设备屏幕过小，请适当缩小浏览器页面比例，以保证使用     ",
    255,
    268,
    0,
    'black',
    10,
)

const element = new Element(ElementType.TEXT, demotext);
const element2 = new Element(ElementType.TEXT, demotext2);
element.duration(8.0);
element2.duration(8.0);
const animation0 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'FADEIN');
animation0.start(3);
animation0.duration(8);
element.add(animation0);
const scene1 = new Scene("welcome page", 10.0);
scene1.addElement(element);
scene1.addElement(element2);



const video = new Video(1);
video.id(1);
video.add(scene1);

const scenes = [scene1];

export default scenes;