import store from '@/store';
import * as videoActions from '@/actions/videoAction';
import * as sceneActions from '@/actions/sceneAction';
import * as playerActions from '@/actions/playerAction';
import AudioInstance from '@/player/audio'

const AudioController=new AudioInstance()
export default class Player {
    constructor() {
        if (!Player.instance) {
            this._timeouts = [];
            Player.instance = this;
        } else {
            return Player.instance;
        }
    }

    get isPerforming() {
        return store.getState().player.isPerforming;
    }

    get sceneIndex() {
        return store.getState().video.index;
    }

    get scenesCount() {
        return store.getState().video.scenes.length;
    }

    get currentSceneDuration() {
        return this.sceneDuration(this.sceneIndex);
    }

    sceneDuration(index) {
        return store.getState().video.scenes[index].duration();
    }

    get scenePosition() {
        return store.getState().scene.position;
    }

    playScene() {
        if (!this.isPerforming) {
            store.dispatch(playerActions.playScene(this.sceneIndex));
            AudioController.init(this.sceneIndex);
            this._clearTimeouts();
            const current = this.scenePosition;
            const end = this.currentSceneDuration;
            const msOffset = (end - current) * 1000;
            const n = Math.round(msOffset / 100) + 1; // update every 100ms
            for (let index = 0; index < n; index++) {
                this._timeouts.push(setTimeout(function () {
                    const position = current + index / 10 ;
                    store.dispatch(sceneActions.setPosition(position));
                    AudioController.playAudio()
                    if (index === (n-1)) {
                        this.pauseScene();
                        store.dispatch(sceneActions.setPosition(0));
                    }
                }.bind(this), index * 100));
            }
        }
    }

    pauseScene() {
        this._clearTimeouts();
        store.dispatch(playerActions.stopScene(this.sceneIndex));
        AudioController.pauseAudio(this.sceneIndex)      
    }

    playVideo() {
        store.dispatch(playerActions.playVideo());
        this._clearTimeouts();
        let sceneStart = 0;

        for (let index = 0; index < this.scenesCount; index++) {
            const sceneDuration = this.sceneDuration(index);
            this._timeouts.push(setTimeout(function () {
                store.dispatch(videoActions.selectScene(index));
                store.dispatch(sceneActions.setPosition(0));
            }, sceneStart * 1000));
            // TODO: play scene

            sceneStart += sceneDuration;
        }
        this._timeouts.push(setTimeout(function () {
            store.dispatch(playerActions.stopVideo());
        }, sceneStart * 1000));
    }

    pauseVideo() {
        this._clearTimeouts();
        store.dispatch(playerActions.stopVideo());
    }

    _clearTimeouts() {
        for (var i = 0; i < this._timeouts.length; i++) {
            clearTimeout(this._timeouts[i]);
        }
    }

}