import Scene from '../models/Scene';
import Video from '../models/Video';
import { Element, ImageInfo, ChartInfo, TextInfo , AudioInfo} from '../models/Element';
import MyURL from '../constants/MyURL';
import ElementType from '../constants/ElementType';
import ChartType from '../constants/ChartType';
import ChartCategory from '../constants/ChartCategory';
import AnimationType from '../animation/AnimationType';
import AnimationModel from '../animation/AnimationModel';
import Color from '../constants/Color';
//var gifFrames = require('gif-frames');
// Demo

const demoaudio1 = new AudioInfo(
    '88mp3.mp3',
    MyURL.OSS+'/images/88mp3.mp3',
    4,
)

const demoimage01 = new ImageInfo(
    'eu.png',
    MyURL.OSS+'/images/eu.png',
    200,
    90,
    80,
    50,
    0,
)
const demoimage002 = new ImageInfo(
    'usa.png',
    MyURL.OSS+'/images/usa.png',
    200,
    150,
    80,
    50,
    0,
)
const demoimage03 = new ImageInfo(
    'japan.png',
    MyURL.OSS+'/images/japan.png',
    200,
    220,
    80,
    50,
    0,
)


const demoimage = new ImageInfo(
    'work.png',
    MyURL.OSS+'/images/vehicle.png',
    320,
    90,
    300,
    167,
    0,
)

const demotext = new TextInfo(
    "英美日三国小轿车比较",
    220,
    350,
    0,
    'black',
    40,
)

const element00 = new Element(ElementType.AUDIO, demoaudio1);
const element01 = new Element(ElementType.IMAGE, demoimage01);
const element002 = new Element(ElementType.IMAGE, demoimage002);
const element03 = new Element(ElementType.IMAGE, demoimage03);
const element1 = new Element(ElementType.IMAGE, demoimage);
const element2 = new Element(ElementType.TEXT, demotext);
element01.duration(4.0);
element002.duration(4.0);
element03.duration(4.0);
element1.duration(4.0);
element2.duration(4.0);
const animation0 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Zoomin');//改成flicker
animation0.start(0);
animation0.duration(3);
element2.add(animation0);
const scene1 = new Scene("Comparison of cars in three countries", 4.0);
scene1.addElement(element00);
scene1.addElement(element01);
scene1.addElement(element002);
scene1.addElement(element03);
scene1.addElement(element1);
scene1.addElement(element2);
// scene1.backgroundColor(Color.CLEAR_BLUE);


const demoaudio222 = new AudioInfo(
    '90mp3.mp3',
    MyURL.OSS+'/images/90mp3.mp3', 
    4,
)
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
    ChartCategory.VEGALITE,
    ChartType.BARCHART,
    {
        "mark": "bar",
        "encoding": {
            "x": {"field": "Origin", "type": "ordinal"},
            "y": {"field": "Horsepower", "type": "quantitative"},
            "color": {"value": Color.DEEP_ORANGE},
        }
    },
    45,
    100,
    260,
    260,
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
//
// let demogif21Frams;
// async function parseGif(gifUrl) {
//     let tempData;
//     await gifFrames(
//         { url: gifUrl, frames: 'all', outputType: 'canvas', cumulative: true },
//         function (err, frameData) {
//             if (err) {
//                 throw err;
//             }
//             tempData= frameData;
//         }
//     );
//     console.log("tempData",tempData)
//     return tempData;
// }



// const demogif22 = new GifInfo(
//     'walking.gif',
//     MyURL.OSS+'/gifs/walking.gif',
//     1,
//     1,
//     200,
//     50,
//     100,
//     100,
// )
const element2222 = new Element(ElementType.AUDIO, demoaudio222);
const element02 = new Element(ElementType.CHART, demochart2);
const element12 = new Element(ElementType.IMAGE, demoimage2);
const element21 = new Element(ElementType.TEXT, demotext21);
const element22 = new Element(ElementType.TEXT, demotext22);

element02.start(1.0);  //没用
element12.start(1.0);
element2222.duration(10.0);
element02.duration(10.0);
element12.duration(10.0);
element21.duration(10.0);
element22.duration(10.0);

//添加动画后图表爆炸  无法全部加上动画
const animation1 = new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'zoomin');
animation1.start(0);
animation1.duration(2);
//element12.add(animation1);
element02.add(animation1);
//element21.add(animation1);
//element22.add(animation1);




const scene2 = new Scene("Comparison of car horsepower in three countries", 10.0);
scene2.addElement(element2222);
scene2.addElement(element02);
scene2.addElement(element12);
scene2.addElement(element22);
scene2.addElement(element21);


// let demogif21;
// (async () => {
//     demogif21Frams = await  parseGif(MyURL.OSS+'/gifs/walking.gif');
//     console.log("demogif21Frams",demogif21Frams)
//     demogif21 = new GifInfo(
//         'walking.gif',
//         MyURL.OSS+'/gifs/walking.gif',
//         1,
//         demogif21Frams,
//         200,
//         50,
//         100,
//         100,
//     )

//     const element221 = new Element(ElementType.GIF, demogif21);
//     element221.duration(10.0);
//     scene2.addElement(element221);
// })();


// const element222 = new Element(ElementType.GIF, demogif22);

// element222.duration(10.0);

// scene2.addElement(element222);

// scene2.backgroundImage(MyURL.OSS+"/backgroundImages/s-classroom.png");

const video = new Video(1);
video.id(2);
video.add(scene1);
video.add(scene2);


const demoaudio333 = new AudioInfo(
    '91mp3.mp3',
    MyURL.OSS+'/images/91mp3.mp3', 
    4,
)

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

const element333 = new Element(ElementType.AUDIO, demoaudio333);
const element31 = new Element(ElementType.CHART, demochart3);
const element32 = new Element(ElementType.IMAGE, demoimage3);
const element33 = new Element(ElementType.TEXT, demotext3);
const element34 = new Element(ElementType.TEXT, demotext31);
element333.duration(10.0);
element31.duration(10.0);
element32.duration(10.0);
element33.duration(10.0);
element34.duration(10.0);

 const animation2 = new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoomin');
animation2.start(0);
animation2.duration(10);
element31.add(animation2);
const scene3 = new Scene("Comparison of car acceleration in three countries", 10.0);
scene3.addElement(element333);
scene3.addElement(element31);
scene3.addElement(element32);
scene3.addElement(element33);
scene3.addElement(element34);



const scenes = [scene1, scene2,scene3];

export default scenes;