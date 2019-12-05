import Scene from './models/Scene';
//import Video from './models/Video';
import { Element, ImageInfo, TextInfo, ChartInfo } from './models/Element';
import MyURL from './constants/MyURL';
import ElementType from './constants/ElementType';
import ChartType from './constants/ChartType';
import ChartCategory from './constants/ChartCategory';
import AnimationType from './animation/AnimationType';
import AnimationModel from './animation/AnimationModel';
//import Color from './constants/Color';
//var gifFrames = require('gif-frames');
// Demo

// const demoaudio1 = new AudioInfo(
//     '88mp3.mp3',
//     MyURL.OSS+'/images/88mp3.mp3',
//     4,
// )

const demoimage01 = new ImageInfo(
    'yellow_s.png',
    MyURL.OSS+'/images/yellow_s.png',
    48,
    30,
    10,
    28,
    0,
)
const demoimage02 = new ImageInfo(
    'gray_l.png',
    MyURL.OSS+'/images/gray_l.png',
    70,
    70,
    650,
    3,
    0,
)
const demoimage03 = new ImageInfo(
    'black_b.png',
    MyURL.OSS+'/images/black_b.png',
    145,
    110,
    95,
    45,
    0,
)
const demoimage06 = new ImageInfo(
    'red_b.png',
    MyURL.OSS+'/images/red_b.png',
    545,
    110,
    95,
    45,
    0,
)


const demotext = new TextInfo(
    "中国服务进口全球第二",
    70,
    28,
    0,
    '#303030',
    30,
)

const demotext04 = new TextInfo(
    "中国服务进口规模已是全球第二",
    255,
    405,
    0,
    '#303030',
    20,
)
const demotext05 = new TextInfo(
    "1982    ",
    165,
    120,
    0,
    '#ffffff',
    25,
)
const demotext07 = new TextInfo(
    "2018    ",
    565,
    120,
    0,
    '#ffffff',
    25,
)

const demotext08 = new TextInfo(
    "20亿元  ",
    145,
    180,
    0,
    '#303030',
    30,
)

const demotext09 = new TextInfo(
    "5250亿元    ",
    545,
    180,
    0,
    '#303030',
    30,
)

const demoimage010 = new ImageInfo(
    'money.png',
    MyURL.OSS+'/images/money.png',
    165,
    225,
    40,
    50,
    0,
)

const demoimage011 = new ImageInfo(
    'money.png',
    MyURL.OSS+'/images/money.png',
    450,
    225,
    40,
    50,
    0,
)

const demoimage012 = new ImageInfo(
    'money.png',
    MyURL.OSS+'/images/money.png',
    510,
    225,
    40,
    50,
    0,
)

const demoimage013 = new ImageInfo(
    'money.png',
    MyURL.OSS+'/images/money.png',
    570,
    225,
    40,
    50,
    0,
)

const demoimage014 = new ImageInfo(
    'money.png',
    MyURL.OSS+'/images/money.png',
    630,
    225,
    40,
    50,
    0,
)
const demoimage015 = new ImageInfo(
    'money.png',
    MyURL.OSS+'/images/money.png',
    690,
    225,
    40,
    50,
    0,
)

const demoimage016 = new ImageInfo(
    'gray_s.png',
    MyURL.OSS+'/images/gray_s.png',
    0,
    0,
    800,
    450,
    0,
)

const demoimage017 = new ImageInfo(
    'blue_arrow.png',
    MyURL.OSS+'/images/blue_arrow.png',
    330,
    275,
    135,
    85,
    0,
)

const demotext018 = new TextInfo(
    "262倍   ",
    330,
    210,
    0,
    '#FDFF00',
    50,
    'PingFang SC',
    'bold',
)

const demotext019 = new TextInfo(
    "2018年服务进口总额5250亿美元        ",
    255,
    405,
    0,
    '#303030',
    20,
)

const demotext020 = new TextInfo(
    "比1982年增长262倍        ",
    305,
    405,
    0,
    '#ffffff',
    20,
)



const element01 = new Element(ElementType.IMAGE, demoimage01);
const element02 = new Element(ElementType.IMAGE, demoimage02);
const element03 = new Element(ElementType.IMAGE, demoimage03);
const element2 = new Element(ElementType.TEXT, demotext);
const element04 = new Element(ElementType.TEXT, demotext04);
const element05 = new Element(ElementType.TEXT, demotext05);
const element06 = new Element(ElementType.IMAGE, demoimage06);
const element07 = new Element(ElementType.TEXT, demotext07);
const element08 = new Element(ElementType.TEXT, demotext08);
const element09 = new Element(ElementType.TEXT, demotext09);
const element010 = new Element(ElementType.IMAGE, demoimage010);
const element011 = new Element(ElementType.IMAGE, demoimage011);
const element012 = new Element(ElementType.IMAGE, demoimage012);
const element013 = new Element(ElementType.IMAGE, demoimage013);
const element014 = new Element(ElementType.IMAGE, demoimage014);
const element015 = new Element(ElementType.IMAGE, demoimage015);
const element016 = new Element(ElementType.IMAGE, demoimage016);
const element017 = new Element(ElementType.IMAGE, demoimage017);
const element018 = new Element(ElementType.TEXT, demotext018);
const element019 = new Element(ElementType.TEXT, demotext019);
const element020 = new Element(ElementType.TEXT, demotext020);



const scene1 = new Scene("中国服务进口规模已是全球第二", 11.0);//编辑后设置

scene1.addElement(element01);
scene1.addElement(element02);
scene1.addElement(element03);
scene1.addElement(element2);
scene1.addElement(element04);
scene1.addElement(element05);
scene1.addElement(element06);
scene1.addElement(element07);
scene1.addElement(element08);
scene1.addElement(element09);
scene1.addElement(element010);
scene1.addElement(element011);
scene1.addElement(element012);
scene1.addElement(element013);
scene1.addElement(element014);
scene1.addElement(element015);
scene1.addElement(element016);
scene1.addElement(element017);
scene1.addElement(element018);
scene1.addElement(element019);
scene1.addElement(element020);
scene1.backgroundColor('#ffffff');


element03.start(1.5);
element05.start(1.5);
element08.start(2.5);
element010.start(2.5);
element06.start(3.5);
element07.start(3.5);
element09.start(4.5);
element011.start(4.5);
element012.start(5.0);
element013.start(5.5);
element014.start(6.0);
element015.start(6.5);
element016.start(7.0);
element017.start(7.5);
element018.start(7.5);
element04.start(0.5);
element019.start(3.5);
element020.start(8.5);


element01.duration(11.0);
element02.duration(11.0);
element2.duration(11.0);

element03.duration(9.5);
element05.duration(9.5);

element08.duration(7.5);
element010.duration(7.5);

element06.duration(7.5);
element07.duration(7.5);

element09.duration(6.5);
element011.duration(6.5);

element012.duration(6);
element013.duration(5.5);

element014.duration(5);
element015.duration(4.5);

element016.duration(4);
element017.duration(2.5);
element018.duration(2.5);

element04.duration(2.5);
element019.duration(4.5);
element020.duration(2.5);

const animation01 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation01.start(0);
animation01.duration(1.0);

const animation03 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation03.start(1.5);
animation03.duration(1.0);

const animation06 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation06.start(3.5);
animation06.duration(1.0);

const animation08 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation08.start(2.5);
animation08.duration(1.0);

const animation09 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation09.start(4.5);
animation09.duration(1.0);

const animation016 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation016.start(6.9);
animation016.duration(1.0);

const animation017 = new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker');//flicker
animation017.start(6.9);
animation017.duration(2.0);

element01.add(animation01);
element02.add(animation01);
element2.add(animation01);

element03.add(animation03);
element05.add(animation03);

element08.add(animation01);
element010.add(animation01);

element06.add(animation01);
element07.add(animation01);

element09.add(animation09);
element011.add(animation09);


element016.add(animation016);
element017.add(animation017);
element018.add(animation017);


//scene1.backgroundImage(MyURL.OSS+"/backgroundImages/t-point.png");
// const demoaudio222 = new AudioInfo(
//     '90mp3.mp3',
//     MyURL.OSS+'/images/90mp3.mp3', 
//     4,
// )


// const demochart2 = new ChartInfo(
//     0,
//     ChartCategory.D3,
//     ChartType.BARCHART,
//     {
//         "encoding": {
//             "x": {"field": "Cylinders", "type": "ordinal"},
//             "y": {"field": "Horsepower", "type": "quantitative", "aggregation": "average"},
//             "color": {"field": "Origin", "type": "nordinal"},
//             "time": {"field": "Year", "type": "temporal"},
//         },
//         "style": {
//             "layout": "stacked",
//         },
//         "animation": [
            
//         ]
//     },
//     45,
//     30,
//     320,
//     320,
//     0,
// )

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

// scene2.backgroundImage(MyURL.OSS+"/backgroundImages/s-classroom.png");


// const demoaudio333 = new AudioInfo(
//     '91mp3.mp3',
//     MyURL.OSS+'/images/91mp3.mp3', 
//     4,
// )
const demoimage11 = new ImageInfo(
    'yellow_s.png',
    MyURL.OSS+'/images/yellow_s.png',
    48,
    30,
    10,
    28,
    0,
)
const demoimage12 = new ImageInfo(
    'gray_l.png',
    MyURL.OSS+'/images/gray_l.png',
    70,
    70,
    650,
    3,
    0,
)

const demotextt = new TextInfo(
    "中国服务进口领域占比变化",
    70,
    28,
    0,
    '#303030',
    30,
)


const demoimage112 = new ImageInfo(
    'blue_s.png',
    MyURL.OSS+'/images/blue_s.png',
    70,
    120,
    40,
    40,
    0,
)

const demoimage113 = new ImageInfo(
    'green_s.png',
    MyURL.OSS+'/images/green_s.png',
    70,
    200,
    40,
    40,
    0,
)

const demoimage114 = new ImageInfo(
    'orange_s.png',
    MyURL.OSS+'/images/orange_s.png',
    70,
    280,
    40,
    40,
    0,
)
const demoimage115 = new ImageInfo(
    'red_ss.png',
    MyURL.OSS+'/images/red_ss.png',
    70,
    360,
    40,
    40,
    0,
)

const demotext111 = new TextInfo(
    "金融行业",
    120,
    132,
    0,
    '#303030',
    20,
)
const demotext116 = new TextInfo(
    "保险行业",
    120,
    212,
    0,
    '#303030',
    20,
)
const demotext117 = new TextInfo(
    "建筑行业",
    120,
    292,
    0,
    '#303030',
    20,
)
const demotext118 = new TextInfo(
    "运输行业",
    120,
    372,
    0,
    '#303030',
    20,
)



const demotext119 = new TextInfo(
    "服务进口构成中",
    330,
    405,
    0,
    '#303030',
    20,
)

const demotext120 = new TextInfo(
    "境外旅游和运输服务占比提升最快",
    250,
    405,
    0,
    '#303030',
    20,
)

const demochart = new ChartInfo(
    0,
    ChartCategory.D3,
    ChartType.BARCHART,
    {
        "encoding": {
            "x": {"field": "Cylinders", "type": "ordinal"},
            "y": {"field": "Horsepower", "type": "quantitative"},
            "color": {"field": "Origin", "type": "nordinal"},
            "time": {"field": "Year", "type": "temporal"},
        },
        "style": {
            "layout": "stacked",
            "showAxisX": true,
            "showAxisY": true,
        },
        "animation": [
            // {
            //     "type": "grow",
            //     "duration": 800,
            // },
            // {
            //     "type": "emphasize",
            //     "duration": 800,
            // }
        ]
    },
    345,
    100,
    320,
    320,
    0,
)


const element11 = new Element(ElementType.IMAGE, demoimage11);
const element12 = new Element(ElementType.IMAGE, demoimage12);
const elementtitle2 = new Element(ElementType.TEXT, demotextt);
const element112 = new Element(ElementType.IMAGE, demoimage112);
const element113 = new Element(ElementType.IMAGE, demoimage113);
const element114 = new Element(ElementType.IMAGE, demoimage114);
const element115 = new Element(ElementType.IMAGE, demoimage115);
const element111 = new Element(ElementType.TEXT, demotext111);
const element116 = new Element(ElementType.TEXT, demotext116);
const element117 = new Element(ElementType.TEXT, demotext117);
const element118 = new Element(ElementType.TEXT, demotext118);
const element119 = new Element(ElementType.TEXT, demotext119);
const element120 = new Element(ElementType.TEXT, demotext120);
const element121 = new Element(ElementType.CHART, demochart);



const scene2 = new Scene("中国服务进口领域占比变化", 11.0);//编辑后设置

scene2.addElement(element11);
scene2.addElement(element12);
scene2.addElement(elementtitle2);

scene2.addElement(element112);
scene2.addElement(element113);
scene2.addElement(element114);
scene2.addElement(element115);
scene2.addElement(element111);
scene2.addElement(element116);
scene2.addElement(element117);
scene2.addElement(element118);

scene2.addElement(element119);
scene2.addElement(element120);

scene2.addElement(element121);
scene2.backgroundColor('#ffffff');



element112.start(4.0);
element113.start(4.5);
element114.start(5.0);
element115.start(5.5);
element111.start(4.0);
element116.start(4.5);
element117.start(5.0);
element118.start(5.5);

element119.start(1.5);
element120.start(3.5);


element11.duration(11.0);
element12.duration(11.0);
elementtitle2.duration(11.0);



element112.duration(6);
element113.duration(5.5);
element114.duration(5);
element115.duration(4.5);
element111.duration(6);
element116.duration(5.5);
element117.duration(5);
element118.duration(4.5);


element119.duration(1.5);
element120.duration(4.5);

const animation11 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//fadein
animation11.start(0);
animation11.duration(1.0);


const animation117 = new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker');//flicker
animation117.start(6.9);
animation117.duration(2.0);

element11.add(animation11);
element12.add(animation11);
elementtitle2.add(animation11);







// const demochart3 = new ChartInfo(
//     0,
//     ChartCategory.VEGALITE,
//     ChartType.SCATTERPLOT,
//     {
//         "mark": "point",
//         "encoding": {
//           "x": {"field": "Origin", "type": "ordinal"},
//           "y": {"field": "Acceleration", "type": "quantitative"},
//           "color": {"value": Color.DEEP_ORANGE},
//         }
//     },
//     450,
//     40,
//     250,
//     250,
//     0,
// )


const demoimage21 = new ImageInfo(
    'yellowblue_c.png',
    MyURL.OSS+'/images/yellowblue_c.png',
    300,
    125,
    200,
    200,
    0,
)

const demotext22 = new TextInfo(
    "2012    ",
    334,
    195,
    0,
    '#ffffff',
    60,
)

const demoimage23 = new ImageInfo(
    'yellow_ce.png',
    MyURL.OSS+'/images/yellow_ce.png',
    255,
    75,
    296,
    296,
    0,
)

const demoimage24 = new ImageInfo(
    'yellowblue_c.png',
    MyURL.OSS+'/images/yellowblue_c.png',
    340,
    165,
    120,
    120,
    0,
)

const demotext25 = new TextInfo(
    "2012    ",
    369,
    210,
    0,
    '#ffffff',
    30,
)

const demoimage26 = new ImageInfo(
    'yellow_c.png',
    MyURL.OSS+'/images/yellow_c.png',
    100,
    170,
    100,
    100,
    0,
)

const demoimage27 = new ImageInfo(
    'blue_c.png',
    MyURL.OSS+'/images/blue_c.png',
    600,
    170,
    100,
    100,
    0,
)

const demoimage28 = new ImageInfo(
    'blue_l.png',
    MyURL.OSS+'/images/blue_l.png',
    400,
    220,
    300,
    3,
    0,
)



const demoimage29 = new ImageInfo(
    'blue_l.png',
    MyURL.OSS+'/images/blue_l.png',
    100,
    220,
    300,
    3,
    0,
)

const demotext210 = new TextInfo(
    "连续六年",
    214,
    170,
    0,
    '#080808',
    30,
)

const demotext211 = new TextInfo(
    "世界第一出境消费国",
    411,
    255,
    0,
    '#080808',
    30,
)

const demoimage212 = new ImageInfo(
    'plane.png',
    MyURL.OSS+'/images/plane.png',
    280,
    75,
    270,
    300,
    0,
)


const element21 = new Element(ElementType.IMAGE, demoimage21);
const element22 = new Element(ElementType.TEXT, demotext22);
const element23 = new Element(ElementType.IMAGE, demoimage23);
const element24 = new Element(ElementType.IMAGE, demoimage24);
const element25 = new Element(ElementType.TEXT, demotext25);
const element26 = new Element(ElementType.IMAGE, demoimage26);
const element27 = new Element(ElementType.IMAGE, demoimage27);
const element28 = new Element(ElementType.IMAGE, demoimage28);
const element29 = new Element(ElementType.IMAGE, demoimage29);
const element210 = new Element(ElementType.TEXT, demotext210);
const element211 = new Element(ElementType.TEXT, demotext211);
const element212 = new Element(ElementType.IMAGE, demoimage212);





const scene3 = new Scene("世界第一出境消费国", 10.0);


scene3.addElement(element23);
scene3.addElement(element24);
scene3.addElement(element25);
scene3.addElement(element21);
scene3.addElement(element22);
scene3.addElement(element26);
scene3.addElement(element27);
scene3.addElement(element28);
scene3.addElement(element29);
scene3.addElement(element210);
scene3.addElement(element211);
scene3.addElement(element212);



// element333.duration(10.0);
element21.duration(1.9);
element22.duration(1.9);
element23.start(1.0);
element23.duration(2);
element24.start(2.0);
element24.duration(1);
element27.start(3.0);
element27.duration(4.0);
element26.start(3.0);
element26.duration(4.0);
element28.start(3.0);
element28.duration(4.0);
element29.start(3.0);
element29.duration(4.0);
element210.start(4.5);
element210.duration(2.5);
element211.start(5.0);
element211.duration(2.0);
element212.start(6.7);
element212.duration(3.0);


const animation21 = new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoom in');//flicker
animation21.start(0);
animation21.duration(1.0);

const animation22 = new AnimationModel(AnimationType.PRESENTATION_ZOOMOUT, 'Zoom out');//flicker
animation22.start(1.0);
animation22.duration(2.0);

const animation23 = new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoom in');//flicker
animation23.start(0.8);
animation23.duration(2.0);

const animation26 = new AnimationModel(AnimationType.PRESENTATION_ZOOMOUT, 'Zoom out');//flicker
animation26.start(3.0);
animation26.duration(2.0);

const animation28 = new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoom in');//flicker
animation28.start(2.7);
animation28.duration(2.0);

const animation210 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//flicker
animation210.start(4.3);
animation210.duration(2.0);

const animation211 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//flicker
animation211.start(4.8);
animation211.duration(2.0);

const animation212 = new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker');//flicker
animation212.start(6.5);
animation212.duration(3.0);





//加入多个动画会怎样
element21.add(animation21);
element22.add(animation21);
element21.add(animation22);
element22.add(animation22);
element23.add(animation23);
element26.add(animation26);
element27.add(animation26);
element28.add(animation28);
element29.add(animation28);
element210.add(animation210);
element211.add(animation211);
element212.add(animation212);


scene3.backgroundColor('#ffffff');


const demoimage31 = new ImageInfo(
    'yellow_s.png',
    MyURL.OSS+'/images/yellow_s.png',
    48,
    30,
    10,
    28,
    0,
)
const demoimage32 = new ImageInfo(
    'gray_l.png',
    MyURL.OSS+'/images/gray_l.png',
    70,
    70,
    650,
    3,
    0,
)

const demotext33 = new TextInfo(
    "中国经济结构转型升级",
    70,
    28,
    0,
    '#303030',
    30,
)

const demoimage34 = new ImageInfo(
    'gray_e.png',
    MyURL.OSS+'/images/gray_e.png',
    235,
    355,
    326,
    81,
    0,
)


const demoimage35 = new ImageInfo(
    'bar_1.png',
    MyURL.OSS+'/images/bar_1.png',
    300,
    300,
    31,
    96,
    0,
)
const demoimage36 = new ImageInfo(
    'bar_2.png',
    MyURL.OSS+'/images/bar_2.png',
    355,
    274,
    31,
    122,
    0,
)
const demoimage37 = new ImageInfo(
    'bar_3.png',
    MyURL.OSS+'/images/bar_3.png',
    412,
    238,
    31,
    157,
    0,
)
const demoimage38 = new ImageInfo(
    'bar_4.png',
    MyURL.OSS+'/images/bar_4.png',
    469,
    204,
    31,
    192,
    0,
)

const demoimage39 = new ImageInfo(
    'yellow_arrow.png',
    MyURL.OSS+'/images/yellow_arrow.png',
    291,
    148,
    199,
    126,
    0,
)

const demotext310 = new TextInfo(
    "这些数据映射出",
    329,
    413,
    0,
    '#303030',
    20,
)
const demotext311 = new TextInfo(
    "中国经济结构正在转型升级",
    280,
    413,
    0,
    '#303030',
    20,
)

const demotext312 = new TextInfo(
    "居民消费能力也在稳步增长",
    280,
    413,
    0,
    '#303030',
    20,
)

const element31 = new Element(ElementType.IMAGE, demoimage31);
const element32 = new Element(ElementType.IMAGE, demoimage32);
const element33 = new Element(ElementType.TEXT, demotext33);
const element34 = new Element(ElementType.IMAGE, demoimage34);
const element35 = new Element(ElementType.IMAGE, demoimage35);
const element36 = new Element(ElementType.IMAGE, demoimage36);
const element37 = new Element(ElementType.IMAGE, demoimage37);
const element38 = new Element(ElementType.IMAGE, demoimage38);
const element39 = new Element(ElementType.IMAGE, demoimage39);
const element310 = new Element(ElementType.TEXT, demotext310);
const element311 = new Element(ElementType.TEXT, demotext311);
const element312 = new Element(ElementType.TEXT, demotext312);

const scene4 = new Scene("中国经济结构转型升级", 10.0);

scene4.addElement(element31);
scene4.addElement(element32);
scene4.addElement(element33);
scene4.addElement(element34);
scene4.addElement(element35);
scene4.addElement(element36);
scene4.addElement(element37);
scene4.addElement(element38);
scene4.addElement(element39);
scene4.addElement(element310);
scene4.addElement(element311);
scene4.addElement(element312);

element31.duration(10);
element32.duration(10);
element33.duration(10);
element34.start(1.0);
element34.duration(9);
element35.start(1.5);
element35.duration(8.5);
element36.start(2.0);
element36.duration(8.0);
element37.start(2.5);
element37.duration(7.5);
element38.start(3.0);
element38.duration(7.0);
element39.start(3.6);
element39.duration(6.4);
element310.start(1.0);
element310.duration(1.8);
element311.start(3.0);
element311.duration(1.8);
element312.start(5.0);
element312.duration(2.7);


const animation31 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//flicker
animation31.start(0.0);
animation31.duration(1.5);

const animation34 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//flicker
animation34.start(0.8);
animation34.duration(1);

const animation39 = new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker');//flicker
animation39.start(3.4);
animation39.duration(1.8);


element31.add(animation31);
element32.add(animation31);
element33.add(animation31);
element34.add(animation34);
element39.add(animation39);




const demoimage41 = new ImageInfo(
    'yellow_s.png',
    MyURL.OSS+'/images/yellow_s.png',
    203,
    211,
    10,
    28,
    0,
)

const demotext42 = new TextInfo(
    "数据来源：国家统计局、wind、海通宏观              ",
    221,
    217,
    0,
    '#303030',
    20,
)

const demoimage43 = new ImageInfo(
    'logo.png',
    MyURL.OSS+'/images/logo.png',
    0,
    125,
    800,
    200,
    0,
)


const element41 = new Element(ElementType.IMAGE, demoimage41);
const element42 = new Element(ElementType.TEXT, demotext42);
const element43 = new Element(ElementType.IMAGE, demoimage43);

const scene5 = new Scene("片尾", 10.0);

scene5.addElement(element41);
scene5.addElement(element42);
scene5.addElement(element43);

element41.start(0.1);
element41.duration(2);
element42.start(0.1);
element42.duration(2);
element43.start(2);
element43.duration(2);

const animation41 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//flicker
animation41.start(0.0);
animation41.duration(1.5);

const animation43 = new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in');//flicker
animation43.start(1.8);
animation43.duration(1.5);


element41.add(animation41);
element42.add(animation41);
element43.add(animation43);


const scenes = [scene1,scene2,scene3,scene4,scene5];



export default scenes;