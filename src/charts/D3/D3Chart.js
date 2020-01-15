import React, { Component } from 'react';
import ChartImage from '../ChartImage';
import { AnimationCreator } from '@/animation';
import canvg from 'canvg';
import ChartRecorderInstance from '@/recorder/innerAnimation';
//import Fragment from '@/models/element/Fragment';
import _ from 'lodash'

const chartRecorderInstance = new ChartRecorderInstance();
export default class D3Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specString: '',
            chartImageUrl: '',
            pointx: 0,
            pointy: 0,
            isSelecting: false,
        };
        this._animations = [];
        this.drawFramesTimer = 0;
        this.recorderTimer = 0;
    }

    componentDidMount() {
        if (this.props.showChartAnimation) {
            this.renderAnimation();
        } else {
            this.renderChart();
        }
    }

    componentDidUpdate() {
        if (this.state.specString !== JSON.stringify(this.props.spec)) {
            if (this.props.showChartAnimation && this.props.spec.animation.length > 0) {
                this.renderAnimation();
            } else {
                this.renderChart();
                if (!this.props.currentElement) return;
                //此处没有内部动画（或者用户在手动删除）要清除之前保存的chartVideoURL
                this.props.currentElement.info().src = null   //这样在双击图表，就不显示录制好的video
                const newScene = _.cloneDeep(this.props.currentScene);
                newScene.updateElement(this.props.currentElement, this.props.elementIndex);
                this.props.updateScene(this.props.sceneIndex, newScene);
            }
        } else if (this.props.pointx !== this.state.pointx && this.props.pointy !== this.state.pointy) {
            // dragging animation
            this.props.hover(this.props);
            this.setState({
                pointx: this.props.pointx,
                pointy: this.props.pointy,
            })
        } else if (this.props.isSelectingChartElement && !this.state.isSelecting) {
            // start selecting chart element
            this.props.select(this.props);
            this.setState({
                isSelecting: true,
            })
        } else if (!this.props.isSelectingChartElement && this.state.isSelecting) {
            // finish selecting chart element
            this.renderAnimation();
            this.setState({
                isSelecting: false,
            })
        }
    }
    
    renderChart = () => {
        this.cancelAnimation();
        const svg = this.props.draw(this.props);
        this.setState({
            showAnimation: this.props.showAnimation
        });
        if (svg) {
            const visSource = svg.node().parentNode.innerHTML;
            const chartImageUrl = this.getImageUrl(visSource);
            this.setState({
                specString: JSON.stringify(this.props.spec),
                chartImageUrl: chartImageUrl
            });
        }
    }
    getSvg2ImageUrl = () => {
        if (!document.getElementsByClassName(this.props.chartId)[0]) {
            return;
        }
        let svg = document.getElementsByClassName(this.props.chartId)[0].getElementsByTagName('svg')[0] 
        if (svg) {
            let visSourc = svg.innerHTML
            return this.getImageUrl(visSourc);
        }
    }


    renderAnimation = () => {
        this.cancelAnimation();
        let canvasOptions = {
            width: this.props.width,
            height: this.props.height
        }
        //准备录制画布 captureStream
        chartRecorderInstance.initRecorder(canvasOptions);
        this.drawFramesTimer = setInterval(() => {
            //每隔16豪秒截取此刻svg生成image
            let svg2ImageUrl = this.getSvg2ImageUrl();
            //绘制到canvas,通过canvas录制
            chartRecorderInstance.start(svg2ImageUrl)
        }, 16)

        this.setState({
            specString: JSON.stringify(this.props.spec),
        });
        const animations = this.props.spec.animation;
        let animationDelay = 0;
        //主线程使用的变量
        let totalDelay = 0;
        for (let index = 0; index < animations.length; index++) {
            const animation = animations[index];
            this._animations.push(setTimeout(function () {
                this.props.animate(animation, this.props);
            }.bind(this), animationDelay))
            animationDelay += animation.duration;
            totalDelay += animation.duration;
        }
        let isRecording = true
        //是否播放完
        this.recorderTimer = setTimeout(() => {
            isRecording = false
            //关闭录制中弹窗显示 
            this.props.addRecordingStateListener(isRecording, 0);
            //播放完毕！ 生成video url
            clearInterval(this.drawFramesTimer)
            chartRecorderInstance.finish().then(VideoURL => {
                //console.log("VideoURL", VideoURL)
                if (VideoURL) {
                    //console.log("this.props.currentElement", this.props.currentElement)
                    this.props.currentElement.info().src = VideoURL; //VideoURL内存中的地址，上传pimcore转换成线上地址；项目导入导出需要
                    this.loadVideoDuration(VideoURL).then(duration => {
                        //console.log("duration...", typeof duration, duration)
                        this.props.currentElement.duration(duration);
                        const newScene = _.cloneDeep(this.props.currentScene);
                        //console.log("fragments()", this.props.currentElement.fragments());
                        this.props.currentElement.fragments()[0].duration(duration);
                        newScene.updateElement(this.props.currentElement, this.props.elementIndex);
                        this.props.updateScene(this.props.sceneIndex, newScene);
                    })
                }
            });
        }, totalDelay)
        //totalDelay 是为了倒计时的初始值
        this.props.addRecordingStateListener(isRecording, totalDelay);

        // Reset
        // this._animations.push(setTimeout(function () {
        //     this.renderChart();
        // }.bind(this), animationDelay))
    }

    cancelAnimation = () => {
        for (var i = 0; i < this._animations.length; i++) {
            clearTimeout(this._animations[i]);
        }
        clearInterval(this.drawFramesTimer)
        clearTimeout(this.recorderTimer)
    }

    getImageUrl = (source) => {
        var canvas = document.createElement('canvas');
        canvas.width = this.props.width;
        canvas.height = this.props.height;
        canvg(canvas, source);
        return canvas.toDataURL('image/png');
    }

    getImageRef = (ref) => {
        if (!this.imageref && ref) {
            this.imageref = ref;
            const animations = this.props.animations;
            if (this.props.showAnimation && animations.length !== 0) {
                let animationCreator = new AnimationCreator(ref);
                for (let index = 0; index < animations.length; index++) {
                    let current = this.props.current;
                    if (this.props.isVideoPerforming) {
                        current = 0;
                    }
                    const animation = animations[index];
                    animationCreator.fromModel(animation).play(current);
                }
            }
        }
    }
    loadVideoDuration = (url) => {
        return new Promise((reslove) => {
            let video = document.createElement('video');
            let source = document.createElement("source");
            source.src = url;
            video.appendChild(source);
            video.preload = "auto";
            video.addEventListener("canplay", () => {
                //console.log("canplay",video.duration,typeof video.duration)
                if (video.duration === Infinity) {
                    video.currentTime = 100000;//set the element’s currentTime pointer long past the end of the clip,and the duration property will be updated
                } else {
                    reslove(video.duration)
                }
            })
            
            video.addEventListener("timeupdate", () => {
                //console.log("timeupdate...", video.duration)
                reslove(video.duration)
            })
        })
    }
    render() {
        if (this.props.onCanvas) {
            return <ChartImage name={this.props.name} src={this.state.chartImageUrl} getImageRef={this.getImageRef} {...this.props} />;
        } else {
            return <div className={this.props.chartId} />;
        }
    }
}
