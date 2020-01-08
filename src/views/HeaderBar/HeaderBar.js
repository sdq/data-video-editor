import React, { Component } from 'react';
import Scene from '@/models/Scene';
import { Button, Modal, Spin ,Input ,Upload ,Icon} from 'antd';
import Recorder from '@/recorder';
import Player from '@/player';
import ElementType from '@/constants/ElementType';
import { Element, ImageInfo, ChartInfo, TextInfo ,VideoInfo, ShapeInfo, GifInfo ,AudioInfo} from '@/models/Element';
import AnimationModel from '@/animation/AnimationModel';
//import { saveAs } from 'file-saver';
import './headerbar.css';

const recorder = new Recorder();
const player = new Player();
const prepareTime = 100; //TODO: 100ms for preparation
let backgroundMusicID = "";
let saveName = "";

export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        saveVisible: false,
        visible: false,
        loading: false,
        importloading:false,
        remainTime: 0,
        isVideoPerforming: false,
        backgroundMusicID: "",
    };
    this.play = this.play.bind(this);
};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    importprojectFile(file){
        return new Promise((resolve) => {
            let text = "";
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (e) { 
                text = reader.result;
                resolve(text)
            };
        })

    }

    importProject = (file) => {
    this.importprojectFile(file).then(text => {
            this.setState({
                importloading: true,
                importloadingTips: 'loading...'
            })
        let jsonObj;
        jsonObj =  JSON.parse(text);

        //更新项目文件
        this.props.removeProject();
        //this.props.addProject(jsonObj); 
        
       //项目文件载入
        for(let i=0;i<jsonObj.length;i++){
            const newScene = new Scene(jsonObj[i]._script, 700);
            //background
            if(jsonObj[i]._backgroundColor){newScene.backgroundColor(jsonObj[i]._backgroundColor)}
            if(jsonObj[i]._backgroundImage){newScene.backgroundImage(jsonObj[i]._backgroundImage)}
            if(jsonObj[0]._backgroundMusic){newScene.backgroundMusic(jsonObj[0]._backgroundMusic)}//要对背景音乐做特殊处理

            //element duration start animation
            for(let m=0;m<jsonObj[i]._elements.length;m++){
            let newE = jsonObj[i]._elements[m]._info;
            let newElement = '';
            let animation = "";
            let aniM = '';

            switch (jsonObj[i]._elements[m]._type) {
            case ElementType.IMAGE:
                 const newImage = new ImageInfo(newE.name, newE.src, newE.x, newE.y, newE.width, newE.height, newE.rotation, newE.opacity);
                 newElement = new Element(ElementType.IMAGE, newImage);//为什么不显示
                 newScene.addElement(newElement);
                 newElement.start(jsonObj[i]._elements[m]._start);
                 newElement.duration(jsonObj[i]._elements[m]._duration);

                 //animation
                 for(let n=0;n<jsonObj[i]._elements[m]._animations.length;n++){
                    aniM = jsonObj[i]._elements[m]._animations[n];
                    animation = new AnimationModel(aniM._type, aniM._name);
                    animation.start(aniM._start);
                    animation.duration(aniM._duration);
                    animation.pathinfo(aniM._pathinfo);
                    newElement.add(animation);
                    }
            break;
            case ElementType.TEXT:
                    const newText = new TextInfo(newE.text, newE.x, newE.y, newE.rotation, newE.color, newE.textSize, newE.fontFamily, newE.fontStyle, newE.textDecorationLine,newE.opacity,newE.textAlign,newE.width,newE.height);
                    newElement = new Element(ElementType.TEXT, newText);
                    newScene.addElement(newElement);
                    newElement.start(jsonObj[i]._elements[m]._start);
                    newElement.duration(jsonObj[i]._elements[m]._duration);
                    
                     //animation
                    for(let n=0;n<jsonObj[i]._elements[m]._animations.length;n++){
                    aniM = jsonObj[i]._elements[m]._animations[n];
                    animation = new AnimationModel(aniM._type, aniM._name,);
                    animation.start(aniM._start);
                    animation.duration(aniM._duration);
                    animation.pathinfo(aniM._pathinfo);
                    newElement.add(animation);
                    }

            break;
            case ElementType.GIF:
                    const newGif = new GifInfo(newE.name, newE.src, newE.delay, newE.gifFrames, newE.x, newE.y, newE.width, newE.height, newE.rotation, newE.opacity);
                    newElement = new Element(ElementType.GIF, newGif);
                    newScene.addElement(newElement);//无法被直接解析
                    newElement.start(jsonObj[i]._elements[m]._start);
                    newElement.duration(jsonObj[i]._elements[m]._duration);

                    //animation
                    for(let n=0;n<jsonObj[i]._elements[m]._animations.length;n++){
                    aniM = jsonObj[i]._elements[m]._animations[n];

                    animation = new AnimationModel(aniM._type, aniM._name);
                    animation.start(aniM._start);
                    animation.duration(aniM._duration);
                    animation.pathinfo(aniM._pathinfo);
                    newElement.add(animation);
                    }
            break;
            case ElementType.CHART:
                    const newChart = new ChartInfo(newE.dataIndex, newE.category, newE.type, newE.spec, newE.x, newE.y, newE.width, newE.height, newE.rotation);
                    newElement = new Element(ElementType.CHART, newChart);
                    newScene.addElement(newElement);
                    newElement.start(jsonObj[i]._elements[m]._start);
                    newElement.duration(jsonObj[i]._elements[m]._duration);
                    //animation
                    for(let n=0;n<jsonObj[i]._elements[m]._animations.length;n++){
                    aniM = jsonObj[i]._elements[m]._animations[n];
                    animation = new AnimationModel(aniM._type, aniM._name);
                    animation.start(aniM._start);
                    animation.duration(aniM._duration);
                    animation.pathinfo(aniM._pathinfo);
                    newElement.add(animation);
                    }
            break;
            case ElementType.SHAPE:
                    const newShape = new ShapeInfo(newE.shapeType, newE.x, newE.y, newE.rotation, newE.color,newE.opacity,newE.width,newE.height,newE.stroke,newE.strokeWidth,newE.shadowColor,newE.shadowBlur,newE.cornerRadius,newE.numPoints,newE.pointerLength,newE.pointerWidth,newE.isPosTool);
                    newElement = new Element(ElementType.SHAPE, newShape);
                    newScene.addElement(newElement);
                    newElement.start(jsonObj[i]._elements[m]._start);
                    newElement.duration(jsonObj[i]._elements[m]._duration);
                    //animation
                    for(let n=0;n<jsonObj[i]._elements[m]._animations.length;n++){
                        aniM = jsonObj[i]._elements[m]._animations[n];
                        animation = new AnimationModel(aniM._type, aniM._name);
                        animation.start(aniM._start);
                        animation.duration(aniM._duration);
                        animation.pathinfo(aniM._pathinfo);
                        newElement.add(animation);
                        }
            break;
            case ElementType.VIDEO:
                    const newVideo = new VideoInfo(newE.name, newE.src, newE.x, newE.y, newE.width, newE.height, newE.rotation, newE.opacity);
                    newElement = new Element(ElementType.VIDEO, newVideo);
                    newScene.addElement(newElement);
                    /////////////无法被解析/////////////
                    //todo:对拿到的video素材重新解析，加入素材列表              
                    //二次载入的audio没有seekable属性，无法播放
                    newElement.start(jsonObj[i]._elements[m]._start);
                    newElement.duration(jsonObj[i]._elements[m]._duration);
                    //animation
                    for(let n=0;n<jsonObj[i]._elements[m]._animations.length;n++){
                        aniM = jsonObj[i]._elements[m]._animations[n];
                        animation = new AnimationModel(aniM._type, aniM._name);
                        animation.start(aniM._start);
                        animation.duration(aniM._duration);
                        animation.pathinfo(aniM._pathinfo);
                        newElement.add(animation);
                        }
            break;
            case ElementType.AUDIO:
                    //const newAudio = new AudioInfo(newE.name, newE.src, newE.duration, newE.backgroundmusic, newE.volume);
                    const newAudio = new AudioInfo(newE.name,newE.src,Math.round( newE.duration),newE.backgroundmusic, newE.volume);
                    newElement = new Element(ElementType.AUDIO, newAudio);
                    /////////////无法被解析/////////////
                    //todo:对拿到的audio素材重新解析，加入素材列表，              
                    //二次载入的audio没有seekable属性，无法播放
                    //add audioResource to audioList
                    let audioResource = {};
                    audioResource.id = newElement.id();
                    audioResource.element = newAudio;
                    newScene.addAudio(audioResource);
                    newScene.addElement(newElement);
                    newElement.start(jsonObj[i]._elements[m]._start);
                    newElement.duration(jsonObj[i]._elements[m]._duration);
                    //no animation



            break;
            default:
                //TODO: remove
                //console.log("wrong!!!!!!!");
            return;
            }


         }//element for

       
         //先添加上element，再addscene，保证加载项目及时显示画面元素
         if(i===0){ //For first scene, update
            this.props.updateScene(this.props.sceneIndex, newScene);}
            else{  //for other scene , add
            this.props.addScene(newScene);
            }
         

        }//scene for
    })


     return false;
    }



    saveProject = () => {
        this.showSaveModal();

    };


    showSaveModal = () => {
        this.setState({
            saveVisible: true,
        });
    };


    saveChange = e => {
            saveName = e.target.value;
        }

    
    saveOk = () => {
        
        var FileSaver = require('file-saver');
    //     // 声明cache变量，便于匹配是否有循环引用的情况，去掉循环会导致项目打不开
    //     var cache = [];
    //     var filecontent = JSON.stringify(this.props.scenes, function(key, value) {
    //     if (typeof value === 'object' && value !== null) {
    //       if (cache.indexOf(value) !== -1) {
    //            // 移除
    //          return;
    //       }
    //      // 收集所有的值
    //      cache.push(value);
    //  }
    //     return value;
    //     });
    //     cache = null; // 清空变量，便于垃圾回收机制回收
 
        let scenesWithoutCircular = this.props.scenes;
        for(let i=0;i<scenesWithoutCircular.length;i++){
            //去除audio和video的循环引用信息，才能被转化保存，否则报错
            scenesWithoutCircular[i]._audios = "";
            scenesWithoutCircular[i]._videos = "";   
            scenesWithoutCircular[i]._videoTags = "";   
        }  

        //var filecontent =  JSON.stringify(this.props.scenes);
        var filecontent =  JSON.stringify(scenesWithoutCircular);;
        var file = new File([filecontent], saveName+".idv", {type: "text/plain;charset=utf-8"});//特殊后缀名
        FileSaver.saveAs(file);

        this.setState({
            saveVisible: false,
        });
    };


    saveCancel = () => {
        this.setState({
            saveVisible: false,
        });
    };



    tick() {
        if (this.state.remainTime === 0) {
        } else {
            this.setState(preState => ({
                remainTime: preState.remainTime - 1
            }));
        }
    }


    play() {
        // this.props.unselectElement();
        // this.props.displayTrackEditor();
        if(this.props.scenes[0].backgroundMusic()!=="none"){
            for(let i = 0;i<this.props.scenes[0].elements().length;i++){ 
                if(this.props.scenes[0].elements()[i].info().name === this.props.scenes[0].backgroundMusic())
                {
                    backgroundMusicID = this.props.scenes[0].elements()[i].id();
                }
            }
        }

        if (this.state.isVideoPerforming === false) {
            this.setState({
                isVideoPerforming : true
            });
            this.props.displayTrackEditor();
            player.playVideo(backgroundMusicID); 
        } else {
            this.setState({
                isVideoPerforming : false
            });
            this.pause();   
            //todo：终止后没有自动归位
        }
    };

    pause() {
        player.pauseVideo();
    }

    handleOk = () => {
        this.setState({
            visible: false,
            loading: true
        });
        this.setState({
            remainTime: this.props.videoDuration
        });
        this.interval = setInterval(() => this.tick(), 1000); // 一秒一次
        // console.log('duration', this.props.videoDuration);
        if(this.props.scenes[0].backgroundMusic()!=="none"){
            for(let i = 0;i<this.props.scenes[0].elements().length;i++){ 
                if(this.props.scenes[0].elements()[i].info().name === this.props.scenes[0].backgroundMusic())
                {
                    backgroundMusicID = this.props.scenes[0].elements()[i].id();
                }
            }
        }
        player.playVideo(backgroundMusicID);
        // 显示加载动画
        setTimeout(() => {
            recorder.start('animation-layer', // canvas id
                (this.props.videoDuration) * 1000, // duration: ms
                10, // per xxx ms
                () => {
                    //player.playVideo();
                })
                .then((video) => {
                    clearInterval(this.interval);
                    // 取出加载动画
                    this.setState({
                        loading: false,
                        remainTime: 0
                    })
                    var url = URL.createObjectURL(video); //, { type: "video/webm" }
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.download = 'media.webm';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }, function (error) {
                    console.log(error);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, prepareTime); // TODO: show animation layer before record
    };

    handleCancel = () => {
        clearInterval(this.interval);
        if (this.state.loading === true) {
            player.pauseVideo();
            recorder.stop();
        }
        this.setState({
            visible: false,
            loading: false,
            remainTime: 0
        });
    };

    formatSeconds(seconds) {
        var theTime = parseInt(seconds);// 需要转换的时间秒 
        var theTime1 = 0;// 分 
        var theTime2 = 0;// 小时 
        var theTime3 = 0;// 天
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
                if (theTime2 > 24) {
                    //大于24小时
                    theTime3 = parseInt(theTime2 / 24);
                    theTime2 = parseInt(theTime2 % 24);
                }
            }
        }
        var result = '';
        if (theTime >= 0) {
            result = "" + parseInt(theTime) + " seconds ";
        }
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + " minutes " + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + " hours " + result;
        }
        if (theTime3 > 0) {
            result = "" + parseInt(theTime3) + " days " + result;
        }
        return result;
    }
    isSafari() {
        var chr = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        var sfri = window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;
        return !chr && sfri;
    }
    logout = () =>{
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="headerbar">
                <font color="white"><b>Data Video Editor</b></font>
                <Button type="primary" icon="logout" shape="round"  onClick={this.logout} style={{ float: 'right', marginLeft: 12 } }>
                     Logout
                </Button>
                <Upload 
                        showUploadList={false}
                        accept=".idv"  //后缀名
                        beforeUpload={this.importProject}
                        >
                 <Button type="primary" shape="round" style={{  marginLeft: 12 }}>
                     <Icon type="import" /> Import
                 </Button>
                </Upload>
                <Button type="primary" icon="export" shape="round" style={{ float: 'right', marginLeft: 12 }} onClick={this.showModal}>
                    Export
                </Button>
                <Button type="primary" icon="save" shape="round" style={{ float: 'right', marginLeft: 12 }} onClick={this.saveProject}>
                    Save
                </Button>
                <Button type="primary" shape="round" icon={this.state.isVideoPerforming?"pause":"caret-right"} onClick={this.play} style={{ float: 'right', marginLeft: 12 } }>
                    Preview
                </Button>
                <Modal
                    title="Export Video"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Do you want to export the video?</p>
                    <p>This might take several minutes.</p>
                    {this.isSafari() &&
                        <p>
                            We have noticed that you are using Safari.<br/>
                            Make sure the <b>allow autoplay option </b>is enabled. (right-click the address bar)
                        </p>
                    }
                </Modal>
                <Modal
                    className='recordConfirm'
                    visible={this.state.loading}
                    onCancel={this.handleCancel}
                    closable={false}
                    maskClosable={false}
                    footer={[<Button key="cancel" type="primary" onClick={this.handleCancel}>Cancel</Button>]}
                >
                    <Spin id='spin' size="large"></Spin>
                    <p>Recording...</p>
                    <p>{this.formatSeconds(this.state.remainTime)} remaining</p>
                    <p>Please don't leave this page!</p>
                </Modal>
                <Modal
                    visible={this.state.saveVisible}
                    onOk={this.saveOk}
                    onCancel={this.saveCancel}
                    title="Input FileName"
                    mask={false}
                    maskClosable={true}
                >
                    <Input placeholder="dataVideo" 
                    allowClear
                    onChange = {value => this.saveChange(value)}
                    />
                    Attention：cannot save video audio gif and path animation !
                </Modal>
            </div>
        )
    }
}
