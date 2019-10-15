import ysFixWebmDuration from 'fix-webm-duration'

export default class Recorder {
    constructor() {
        if (!Recorder.instance) {
            this.recorder = null; // for stop recording
            this.recorder_timeout = null;
            this.isCompleted = false;

            this.isRecording = false;
            Recorder.instance = this;
        } else {
            return Recorder.instance;
        }
    }

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
                
                var canvas = document.getElementById(canvasId);
                var stream = canvas.captureStream(); // fps
                var videoData = [];
                var options = {
                    // audioBitsPerSecond : 128000,
                    // videoBitsPerSecond : 2500000,
                    mimeType : 'video/webm'
                }
                var recorder = new MediaRecorder(stream, options);

                this.recorder = recorder;
         

                recorder.onstart = () => {
                    // console.log("start")
                    // 播放视频
                    playCanvas();
                    // 根据时间停止录制
                    this.recorder_timeout = setTimeout(() => {
                        this.isCompleted = true;
                        recorder.stop(); 
                    }, duration); // +1000
                }

                recorder.onerror = function(event) {
                    let error = event.error;
                
                    switch(error.name) {
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

                recorder.ondataavailable = function(event) {
                    videoData.push(event.data); 
                    // console.log(event.data.size);  
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
                        ysFixWebmDuration(videoBlob, duration, function(fixedBlob) {
                            resolve(fixedBlob);
                        });
                        // resolve(videoData);
                    }
                    else {
                        reject('recording is stopped.');
                    }
                    
                    this.recorder = null; 
                    this.isRecording = false;
                    this.isCompleted = false;
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
}