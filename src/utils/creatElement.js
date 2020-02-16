var createElementUtils = {
    createElement(elementType, src) {
        return new Promise(reslove => {
            //console.log("createElement", elementType)
            switch (elementType) {
                case "video_element":
                    let video = document.createElement("video")
                    let source = document.createElement("source")
                    source.src = src;
                    video.appendChild(source);
                    video.id = 'video_import' + Math.random();
                    video.preload = "auto";
                    video.addEventListener("canplay", () => {
                        reslove(video)
                    })
                    break;
                case "audio_element":
                    let audio = document.createElement("audio")
                    audio.src = src;
                    audio.id = 'audio_import' + Math.random()
                    audio.addEventListener("canplay", () => {
                        //console.log("createElement", audio)
                        reslove(audio)
                    })
                    break;
                default:
                    break;
            }
        })
    },
    loadVideoDuration (url) {
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
}


export default createElementUtils
