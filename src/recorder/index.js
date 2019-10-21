import ysFixWebmDuration from 'fix-webm-duration'
import store from '@/store';

export default class Recorder {
    constructor() {
        if (!Recorder.instance) {
            this.recorder = null; // for stop recording
            this.recorder_timeout = null;
            this.isCompleted = false;
<<<<<<< HEAD
            this.ctx = null;
=======
            this.ctx = new AudioContext();;
>>>>>>> f2f182cd7c7f05649bb1875353fd5d8816c7c1ae
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

    start(canvasId, duration, timeSlice, playCanvas) {
        if (this.isRecording) {
            return new Promise((_, reject) => {
                let error = 'is recording';
                reject(new Error(error));
            })
        } else {
            return new Promise((resolve, reject) => {
                // console.log("start promise")
                this.isRecording = true

                if (this.ctx == null) {
                    this.ctx = new AudioContext();
                }
                var audiolist = [];
                for(let k=0;k<this.scenesCount;k++){
                    let audios = this.currentScene(k).audios();
                    if(audios){
                        audios.map(audio=>{ 
                            // console.log("audio对象",audio.element) 
                            // console.log("audio对象id",audio.element.id)
                            audiolist.push(audio.element.id)
                        })                    
                    }                
                }
                // console.log(audiolist)
                

                var canvas = document.getElementById(canvasId);
                var stream = canvas.captureStream(); // fps
                // console.log(stream)
                var videoData = [];
                var options = {
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 2500000,
                    mimeType: 'video/webm;'
                }

                // var audios = ['audiotest']
                // if (document.getElementById('audiotest') !== null) {
                //     var audioTrack = this.extractAudio(['audiotest']);
                //     stream.addTrack(audioTrack);
                // }
                if(audiolist.length !== 0){
                    var audioTrack = this.extractAudio(audiolist);
                    stream.addTrack(audioTrack);
                }

                var recorder = new MediaRecorder(stream, options);

                this.recorder = recorder;


                recorder.onstart = () => {
                    // console.log("start")
                    // 播放视频
                    playCanvas();
                    // 根据时间停止录制
                    // setTimeout(() => {
                    //     var videoOrAudioElement = document.getElementById('audiotest');
                    //     console.log(videoOrAudioElement)
                    //     videoOrAudioElement.play();
                    // }, 1000);
                    this.recorder_timeout = setTimeout(() => {
                        this.isCompleted = true;
                        recorder.stop();
                    }, duration); // +1000
                }

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

<<<<<<< HEAD
                recorder.ondataavailable = function (event) {
                    videoData.push(event.data);
=======
                recorder.ondataavailable = function(event) {
                    videoData.push(event.data); 
>>>>>>> f2f182cd7c7f05649bb1875353fd5d8816c7c1ae
                    // console.log(event.data);  
                    // console.log('data available');
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
                        // resolve(videoBlob);
                    }
                    else {
                        reject('recording is stopped.');
                    }

                    this.recorder = null;
                    this.isRecording = false;
                    this.isCompleted = false;
<<<<<<< HEAD
                    if (this.ctx !== null) {
                        this.MEDIA_ELEMENT_NODES.forEach((node) => {
                            node.disconnect();
                        })
                        // console.log('ctx', this.ctx)
                    }
=======
                    // if(this.ctx !== null) {
                    //     this.MEDIA_ELEMENT_NODES.forEach((node) => {
                    //         node.disconnect();
                    //     })
                    //     console.log('ctx', this.ctx)
                    // } 
>>>>>>> f2f182cd7c7f05649bb1875353fd5d8816c7c1ae
                }
                recorder.start(timeSlice);
                var startTime = Date.now();
            })
        }
    }

    stop() {
        if (!this.isRecording) {
            return;
        } else {
            this.recorder.stop();
        }
    }

    extractAudio(audios) {
        let ctx = this.ctx;
        // this.ctx = ctx;
        let dest = ctx.createMediaStreamDestination();
        // this.dest = dest
        audios.forEach((audio) => {
            let videoOrAudioElement = document.getElementById(audio);
<<<<<<< HEAD
            if (this.MEDIA_ELEMENT_Map.has(videoOrAudioElement)) {
=======
            if(this.MEDIA_ELEMENT_Map.has(videoOrAudioElement)){
>>>>>>> f2f182cd7c7f05649bb1875353fd5d8816c7c1ae
                let sourceNode = this.MEDIA_ELEMENT_Map.get(videoOrAudioElement);
                sourceNode.connect(dest);
                sourceNode.connect(ctx.destination);
                this.MEDIA_ELEMENT_NODES.push(sourceNode);
            }
            else {
                let sourceNode = ctx.createMediaElementSource(videoOrAudioElement);
<<<<<<< HEAD
                // console.log(ctx)
=======
                console.log(ctx)
>>>>>>> f2f182cd7c7f05649bb1875353fd5d8816c7c1ae
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
<<<<<<< HEAD
        // console.log("audiotrack", audioTrack)
=======
        console.log("audiotrack", audioTrack)
>>>>>>> f2f182cd7c7f05649bb1875353fd5d8816c7c1ae
        this.ctx = ctx;
        // this.dest = dest
        return audioTrack;
    }
}