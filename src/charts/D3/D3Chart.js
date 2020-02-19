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
            isAnimating: false,
            isCleanAnimation :false,
        };
        this._animations = [];
        this.drawFramesTimer = 0;
        this.recorderTimer = 0;
    }

    componentDidMount() {
        if (this.props.showChartAnimation && this.props.spec.animation.length > 0) {
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
        }else if (this.props.startAnimation && this.state.isAnimating) {
            //console.log("播放动画...")
            this.renderAnimation();
            this.setState({
                isAnimating: false,
                isCleanAnimation : true
            })
        }else if (this.props.cleanAnimation && this.state.isCleanAnimation) {
            //console.log("取消动画...")
            this.renderChart();
            this.setState({
                isCleanAnimation: false,
                isAnimating : true
            })
        }
    }
    
    renderChart = () => {
        this.cancelAnimation();
        const newProps = _.cloneDeep(this.props);
        newProps.width = 600; //为了分辨率
        newProps.height = 600;
        const svg = this.props.draw(newProps);
        this.setState({
            showAnimation: this.props.showAnimation,
            isCleanAnimation : true
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
        this.props.updatChartInnerAnimationUrl(null);   //播放动画即重新录制  
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
            isAnimating : true,
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
                if (VideoURL) this.props.updatChartInnerAnimationUrl(VideoURL);
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
        //canvas.width = this.props.width;
        //canvas.height = this.props.height;
        canvas.width = 600;
        canvas.height = 600; //为了分辨率
        canvg(canvas, source);
        return canvas.toDataURL('image/png',1.0);
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
   
    render() {
        if (this.props.onCanvas) {
            return <ChartImage name={this.props.name} src={this.state.chartImageUrl} getImageRef={this.getImageRef} {...this.props} />;
        } else {
            return <div className={this.props.chartId} />;
        }
    }
}
