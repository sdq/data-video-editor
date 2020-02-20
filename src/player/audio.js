import store from '@/store';
import ElementType from '@/constants/ElementType';

const AudioState = {
    NOTREADY: 0,
    START: 1,
    PLAY: 2,
    PAUSE: 3,
    END: 4,
}


export default class AudioController {

    constructor() {
        if (!AudioController.instance) {
            AudioController.instance = this
        } else {
            return AudioController.instance
        }
        this.beforeState = [];
        this.isAudioCanPlays = [];
        this._audioResources = [];
        this._audioElement = [];
        this._position = 0;
        this.setTimer = 0; //循环播放背景音乐的
        this.sceneTimer = 0; //倒计时关闭背景音乐播放的
    }


    scenePosition() {
        return store.getState().scene.position.toFixed(1);
    }

    currentScene(index) {
        return store.getState().video.scenes[index]
    }

    init(index, startPlayPosition) {
        this.isAudioCanPlays = [];
        this._audioResources = [];
        this._audioElement = [];
        this._position = startPlayPosition
        //音频默认0s播放
        this.audioPlayPosition = [];
        this.beforeState = [];
        //todo：音频切割功能
        const scene = this.currentScene(index);
        this._audioResources = scene.audios();
        if (!this._audioResources) return
        this._audioResources.map(item => {
            this.isAudioCanPlays.push(AudioState.NOTREADY);
            this.audioPlayPosition.push(0);
            this.beforeState.push(AudioState.NOTREADY)
            return item;
        })
        //过滤
        this._audioElement = scene.elements().filter(item => {
            return item.type() === ElementType.AUDIO;
        })
    }

    getAudioPlayState(element, index) {
        let elementStart;
        let elementDuration;
        let elementFragments;
        //find audio by id in sceneElement
        this._audioElement.map(item => {
            if (item.id() === element.id) {
                elementStart = item.start();
                elementDuration = item.duration();
                elementFragments = item.fragments();
            }
            return item;
        })
        let scenePosition = parseFloat(this.scenePosition())
        //console.log('position:', scenePosition, elementStart, elementStart + elementDuration)
        if (scenePosition < elementStart) {
            this.isAudioCanPlays[index] = AudioState.NOTREADY;
            return this.isAudioCanPlays[index];
        }
        if (scenePosition === elementStart) {
            this.isAudioCanPlays[index] = AudioState.PLAY;
            return this.isAudioCanPlays[index];
        }

        if (scenePosition === elementStart + elementDuration) {
            this.isAudioCanPlays[index] = AudioState.PAUSE;
            return this.isAudioCanPlays[index];
        }

        if (scenePosition > elementStart && scenePosition < elementStart + elementDuration) {
            for (let k = 0; k < elementFragments.length; k++) {
                if (scenePosition < elementFragments[k].end()) {
                    //播放位置在elementFragments[k + 1]内
                    this.audioPlayPosition[index] += this._position - elementFragments[k].start();
                    this.isAudioCanPlays[index] = AudioState.PLAY;
                    break;
                } else if (scenePosition === elementFragments[k].end()) {
                    this.audioPlayPosition[index] += elementFragments[k].duration();
                    this.isAudioCanPlays[index] = AudioState.PAUSE;
                    break;
                } else if (k + 1 < elementFragments.length) {
                    //累加前边的播放时长
                    this.audioPlayPosition[index] += elementFragments[k].duration();
                    if (scenePosition < elementFragments[k + 1].start()) {
                        this.isAudioCanPlays[index] = AudioState.PAUSE;
                        break;
                    } else if (scenePosition === elementFragments[k + 1].start()) {
                        this.isAudioCanPlays[index] = AudioState.PLAY;
                        break;
                    }
                }
            }
        }

        return this.isAudioCanPlays[index];
    }

    setAudioCurrentTime(index, audio, seekable, buffered) {
        //console.log("seekable--------", seekable.length)
        let seekableLength = seekable.length
        let start;
        let end;
        for (let s = 0; s < seekableLength; s++) {
            start = seekable.start(s)
            end = seekable.end(s)
            if (this.audioPlayPosition[index] >= start && this.audioPlayPosition[index] <= end) {
                audio.currentTime = this.audioPlayPosition[index];//当前位置可播放
                //console.log("currentTime ",audio.currentTime)
                audio.play();
                return
            }
        }
        //TODO: 待优化 
        //如果时间不在audio.seekable范围内,且当前拖拽处的时间大于缓冲的最大时间，
        //可以设置audio.currentTime = audio.buffered.end(audio.buffered.length-1);回到缓冲的最大位置处
    }

    playAudio() {
        this._audioResources.map((item, index) => {
            if(!item.element){
              return item;
            }
            let playState = this.getAudioPlayState(item, index)
            //console.log("beforeState====", index,this.beforeState[index])
            //console.log("playState====", index,playState)
            if (playState === AudioState.PLAY) {
                if (playState !== this.beforeState[index]) {
                    //Safari浏览器支持该fastSeek方法，Chrome浏览器里没有该方法
                    if ('fastSeek' in item.element) {  //Safari
                        //console.log("fastSeek", this.audioPlayPosition[index])
                        item.element.fastSeek(this.audioPlayPosition[index]);//改变audio.currentTime的值
                        item.element.play();
                    } else {
                        this.setAudioCurrentTime(index, item.element, item.element.seekable, item.element.buffered);
                    }
                    //console.log("Paly")
                    this.beforeState[index] = AudioState.PLAY;
                } else {
                    //console.log("isPalying-------------")
                }
            } else if (playState === AudioState.PAUSE) {
                if (playState !== this.beforeState[index]) {
                    //console.log("pause")
                    item.element.pause();
                    this.beforeState[index] = AudioState.PAUSE;
                } else {
                    //console.log("isPausing--------------")
                }
            }
            return item;
        })
    }
    playMusic(audio) {
        let playPosition = 0;
        //Safari浏览器支持该fastSeek方法，Chrome浏览器里没有该方法
        if ('fastSeek' in audio) {  //Safari
            //console.log("fastSeek", this.audioPlayPosition[index])
            audio.fastSeek(playPosition);
            audio.play();
        } else {
            let seekable = audio.seekable;
            let seekableLength = seekable.length
            let start;
            let end;

            for (let s = 0; s < seekableLength; s++) {
                start = seekable.start(s)
                end = seekable.end(s)
                if (playPosition >= start && playPosition <= end) { //在缓存区域可以播放
                    audio.currentTime = playPosition;
                    //console.log("audio.currentTime", audio.currentTime)
                    audio.play();
                    return;
                }
            }
        }
    }
    playBackgroundMusic(audio, scenesDuration) {
        let duration = Math.round(audio.duration);
        clearInterval(this.setTimer);
        this.playMusic(audio); //播放一次
        this.setTimer = setInterval(() => {
            this.playMusic(audio);
        }, duration * 1000) //循环播放

        this.sceneTimer = setInterval(() => {
            scenesDuration--;
            //console.log("scenesDuration", scenesDuration)
            if (scenesDuration <= 0) {
                //console.log("场景播完了...")
                clearInterval(this.sceneTimer)
                clearInterval(this.setTimer) //停止循环播放
                this.pauseBackgroundMusic(audio) //停止音频
            }
        }, 1000)
    }
    pauseAudio(index) {
        const scene = this.currentScene(index)
        scene.audios().map(item => {
            if (!item.element.paused) {
                item.element.pause();
            }
            this.isAudioCanPlays.push(AudioState.NOTREADY);
            this.audioPlayPosition.push(0);
            this.beforeState.push(AudioState.NOTREADY)
            return item;
        })
    }
    pauseBackgroundMusic(audio) {
        clearInterval(this.setTimer);
        clearInterval(this.sceneTimer);
        if (!audio.paused) {
            audio.pause();
            //console.log("暂停播放...")
        }
    }

}