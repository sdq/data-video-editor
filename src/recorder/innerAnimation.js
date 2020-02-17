//import FileChange from '@/utils/fileChange';
//import WebApi from '@/axios/api';
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
        recorder.start();
        this.isStopCreatUrl = false;
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
        return new Promise((resolve, reject) => {
            //console.log("finish结束录制", recorder,recorder.state)
            if (recorder && recorder.state === 'recording') {
                //结束录制
                recorder.stop();
                this.recorder = null
                setTimeout(() => {
                    if (!this.isStopCreatUrl) {
                        let videoBlob = new Blob(data, { type: "video/mp4" });
                        url = URL.createObjectURL(videoBlob);
                        //fileChange
                        // FileChange.blobToDataURL(videoBlob, (dataURI) => {
                        //     let base64Data = dataURI.split(",")[1];
                        //     console.log("base64Data", base64Data)
                        //     let folderId = '4962';
                        //     let name = "chartvideo";//重名会引起接口报错
                        //     let type = 'video' //文件夹不会显示此类型文件
                        //     WebApi.CreatNewAsset(folderId, type, name, dataURI).then(resolve => {
                        //         console.log("上传", resolve.data.id)
                        //     })
                        // })
                        //console.log("setTimeout...", url)
                        resolve(url)
                    }
                }, 16)
            }
        })
    }
    //用户退出录制过程
    stop = () => {
        //console.log("用户退出录制过程...")
        if (this.recorder && recorder.state === 'recording') {
            //结束录制
            recorder.stop();
            this.recorder = null;
            this.isStopCreatUrl = true; //此种情况是，在录制过程中，取消录制
        }
        //console.log("用户退出录制过程..recorder.", this.recorder)
    }
} 