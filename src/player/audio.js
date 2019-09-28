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
        this.beforeState = AudioState.NOTREADY;
        this.isAudioCanPlays = [];
        this._audioResources = [];
        this._audioElement = [];
    }


    scenePosition() {
        //console.log('scenePosition', store.getState().scene.position)
        return store.getState().scene.position.toFixed(1);
    }

    currentScene(index) {
        return store.getState().video.scenes[index]
    }

    init(index) {
        this.isAudioCanPlays = [];
        this._audioResources = [];
        this._audioElement = [];
        this.beforeState = AudioState.NOTREADY;

        const scene = this.currentScene(index);
        this._audioResources = scene.getAudio()
        this._audioResources.map(item => {
            this.isAudioCanPlays.push(AudioState.NOTREADY);
            return item;
        })
        //
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
                elementStart = parseFloat(item.start().toString());
                elementDuration = parseFloat(item.duration().toString());
                elementFragments = item.fragments();
            }
            return item;
        })

       // console.log('position:', elementStart, elementStart + elementDuration)
       //TODO  dragBar操作，elementDuration获取为NAN,对应bug:拖拽后播放失效
        if (this.scenePosition() < elementStart) {
            this.isAudioCanPlays[index] = AudioState.NOTREADY;
            return this.isAudioCanPlays[index];
        }
        if (this.scenePosition() === elementStart) {
            this.isAudioCanPlays[index] = AudioState.PLAY;
            return this.isAudioCanPlays[index];
        }

        if (this.scenePosition() === elementStart + elementDuration) {
            this.isAudioCanPlays[index] = AudioState.PAUSE;
            return this.isAudioCanPlays[index];
        }

        if (this.scenePosition() > elementStart && this.scenePosition() < elementStart + elementDuration) {
            for (let k = 0; k < elementFragments.length; k++) {
                if (this.scenePosition() < elementFragments[k].end()) {
                    this.isAudioCanPlays[index] = AudioState.PLAY;
                } else if (this.scenePosition() === elementFragments[k].end()) {
                    this.isAudioCanPlays[index] = AudioState.PAUSE;
                } else if (k + 1 < elementFragments.length) {
                    if (this.scenePosition() < elementFragments[k + 1].start()) {
                        this.isAudioCanPlays[index] = AudioState.PAUSE;
                    } else if (this.scenePosition() === elementFragments[k + 1].start()) {
                        this.isAudioCanPlays[index] = AudioState.PLAY;
                    }
                }
            }
        }

        return this.isAudioCanPlays[index];
    }


    playAudio() {
        this._audioResources.map((item, index) => {
            let playState = this.getAudioPlayState(item, index)
            if (playState === AudioState.PLAY) {
                if (playState !== this.beforeState) {
                    item.element.play();
                    this.beforeState = AudioState.PLAY;
                }
            } else if (playState === AudioState.PAUSE) {
                if (playState !== this.beforeState) {
                    item.element.pause();
                    this.beforeState = AudioState.PAUSE;
                }
            }
            return item;
        })
    }

    pauseAudio(index) {
        const scene = this.currentScene(index)
        scene.getAudio().map(item => {
            item.element.pause();
            console.log("Pause")
            return item;
        })
    }

}