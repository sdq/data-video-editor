import ysFixWebmDuration from 'fix-webm-duration'
import store from '@/store';

const prepareTime = 100; //TODO: 100ms for preparation

export default class Recorder {
    constructor() {
        if (!Recorder.instance) {
            this.recorder = null; // for stop recording
            this.recorder_timeout = null;
            this.isCompleted = false;
            this.ctx = null;
            this.dest = null;
            this.MEDIA_ELEMENT_NODES = [];
            this.MEDIA_ELEMENT_Map = new WeakMap();
            this.isRecording = false;
            Recorder.instance = this;
        } else {
            return Recorder.instance;
        }
    }

    currentScene(index) { return store.getState().video.scenes[index] }
    get scenesCount() { return store.getState().video.scenes.length; }
    get backgroundMusic() {
        return store.getState().video.backgroundMusic;
    }
    start(canvasId, duration, timeSlice, playCanvas) {
        if (this.isRecording) {
            return new Promise((_, reject) => {
                let error = 'is recording';
                reject(new Error(error));
            })
        } else {
            return new Promise((resolve, reject) => {
                this.isRecording = true
                var audiolist = []; // all media elements in one list
                for(let k=0;k<this.scenesCount;k++){
                    let audios = this.currentScene(k).audios();
                    // console.log(audios)
                    if (audios.length !== 0){
                        // audios.map(audio=>{ 
                        //     console.log("audio对象",audio.element) 
                        //     console.log('get',document.getElementById(audio.element.id))
                        //     // console.log("audio对象id",audio.element.id)
                        //     // audiolist.push(audio.element.id)
                        // })
                        audiolist.push(...audios.map(audio=>audio.element))                      
                    }  
                    //背景音乐
                    if(this.backgroundMusic){
                        audiolist.push(this.backgroundMusic) 
                    }

                   let videos = this.currentScene(k).videos();
                   if (videos.length !== 0){
                       audiolist.push(...videos.map(video=>video))                        
                   }       
                }

                var canvas = document.getElementById(canvasId);
                var stream = canvas.captureStream(); // fps
                var videoData = [];
                var options = {
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 2500000,
                    mimeType: 'video/webm;'
                }

                if(audiolist.length !== 0){
                    if (this.ctx == null) {
                        var AudioContext_ = window.AudioContext // Default
                            || window.webkitAudioContext // Safari and old versions of Chrome
                            || false; 

                        if (AudioContext_) {
                            // Do whatever you want using the Web Audio API
                            this.ctx = new AudioContext_();
                            // ...
                        } else {
                            // Web Audio API is not supported
                            // Alert the user
                            alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox");
                        }
                        // this.ctx = new AudioContext();
                    }
                    var audioTrack = this.extractAudio(audiolist);
                    stream.addTrack(audioTrack);
                }

                var recorder = new MediaRecorder(stream, options);
                // console.log(MediaRecorder.prototype)
                this.recorder = recorder;

                // recorder.addEventListener('start', () => {
                //     playCanvas();
                //     // 根据时间停止录制
                //     // this.recorder_timeout = 
                //     console.log(duration)
                //     setTimeout(() => {
                //         console.log('timeout now ')
                //         this.isCompleted = true;
                //         this.recorder.stop();
                //     }, duration); // +1000
                // })


                recorder.onerror = function (event) {
                    let error = event.error;

                    switch (error.name) {
                        case 'InvalidStateError':
                            console.log("You can't record the video right " +
                                "now. Try again later.");
                            break;
                        case 'SecurityError':
                            console.log("Recording the specified source " +
                                "is not allowed due to security " +
                                "restrictions.");
                            break;
                        default:
                            console.log("A problem occurred while trying " +
                                "to record the video.");
                            break;
                    }
                };

                recorder.ondataavailable = function (event) {
                    videoData.push(event.data);
                }

                recorder.onstop = () => {
                    // 清除timeout
                    if (this.recorder_timeout !== null) { // 是被终止的
                        clearTimeout(this.recorder_timeout);
                        this.recorder_timeout = null;
                    }
                    // 如果是正常录制完毕
                    if (this.isCompleted) {
                        var duration = Date.now() - startTime;
                        // console.log(duration);
                        var videoBlob = new Blob(videoData, { type: 'video/webm' });
                        ysFixWebmDuration(videoBlob, duration, function (fixedBlob) {
                            resolve(fixedBlob);
                        });
                    }
                    else {
                        reject('recording is stopped.');
                    }

                    this.recorder = null;
                    this.isRecording = false;
                    this.isCompleted = false;
                    // if (this.ctx !== null) {
                    //     this.MEDIA_ELEMENT_NODES.forEach((node) => {
                    //         node.disconnect();
                    //     })
                    //     // console.log('ctx', this.ctx)
                    // }
                }
                recorder.onstart = () => {
                    // 播放视频
                    // playCanvas();
                    // 根据时间停止录制
                    this.recorder_timeout = setTimeout(() => {
                        this.isCompleted = true;
                        this.recorder.stop();
                    }, duration-prepareTime);
                    
                }
                this.recorder.start(timeSlice); 
                if(this.isSafari()) {
                    this.recorder_timeout = setTimeout(() => {
                    this.isCompleted = true;
                    this.recorder.stop();
                }, duration-prepareTime);
                }
                 // +1000
                // console.log('state', recorder.state)
                // var check = setInterval(() => {
                //     console.log('state', this.recorder_timeout)
                // }, 1000)
                var startTime = Date.now();
            })
        }
    }

    stop() {
        if (!this.isRecording) {
            return;
        } else {
            this.recorder && this.recorder.stop();
        }
    }

    extractAudio(audios) {
        let ctx = this.ctx;
        // this.ctx = ctx;
        let dest = ctx.createMediaStreamDestination();
        // this.dest = dest
        audios.forEach((audio) => {
            let videoOrAudioElement = audio;
            if (this.MEDIA_ELEMENT_Map.has(videoOrAudioElement)) {
                let sourceNode = this.MEDIA_ELEMENT_Map.get(videoOrAudioElement);
                sourceNode.connect(dest);
                sourceNode.connect(ctx.destination);
                this.MEDIA_ELEMENT_NODES.push(sourceNode);
            }
            else {
                let sourceNode = ctx.createMediaElementSource(videoOrAudioElement);
                // console.log(ctx)
                sourceNode.connect(dest);
                sourceNode.connect(ctx.destination);
                this.MEDIA_ELEMENT_NODES.push(sourceNode);
                this.MEDIA_ELEMENT_Map.set(videoOrAudioElement, sourceNode);
            }
            // let videoOrAudioElement = document.getElementById(audio);
            // let sourceNode = ctx.createMediaElementSource(videoOrAudioElement);
            // console.log(ctx)
            // sourceNode.connect(dest);
            // sourceNode.connect(ctx.destination);
            // this.MEDIA_ELEMENT_NODES.push(sourceNode);
            // this.MEDIA_ELEMENT_NODES.set(videoOrAudioElement, sourceNode);
        });
        let audioTrack = dest.stream.getAudioTracks()[0];
        this.ctx = ctx;
        // this.dest = dest
        return audioTrack;
    }

    isSafari() {
        var chr = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        var sfri = window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;
        return !chr && sfri;
    }
}