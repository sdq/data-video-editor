import Scene from '../models/Scene';
import Video from '../models/Video';
import { Element, ImageInfo, ChartInfo, TextInfo} from '../models/Element';
import MyURL from '../constants/MyURL';
import ElementType from '../constants/ElementType';
import ChartType from '../constants/ChartType';
import ChartCategory from '../constants/ChartCategory';
// import AnimationType from '../animation/AnimationType';
// import AnimationModel from '../animation/AnimationModel';
import Color from '../constants/Color';

// Demo
const demoimage = new ImageInfo(
    'work.png',
    MyURL.OSS+'/images/vehicle.png',
    250,
    90,
    300,
    167,
    0,
)

const demotext = new TextInfo(
    "英美日小轿车比较",
    250,
    350,
    0,
    'black',
    40,
)

const element1 = new Element(ElementType.IMAGE, demoimage);
const element2 = new Element(ElementType.TEXT, demotext);
element1.duration(10.0);
element2.duration(10.0);
const scene1 = new Scene("Comparison of cars in three countries", 10.0);
scene1.addElement(element1);
scene1.addElement(element2);
// scene1.backgroundColor(Color.CLEAR_BLUE);

const demoimage2 = new ImageInfo(
    'sport.png',
    MyURL.OSS+'/images/blue-car.png',
    382,
    130,
    350,
    252,
    0,
)
const demochart2 = new ChartInfo(
    0,
    ChartCategory.D3,
    ChartType.BARCHART,
    {
        "mark": "bar",
        "encoding": {
          "x": {"field": "Origin", "type": "ordinal"},
          "y": {"field": "Horsepower", "type": "quantitative"},
          "color": {"field": "Origin", "type": "ordinal"},// no use
        },
        "configure": {
            "showAxisX": true,
            "showAxisY": true,
        }
    },
    45,
    100,
    300,
    300,
    0,
)
const demotext21 = new TextInfo(
    "英美日小轿车马力比较",
    45,
    45,
    0,
    'black',
    30,
)

const demotext22 = new TextInfo(
    "美国马力远超另两国",
    400,
    50,
    0,
    'black',
    20,
)

const element02 = new Element(ElementType.CHART, demochart2);
const element12 = new Element(ElementType.IMAGE, demoimage2);
const element21 = new Element(ElementType.TEXT, demotext21);
const element22 = new Element(ElementType.TEXT, demotext22);
element02.duration(10.0);
element12.duration(10.0);
element21.duration(10.0);
element22.duration(10.0);
// const animation1 = new AnimationModel(AnimationType.PRESENTATION_FADE, 'Fade');
// animation1.start(0);
// animation1.duration(10);
// element12.add(animation1);
// const animation2 = new AnimationModel(AnimationType.PRESENTATION_ZOOM, 'Zoom');
// animation2.start(10);
// animation2.duration(10);
// element12.add(animation2);


const scene2 = new Scene("Comparison of car horsepower in three countries", 10.0);
scene2.addElement(element02);
scene2.addElement(element12);
scene2.addElement(element22);
scene2.addElement(element21);
// scene2.backgroundImage(MyURL.OSS+"/backgroundImages/s-classroom.png");

const video = new Video(1);
video.id(2);
video.add(scene1);
video.add(scene2);


const demoimage3 = new ImageInfo(
    'woman.png',
    MyURL.OSS+'/images/red-car.png',
    82,
    172,
    300,
    224,
    0,
)

const demochart3 = new ChartInfo(
    0,
    ChartCategory.VEGALITE,
    ChartType.SCATTERPLOT,
    {
        "mark": "point",
        "encoding": {
          "x": {"field": "Origin", "type": "ordinal"},
          "y": {"field": "Acceleration", "type": "quantitative"},
          "color": {"value": Color.DEEP_ORANGE},
        }
    },
    450,
    100,
    250,
    250,
    0,
)

const demotext3 = new TextInfo(
    "三国小轿车加速度比较",
    450,
    45,
    0,
    'black',
    30,
)

const demotext31 = new TextInfo(
    "美国加速度范围略大",
    200,
    50,
    0,
    'black',
    20,
)

const element31 = new Element(ElementType.CHART, demochart3);
const element32 = new Element(ElementType.IMAGE, demoimage3);
const element33 = new Element(ElementType.TEXT, demotext3);
const element34 = new Element(ElementType.TEXT, demotext31);
element31.duration(10.0);
element32.duration(10.0);
element33.duration(10.0);
element34.duration(10.0);
const scene3 = new Scene("Comparison of car acceleration in three countries", 10.0);
scene3.addElement(element31);
scene3.addElement(element32);
scene3.addElement(element33);
scene3.addElement(element34);



const scenes = [scene1, scene2,scene3];

export default scenes;