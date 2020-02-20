import Scene from './models/Scene';
import Video from './models/Video';
import { Element, TextInfo } from './models/Element';
import ElementType from './constants/ElementType';
import AnimationType from './animation/AnimationType';
import AnimationModel from './animation/AnimationModel';

const demotext = new TextInfo(
    //"欢迎使用",
    "welcome",
    320,
    205,
    0,
    'black',
    40,
)



const element = new Element(ElementType.TEXT, demotext);
element.duration(8.0);

const animation0 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'FADEIN');
animation0.start(3);
animation0.duration(8);
element.add(animation0);
const scene1 = new Scene("welcome page", 10.0);
scene1.addElement(element);



const video = new Video(1);
video.id(1);
video.add(scene1);

const scenes = [scene1];

export default scenes;