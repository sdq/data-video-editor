
let data = []
let recorder
let context
let cacheContext
let canvas
let cacheCanvas
let url

export default class innerAnimationRecorder {
    constructor() {
        if (!innerAnimationRecorder.instance) {
            this.recorder = null
            innerAnimationRecorder.instance = this
        }
        return innerAnimationRecorder.instance;
    }
    initRecorder(canvasOptions) {
        data = [];
        canvas = document.createElement("canvas")
        canvas.width = canvasOptions.width;
        canvas.height = canvasOptions.height;
        context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        //cache context
        cacheCanvas = document.createElement("canvas")
        cacheCanvas.width = canvas.width;
        cacheCanvas.height = canvas.height;
        cacheContext = cacheCanvas.getContext("2d");
        cacheContext.fillStyle = "#ffffff";
        cacheContext.fillRect(0, 0, cacheCanvas.width, cacheCanvas.height);


        let stream = canvas.captureStream()
        var options = {
            mimeType: 'video/webm'
        }
        recorder = new MediaRecorder(stream, options);
        this.recorder = recorder;
        //开始录制
        if (recorder.state === 'recording') {
            recorder.stop();
        }
        recorder.start(10);
        recorder.ondataavailable = function (event) {
            data.push(event.data);
            // console.log("event.data", event.data, recorder.state)
        };
    }

    //绘制svg的每一帧动画canvas,通过canvas录制
    start = (imageURL) => {
        if (recorder.state !== 'recording') {
            recorder.start(30);
        }
        cacheContext.clearRect(0, 0, cacheCanvas.width, cacheCanvas.height);
        cacheContext.fillStyle = "#ffffff";
        cacheContext.fillRect(0, 0, cacheCanvas.width, cacheCanvas.height);

        var img = new Image();
        img.src = imageURL;
        img.width = cacheCanvas.width
        img.width = cacheCanvas.height
        img.onload = function () {
            cacheContext.drawImage(img, 0, 0, canvas.width, canvas.height)
            context.drawImage(cacheCanvas, 0, 0, cacheCanvas.width, cacheCanvas.height)
        }
    }
    //结束录制
    finish = () => {
        return new Promise((resolve,reject) => {
            //console.log("finish结束录制", recorder,recorder.state)
            if (recorder && recorder.state === 'recording') {
                //结束录制
                recorder.stop();
                this.recorder = null
                setTimeout(() => {
                    url = URL.createObjectURL(new Blob(data, { type: "video/webm" }))
                    //console.log("url...", url)
                    resolve(url)
                }, 2000)
            }else{
                //用户取消制作chartAnimation过程
                reject()
            }

        })
    }
    //用户退出录制过程
    stop = () => {
        //console.log("用户退出录制过程...")
        if (this.recorder && recorder.state === 'recording') {
           //结束录制
           recorder.stop();
           this.recorder = null 
        }
        //console.log("用户退出录制过程..recorder.", this.recorder)
    }
} 