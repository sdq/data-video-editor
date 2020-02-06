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
    }
}


export default createElementUtils